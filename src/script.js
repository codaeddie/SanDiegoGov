// San Diego Government Chart - D3.js Network Visualization
// Following SF CivLab approach with D3.js force-directed graph

class SanDiegoGovChart {
    constructor() {
        this.entities = [];
        this.relationships = [];
        this.filteredEntities = [];
        this.filteredRelationships = [];
        this.currentFilters = {
            jurisdiction: 'all',
            entityType: 'all-types',
            relationshipType: 'all-rels'
        };
        
        this.svg = d3.select("#network-graph");
        this.container = this.svg.append("g");
        
        this.width = 0;
        this.height = 0;
        
        this.simulation = null;
        this.nodeElements = null;
        this.linkElements = null;
        
        this.init();
    }
    
    async init() {
        console.log('Initializing San Diego Government Chart...');
        
        // Set up responsive dimensions
        this.updateDimensions();
        window.addEventListener('resize', () => this.updateDimensions());
        
        // Set up zoom
        const zoom = d3.zoom()
            .scaleExtent([0.3, 3])
            .on('zoom', (event) => {
                this.container.attr('transform', event.transform);
            });
        this.svg.call(zoom);
        
        // Load data
        await this.loadData();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Create visualization
        this.createVisualization();
        
        console.log('Visualization initialized successfully');
    }
    
    updateDimensions() {
        const rect = this.svg.node().getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
        
        if (this.simulation) {
            this.simulation
                .force("center", d3.forceCenter(this.width / 2, this.height / 2))
                .alpha(0.3)
                .restart();
        }
    }
    
    async loadData() {
        try {
            console.log('Loading government data...');
            
            // Load entities and relationships
            const [entitiesData, relationshipsData] = await Promise.all([
                d3.csv("../data/sd_gov_entities_complete.csv"),
                d3.csv("../data/sd_gov_relationships_complete.csv")
            ]);
            
            // Process entities
            this.entities = entitiesData.map(d => ({
                id: d.id,
                name: d.name,
                type: d.type,
                jurisdiction: this.getJurisdiction(d.jurisdiction),
                entityType: this.getEntityType(d.type),
                description: d.description,
                website_url: d.website_url,
                legal_source: d.legal_source,
                parent_entity: d.parent_entity
            }));
            
            // Process relationships
            this.relationships = relationshipsData.map(d => ({
                id: d.relationship_id,
                source: d.source_entity_id,
                target: d.target_entity_id,
                type: d.relationship_type,
                category: d.relationship_category,
                description: d.description,
                authority_source: d.authority_source
            }));
            
            console.log(`Loaded ${this.entities.length} entities and ${this.relationships.length} relationships`);
            
            // Initialize filtered data
            this.applyFilters();
            
        } catch (error) {
            console.error('Error loading data:', error);
            this.showError('Failed to load government data. Please check that data files are available.');
        }
    }
    
    getJurisdiction(jurisdiction) {
        if (jurisdiction.includes('City')) return 'city';
        if (jurisdiction.includes('County')) return 'county';
        if (jurisdiction.includes('Regional')) return 'regional';
        return 'regional'; // Default for unclear cases
    }
    
    getEntityType(type) {
        const lowerType = type.toLowerCase();
        if (lowerType.includes('mayor') || lowerType.includes('council') || lowerType.includes('supervisor')) {
            return 'elected';
        }
        if (lowerType.includes('department') || lowerType.includes('office') || lowerType.includes('agency')) {
            return 'departments';
        }
        if (lowerType.includes('board') || lowerType.includes('commission') || lowerType.includes('committee')) {
            return 'boards';
        }
        return 'departments'; // Default
    }
    
    setupEventListeners() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filterType = e.target.closest('.filter-group').querySelector('label').textContent.toLowerCase().replace(':', '');
                const filterValue = e.target.dataset.filter;
                
                // Update active state
                e.target.closest('.filter-group').querySelectorAll('.filter-btn').forEach(b => {
                    b.classList.remove('active');
                });
                e.target.classList.add('active');
                
                // Update filters
                if (filterType.includes('jurisdiction')) {
                    this.currentFilters.jurisdiction = filterValue;
                } else if (filterType.includes('entity')) {
                    this.currentFilters.entityType = filterValue;
                } else if (filterType.includes('relationship')) {
                    this.currentFilters.relationshipType = filterValue;
                }
                
                this.applyFilters();
                this.updateVisualization();
            });
        });
        
        // Search functionality
        const searchInput = document.getElementById('entity-search');
        const searchResults = document.getElementById('search-results');
        
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (query.length > 1) {
                this.showSearchResults(query);
            } else {
                searchResults.style.display = 'none';
            }
        });
        
        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                searchResults.style.display = 'none';
            }
        });
        
        // Sidebar close button
        document.getElementById('close-sidebar').addEventListener('click', () => {
            this.closeSidebar();
        });
    }
    
    showSearchResults(query) {
        const results = this.entities.filter(entity => 
            entity.name.toLowerCase().includes(query)
        ).slice(0, 10);
        
        const searchResults = document.getElementById('search-results');
        
        if (results.length > 0) {
            searchResults.innerHTML = results.map(entity => `
                <div class="search-result-item" data-entity-id="${entity.id}">
                    <strong>${entity.name}</strong>
                    <div style="font-size: 0.875rem; color: #6b7280;">
                        ${entity.jurisdiction} • ${entity.type}
                    </div>
                </div>
            `).join('');
            
            // Add click handlers
            searchResults.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    const entityId = e.currentTarget.dataset.entityId;
                    this.selectEntity(entityId);
                    searchResults.style.display = 'none';
                    document.getElementById('entity-search').value = '';
                });
            });
            
            searchResults.style.display = 'block';
        } else {
            searchResults.innerHTML = '<div class="search-result-item">No entities found</div>';
            searchResults.style.display = 'block';
        }
    }
    
    applyFilters() {
        // Filter entities
        this.filteredEntities = this.entities.filter(entity => {
            const jurisdictionMatch = this.currentFilters.jurisdiction === 'all' || 
                                   entity.jurisdiction === this.currentFilters.jurisdiction;
            
            const entityTypeMatch = this.currentFilters.entityType === 'all-types' || 
                                  entity.entityType === this.currentFilters.entityType;
            
            return jurisdictionMatch && entityTypeMatch;
        });
        
        // Get IDs of filtered entities
        const entityIds = new Set(this.filteredEntities.map(e => e.id));
        
        // Filter relationships
        this.filteredRelationships = this.relationships.filter(rel => {
            const entityMatch = entityIds.has(rel.source) && entityIds.has(rel.target);
            
            const relationshipTypeMatch = this.currentFilters.relationshipType === 'all-rels' || 
                                        rel.category === this.currentFilters.relationshipType;
            
            return entityMatch && relationshipTypeMatch;
        });
        
        // Update stats
        this.updateStats();
    }
    
    updateStats() {
        document.getElementById('visible-entities').textContent = this.filteredEntities.length;
        document.getElementById('relationship-count').textContent = this.filteredRelationships.length;
    }
    
    createVisualization() {
        if (this.filteredEntities.length === 0) {
            this.showError('No entities to display with current filters');
            return;
        }
        
        console.log(`Creating visualization with ${this.filteredEntities.length} entities and ${this.filteredRelationships.length} relationships`);
        
        // Create force simulation
        this.simulation = d3.forceSimulation(this.filteredEntities)
            .force("link", d3.forceLink(this.filteredRelationships)
                .id(d => d.id)
                .distance(d => this.getLinkDistance(d)))
            .force("charge", d3.forceManyBody()
                .strength(d => this.getNodeCharge(d)))
            .force("center", d3.forceCenter(this.width / 2, this.height / 2))
            .force("collision", d3.forceCollide()
                .radius(d => this.getNodeRadius(d) + 5));
        
        this.createLinks();
        this.createNodes();
        
        // Start simulation
        this.simulation.on("tick", () => this.tick());
    }
    
    createLinks() {
        this.linkElements = this.container
            .selectAll(".link")
            .data(this.filteredRelationships)
            .enter()
            .append("line")
            .attr("class", d => `link ${d.category}-link`)
            .attr("stroke-width", 2)
            .attr("stroke-opacity", 0.6);
    }
    
    createNodes() {
        this.nodeElements = this.container
            .selectAll(".node")
            .data(this.filteredEntities)
            .enter()
            .append("circle")
            .attr("class", d => `node ${d.jurisdiction}-node`)
            .attr("r", d => this.getNodeRadius(d))
            .attr("stroke", "#fff")
            .attr("stroke-width", 2)
            .on("click", (event, d) => this.selectEntity(d.id))
            .on("mouseover", (event, d) => this.showTooltip(event, d))
            .on("mouseout", () => this.hideTooltip())
            .call(this.drag());
        
        // Add labels for important entities
        this.container
            .selectAll(".label")
            .data(this.filteredEntities.filter(d => this.shouldShowLabel(d)))
            .enter()
            .append("text")
            .attr("class", "label")
            .attr("text-anchor", "middle")
            .attr("dy", -15)
            .style("font-size", "10px")
            .style("font-weight", "bold")
            .style("fill", "#333")
            .style("pointer-events", "none")
            .text(d => this.truncateText(d.name, 20));
    }
    
    shouldShowLabel(entity) {
        // Show labels for elected officials and major departments
        return entity.entityType === 'elected' || 
               (entity.entityType === 'departments' && this.getNodeRadius(entity) > 8);
    }
    
    truncateText(text, maxLength) {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }
    
    getNodeRadius(entity) {
        if (entity.entityType === 'elected') return 12;
        if (entity.entityType === 'departments') return 8;
        if (entity.entityType === 'boards') return 6;
        return 6;
    }
    
    getNodeCharge(entity) {
        if (entity.entityType === 'elected') return -500;
        if (entity.entityType === 'departments') return -300;
        return -200;
    }
    
    getLinkDistance(relationship) {
        if (relationship.category === 'hierarchical') return 80;
        if (relationship.category === 'appointment') return 100;
        return 90;
    }
    
    drag() {
        return d3.drag()
            .on("start", (event, d) => {
                if (!event.active) this.simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            })
            .on("drag", (event, d) => {
                d.fx = event.x;
                d.fy = event.y;
            })
            .on("end", (event, d) => {
                if (!event.active) this.simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            });
    }
    
    tick() {
        if (this.linkElements) {
            this.linkElements
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
        }
        
        if (this.nodeElements) {
            this.nodeElements
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
        }
        
        this.container.selectAll(".label")
            .attr("x", d => d.x)
            .attr("y", d => d.y);
    }
    
    updateVisualization() {
        // Remove existing elements
        this.container.selectAll("*").remove();
        
        // Recreate visualization
        this.createVisualization();
    }
    
    selectEntity(entityId) {
        const entity = this.entities.find(e => e.id === entityId);
        if (entity) {
            this.showEntityDetails(entity);
            this.highlightEntity(entityId);
        }
    }
    
    highlightEntity(entityId) {
        // Reset all nodes
        this.nodeElements.style("opacity", 0.3);
        this.linkElements.style("opacity", 0.1);
        
        // Highlight selected node
        this.nodeElements.filter(d => d.id === entityId)
            .style("opacity", 1)
            .attr("stroke", "#ff6b35")
            .attr("stroke-width", 3);
        
        // Highlight connected nodes and links
        this.filteredRelationships
            .filter(rel => rel.source.id === entityId || rel.target.id === entityId)
            .forEach(rel => {
                // Highlight connected nodes
                this.nodeElements.filter(d => d.id === rel.source.id || d.id === rel.target.id)
                    .style("opacity", 1);
                
                // Highlight links
                this.linkElements.filter(d => d.id === rel.id)
                    .style("opacity", 0.8)
                    .attr("stroke-width", 3);
            });
    }
    
    showEntityDetails(entity) {
        const sidebar = document.getElementById('entity-sidebar');
        const content = document.getElementById('sidebar-content');
        
        // Get relationships for this entity
        const relationships = this.getEntityRelationships(entity.id);
        
        content.innerHTML = `
            <div class="entity-info">
                <div class="entity-name">${entity.name}</div>
                <div class="entity-type ${entity.jurisdiction}">${entity.type}</div>
                <div class="entity-description">${entity.description}</div>
                
                <div class="entity-links">
                    ${entity.website_url ? `<a href="${entity.website_url}" target="_blank" class="entity-link">Official Website →</a>` : ''}
                    <div style="font-size: 0.875rem; color: #6b7280; margin-top: 0.5rem;">
                        <strong>Legal Source:</strong> ${entity.legal_source}
                    </div>
                </div>
            </div>
            
            ${relationships.length > 0 ? `
                <div class="relationships-section">
                    <h4>Relationships (${relationships.length})</h4>
                    ${this.renderRelationships(relationships, entity.id)}
                </div>
            ` : ''}
        `;
        
        sidebar.classList.add('open');
    }
    
    getEntityRelationships(entityId) {
        return this.relationships.filter(rel => 
            rel.source === entityId || rel.target === entityId
        );
    }
    
    renderRelationships(relationships, currentEntityId) {
        const hierarchical = relationships.filter(r => r.category === 'hierarchical');
        const appointment = relationships.filter(r => r.category === 'appointment');
        
        let html = '';
        
        if (hierarchical.length > 0) {
            html += `
                <div class="relationship-group">
                    <div class="relationship-type">Hierarchical (${hierarchical.length})</div>
                    ${hierarchical.map(rel => {
                        const otherEntity = this.entities.find(e => 
                            e.id === (rel.source === currentEntityId ? rel.target : rel.source)
                        );
                        const isParent = rel.target === currentEntityId;
                        return `
                            <div class="relationship-item hierarchical" data-entity-id="${otherEntity?.id}">
                                <div class="relationship-entity">
                                    ${isParent ? '↳ Reports to: ' : '↳ Oversees: '}${otherEntity?.name || 'Unknown Entity'}
                                </div>
                                <div class="relationship-description">${rel.description}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        }
        
        if (appointment.length > 0) {
            html += `
                <div class="relationship-group">
                    <div class="relationship-type">Appointments (${appointment.length})</div>
                    ${appointment.map(rel => {
                        const otherEntity = this.entities.find(e => 
                            e.id === (rel.source === currentEntityId ? rel.target : rel.source)
                        );
                        const isAppointer = rel.source === currentEntityId;
                        return `
                            <div class="relationship-item appointment" data-entity-id="${otherEntity?.id}">
                                <div class="relationship-entity">
                                    ${isAppointer ? '↳ Appoints to: ' : '↳ Appointed by: '}${otherEntity?.name || 'Unknown Entity'}
                                </div>
                                <div class="relationship-description">${rel.description}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        }
        
        // Add click handlers to relationship items
        setTimeout(() => {
            document.querySelectorAll('.relationship-item[data-entity-id]').forEach(item => {
                item.addEventListener('click', (e) => {
                    const entityId = e.currentTarget.dataset.entityId;
                    if (entityId) {
                        this.selectEntity(entityId);
                    }
                });
            });
        }, 100);
        
        return html;
    }
    
    closeSidebar() {
        document.getElementById('entity-sidebar').classList.remove('open');
        
        // Reset highlighting
        if (this.nodeElements) {
            this.nodeElements.style("opacity", 1)
                .attr("stroke", "#fff")
                .attr("stroke-width", 2);
        }
        if (this.linkElements) {
            this.linkElements.style("opacity", 0.6)
                .attr("stroke-width", 2);
        }
    }
    
    showTooltip(event, entity) {
        // Simple tooltip implementation
        const tooltip = d3.select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("background", "rgba(0,0,0,0.8)")
            .style("color", "white")
            .style("padding", "8px")
            .style("border-radius", "4px")
            .style("font-size", "12px")
            .style("pointer-events", "none")
            .style("z-index", "1000")
            .html(`<strong>${entity.name}</strong><br/>${entity.type}`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 10) + "px");
    }
    
    hideTooltip() {
        d3.selectAll(".tooltip").remove();
    }
    
    showError(message) {
        console.error(message);
        const container = this.svg.node().parentNode;
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #dc2626;">
                <h3>Error Loading Visualization</h3>
                <p>${message}</p>
                <p style="font-size: 0.875rem; margin-top: 1rem;">
                    Please ensure the data files are available in the data directory.
                </p>
            </div>
        `;
    }
}

// Initialize the visualization when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SanDiegoGovChart();
});