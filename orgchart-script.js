// San Diego Government Organizational Chart - Hierarchical Tree Visualization
class SanDiegoOrgChart {
    constructor() {
        this.governmentData = null;
        this.relationships = null;
        this.treeData = null;
        this.currentJurisdiction = 'all';
        this.svg = null;
        this.g = null;
        this.tree = null;
        this.root = null;
        
        // Dimensions
        this.margin = { top: 40, right: 40, bottom: 40, left: 40 };
        this.width = 0;
        this.height = 0;
        
        // Zoom behavior
        this.zoom = d3.zoom()
            .scaleExtent([0.3, 3])
            .on('zoom', (event) => this.handleZoom(event));
        
        this.init();
    }
    
    async init() {
        console.log('Initializing San Diego Organizational Chart...');
        
        // Set up dimensions
        this.updateDimensions();
        
        // Create SVG
        this.createSVG();
        
        // Load and build government data
        await this.loadGovernmentData();

        // Load relationship data
        await this.loadRelationshipData();

        // Build hierarchical structure
        this.buildHierarchy();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Create initial visualization
        this.createVisualization();
        
        console.log('Organizational Chart initialized successfully');
    }
    
    updateDimensions() {
        const container = document.querySelector('.chart-container');
        this.width = container.clientWidth - this.margin.left - this.margin.right;
        this.height = container.clientHeight - this.margin.top - this.margin.bottom;
    }
    
    createSVG() {
        this.svg = d3.select('#org-chart')
            .attr('width', '100%')
            .attr('height', '100%')
            .call(this.zoom);
        
        this.g = this.svg.append('g')
            .attr('class', 'chart-group')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
    }
    
    async loadGovernmentData() {
        try {
            // Load the complete government data
            const response = await fetch('data/sd_gov_entities_complete.csv');
            const csvText = await response.text();
            const entities = d3.csvParse(csvText);

            // Process entities with leadership names
            this.governmentData = this.processEntitiesWithLeadership(entities);

            console.log(`Loaded ${this.governmentData.length} government entities`);

        } catch (error) {
            console.error('Error loading government data:', error);
            this.showError('Failed to load government data. Please check that data files are available.');
        }
    }

    async loadRelationshipData() {
        try {
            const response = await fetch('data/sd_gov_relationships_complete.csv');
            const csvText = await response.text();
            this.relationships = d3.csvParse(csvText);

            console.log(`Loaded ${this.relationships.length} government relationships`);

        } catch (error) {
            console.error('Error loading relationship data:', error);
            this.showError('Failed to load relationship data. Please check that data files are available.');
        }
    }
    
    processEntitiesWithLeadership(entities) {
        // Add current leadership names based on our research
        const leadershipMap = {
            'mayor-001': { personName: 'Todd Gloria', title: 'Mayor' },
            'council-001': { personName: 'Joe LaCava', title: 'Council President' },
            'council-006': { personName: 'Kent Lee', title: 'Council Pro Tem' },
            
            // City Leadership (2024)
            'city-fire-chief': { personName: 'Robert Logan', title: 'Fire Chief' },
            'city-police-chief': { personName: 'Scott Wahl', title: 'Police Chief' },
            'city-attorney': { personName: 'Heather Ferbert', title: 'City Attorney' },
            'city-library-director': { personName: 'Misty Jones', title: 'Library Director' },
            
            // County Leadership (2024)
            'county-cao': { personName: 'Ebony N. Shelton', title: 'Chief Administrative Officer' },
            'county-sheriff': { personName: 'Kelly Martinez', title: 'Sheriff' },
            'county-da': { personName: 'Summer Stephan', title: 'District Attorney' },
            'county-hhsa-director': { personName: 'Kimberly Giardina', title: 'HHSA Deputy CAO' },
            'county-pds-director': { personName: 'Vince Nicoletti', title: 'PDS Interim Director' },
            'county-dpw-director': { personName: 'Marisa K. Barrie, PE', title: 'Public Works Director' },
            
            // Regional Leadership (2024)
            'sandag-ceo': { personName: 'Mario Orso', title: 'SANDAG CEO' },
            'mts-ceo': { personName: 'Sharon Cooney', title: 'MTS CEO' },
            'port-ceo': { personName: 'Randa Coniglio', title: 'Acting Port CEO' },
            'airport-ceo': { personName: 'Kimberly Becker', title: 'Airport Authority CEO' },
            'water-gm': { personName: 'Dan Denham', title: 'Water Authority GM' },
            
            // County Supervisors
            'supervisor-001': { personName: 'Paloma Aguirre', title: 'District 1 Supervisor' },
            'supervisor-002': { personName: 'Joel Anderson', title: 'District 2 Supervisor' },
            'supervisor-003': { personName: 'Terra Lawson-Remer', title: 'District 3 Supervisor' },
            'supervisor-004': { personName: 'Monica Montgomery Steppe', title: 'District 4 Supervisor' },
            'supervisor-005': { personName: 'Jim Desmond', title: 'District 5 Supervisor' }
        };
        
        return entities.map(entity => {
            const leadership = leadershipMap[entity.id] || {};
            return {
                ...entity,
                personName: leadership.personName || null,
                displayTitle: leadership.title || entity.type,
                jurisdiction: this.getJurisdiction(entity.jurisdiction),
                entityType: this.getEntityType(entity.type),
                level: 0, // Will be calculated during hierarchy building
                children: []
            };
        });
    }
    
    getJurisdiction(jurisdiction) {
        if (jurisdiction.includes('City')) return 'city';
        if (jurisdiction.includes('County')) return 'county';
        if (jurisdiction.includes('Regional')) return 'regional';
        return 'regional';
    }
    
    getEntityType(type) {
        const lowerType = type.toLowerCase();
        if (lowerType.includes('mayor') || lowerType.includes('council') || lowerType.includes('supervisor')) {
            return 'elected';
        }
        if (lowerType.includes('board') || lowerType.includes('commission')) {
            return 'boards';
        }
        return 'departments';
    }

    buildHierarchyFromData(jurisdiction) {
        if (!this.relationships || !this.governmentData) {
            console.warn('Missing data for hierarchy building');
            return [];
        }

        // Filter relationships to hierarchical ones only
        const hierarchicalRels = this.relationships.filter(r =>
            r.relationship_type === 'oversees' || r.relationship_type === 'reports_to'
        );

        // Get entities for this jurisdiction
        const jurisdictionEntities = this.governmentData.filter(e =>
            e.jurisdiction === jurisdiction
        );

        // Find root entities (entities that are not targets of 'oversees' relationships)
        const rootEntities = jurisdictionEntities.filter(entity => {
            // An entity is a root if no other entity oversees it
            return !hierarchicalRels.some(rel =>
                rel.relationship_type === 'oversees' && rel.target_entity_id === entity.id
            );
        });

        // Recursive function to build node tree
        const buildNode = (entity, level = 0) => {
            // Find children - entities that this entity oversees or that report to it
            const childRelationships = hierarchicalRels.filter(rel => {
                return (
                    (rel.relationship_type === 'oversees' && rel.source_entity_id === entity.id) ||
                    (rel.relationship_type === 'reports_to' && rel.target_entity_id === entity.id)
                );
            });

            const children = childRelationships
                .map(rel => {
                    const childId = rel.relationship_type === 'oversees' ? rel.target_entity_id : rel.source_entity_id;
                    const childEntity = this.governmentData.find(e => e.id === childId);
                    return childEntity ? buildNode(childEntity, level + 1) : null;
                })
                .filter(Boolean);

            return {
                ...entity,
                name: entity.name,
                personName: entity.personName || entity.current_members || null,
                displayTitle: entity.displayTitle || entity.type,
                level: level,
                children: children.length > 0 ? children : []
            };
        };

        return rootEntities.map(entity => buildNode(entity));
    }
    
    buildHierarchy() {
        // Create the hierarchical structure based on our government data
        const hierarchy = {
            name: 'San Diego Government',
            id: 'root',
            jurisdiction: 'all',
            level: 0,
            children: []
        };

        if (!this.relationships || !this.governmentData) {
            console.warn('Data not loaded yet, skipping hierarchy build');
            return;
        }

        // Build data-driven hierarchies for each jurisdiction
        const cityEntities = this.buildHierarchyFromData('City of San Diego');
        const countyEntities = this.buildHierarchyFromData('County of San Diego');
        const regionalEntities = this.buildHierarchyFromData('Regional');

        // Create jurisdiction containers
        const jurisdictions = [];

        if (cityEntities.length > 0) {
            jurisdictions.push({
                name: 'City of San Diego',
                id: 'city-root',
                jurisdiction: 'city',
                level: 1,
                children: cityEntities.map(entity => ({ ...entity, level: entity.level + 2 }))
            });
        }

        if (countyEntities.length > 0) {
            jurisdictions.push({
                name: 'County of San Diego',
                id: 'county-root',
                jurisdiction: 'county',
                level: 1,
                children: countyEntities.map(entity => ({ ...entity, level: entity.level + 2 }))
            });
        }

        if (regionalEntities.length > 0) {
            jurisdictions.push({
                name: 'Regional Authorities',
                id: 'regional-root',
                jurisdiction: 'regional',
                level: 1,
                children: regionalEntities.map(entity => ({ ...entity, level: entity.level + 2 }))
            });
        }

        hierarchy.children = jurisdictions;

        this.treeData = hierarchy;
        this.root = d3.hierarchy(this.treeData);
        this.root.x0 = this.height / 2;
        this.root.y0 = 0;

        // Collapse all nodes initially except root
        if (this.root.children) {
            this.root.children.forEach(child => this.collapse(child));
        }
    }
    
    
    setupEventListeners() {
        // Jurisdiction navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentJurisdiction = e.target.dataset.jurisdiction;
                this.filterByJurisdiction();
            });
        });
        
        // Chart controls
        document.getElementById('expand-all').addEventListener('click', () => this.expandAll());
        document.getElementById('collapse-all').addEventListener('click', () => this.collapseAll());
        document.getElementById('reset-zoom').addEventListener('click', () => this.resetZoom());
        
        // Sidebar
        document.getElementById('close-sidebar').addEventListener('click', () => this.closeSidebar());
        
        // Search
        const searchInput = document.getElementById('org-search');
        searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        
        // Window resize
        window.addEventListener('resize', () => {
            this.updateDimensions();
            this.createVisualization();
        });
    }
    
    createVisualization() {
        if (!this.root) return;
        
        // Clear existing content
        this.g.selectAll('*').remove();
        
        // Create tree layout
        this.tree = d3.tree()
            .size([this.height, this.width - 100])
            .separation((a, b) => a.parent === b.parent ? 1 : 2);
        
        // Generate tree layout
        const treeData = this.tree(this.root);
        
        // Create links
        this.drawLinks(treeData.links());
        
        // Create nodes
        this.drawNodes(treeData.descendants());
        
        // Update stats
        this.updateStats();
    }
    
    drawLinks(links) {
        const linkGenerator = d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x);
        
        this.g.selectAll('.tree-link')
            .data(links)
            .enter()
            .append('path')
            .attr('class', 'tree-link')
            .attr('d', linkGenerator);
    }
    
    drawNodes(nodes) {
        const nodeGroup = this.g.selectAll('.tree-node')
            .data(nodes)
            .enter()
            .append('g')
            .attr('class', d => `tree-node ${d.data.jurisdiction}-node node-level-${d.data.level || 0}`)
            .attr('transform', d => `translate(${d.y}, ${d.x})`)
            .on('click', (event, d) => this.handleNodeClick(event, d))
            .on('mouseover', (event, d) => this.showTooltip(event, d))
            .on('mouseout', () => this.hideTooltip());
        
        // Add circles
        nodeGroup.append('circle')
            .attr('class', 'node-circle')
            .attr('r', d => this.getNodeRadius(d));
        
        // Add position/department names
        nodeGroup.append('text')
            .attr('class', 'node-text node-name')
            .attr('dy', -12)
            .text(d => this.truncateText(d.data.displayTitle || d.data.name, 20));
        
        // Add person names (if available)
        nodeGroup.filter(d => d.data.personName)
            .append('text')
            .attr('class', 'node-text person-name')
            .attr('dy', 8)
            .text(d => this.truncateText(d.data.personName, 18));
        
        // Add expand/collapse indicators for nodes with children
        nodeGroup.filter(d => d._children || (d.children && d.children.length > 0))
            .append('circle')
            .attr('class', 'expand-indicator')
            .attr('r', 8)
            .attr('cy', 20);
        
        nodeGroup.filter(d => d._children || (d.children && d.children.length > 0))
            .append('text')
            .attr('class', 'expand-indicator')
            .attr('y', 20)
            .attr('dy', 4)
            .text(d => d._children ? '+' : '-');
    }
    
    getNodeRadius(d) {
        const level = d.data.level || 0;
        const radii = { 0: 8, 1: 12, 2: 10, 3: 8, 4: 6 };
        return radii[Math.min(level, 4)] || 6;
    }
    
    handleNodeClick(event, d) {
        if (d._children || (d.children && d.children.length > 0)) {
            this.toggleNode(d);
        } else {
            this.showPositionDetails(d);
        }
    }
    
    toggleNode(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        this.createVisualization();
    }
    
    collapse(d) {
        if (d.children) {
            d._children = d.children;
            d._children.forEach(child => this.collapse(child));
            d.children = null;
        }
    }
    
    expandAll() {
        this.root.descendants().forEach(d => {
            if (d._children) {
                d.children = d._children;
                d._children = null;
            }
        });
        this.createVisualization();
    }
    
    collapseAll() {
        this.root.children.forEach(child => this.collapse(child));
        this.createVisualization();
    }
    
    resetZoom() {
        this.svg.transition()
            .duration(750)
            .call(this.zoom.transform, d3.zoomIdentity);
    }
    
    handleZoom(event) {
        this.g.attr('transform', event.transform);
    }
    
    showPositionDetails(node) {
        const sidebar = document.getElementById('position-sidebar');
        const content = document.getElementById('position-content');
        
        const data = node.data;
        content.innerHTML = `
            <div class="position-info">
                <h3>${data.displayTitle || data.name}</h3>
                ${data.personName ? `<div class="person-name">${data.personName}</div>` : ''}
                <div class="department">${this.getJurisdictionName(data.jurisdiction)}</div>
                <div class="description">${data.description || 'Government position in the ' + this.getJurisdictionName(data.jurisdiction) + ' structure.'}</div>
                <div class="position-links">
                    ${data.website_url ? `<a href="${data.website_url}" target="_blank">Official Website →</a>` : ''}
                </div>
            </div>
        `;
        
        sidebar.classList.add('open');
    }
    
    closeSidebar() {
        document.getElementById('position-sidebar').classList.remove('open');
    }
    
    getJurisdictionName(jurisdiction) {
        const names = {
            'city': 'City of San Diego',
            'county': 'County of San Diego', 
            'regional': 'Regional Authority'
        };
        return names[jurisdiction] || 'San Diego Government';
    }
    
    showTooltip(event, d) {
        const tooltip = document.getElementById('org-tooltip');
        tooltip.innerHTML = `
            <strong>${d.data.displayTitle || d.data.name}</strong>
            ${d.data.personName ? `<br>${d.data.personName}` : ''}
        `;
        tooltip.style.left = (event.pageX + 10) + 'px';
        tooltip.style.top = (event.pageY - 10) + 'px';
        tooltip.classList.add('show');
    }
    
    hideTooltip() {
        document.getElementById('org-tooltip').classList.remove('show');
    }
    
    filterByJurisdiction() {
        // Implementation for jurisdiction filtering
        this.createVisualization();
    }
    
    handleSearch(query) {
        // Implementation for search functionality
        console.log('Searching for:', query);
    }
    
    updateStats() {
        const totalNodes = this.root.descendants().length;
        const visibleNodes = this.root.descendants().filter(d => !d._children).length;
        
        document.getElementById('total-positions').textContent = totalNodes;
        document.getElementById('visible-positions').textContent = visibleNodes;
    }
    
    truncateText(text, maxLength) {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }
    
    showError(message) {
        console.error(message);
        const container = document.querySelector('.chart-container');
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #dc2626;">
                <h3>Error Loading Organizational Chart</h3>
                <p>${message}</p>
                <p style="font-size: 0.875rem; margin-top: 1rem;">
                    Please ensure the data files are available in the data directory.
                </p>
            </div>
        `;
    }
}

// Initialize the organizational chart when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.orgChart = new SanDiegoOrgChart();
});