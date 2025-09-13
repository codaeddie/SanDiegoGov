# San Diego Government Chart

An interactive visualization of San Diego's government structure for transparency and civic engagement.

## Overview

The San Diego Government Chart provides an interactive map of San Diego's complex multi-jurisdictional government structure. Explore 173 government entities and 248 authority relationships across city, county, and regional levels.

## 🎯 Current Status

**✅ Functional Interactive Visualization**

### What's Available Now

- **173 Government Entities** - Catalog of San Diego government across jurisdictions
- **248 Authority Relationships** - Who reports to whom, who appoints whom
- **Interactive Network Graph** - D3.js force-directed visualization
- **Multi-jurisdictional Coverage** - City, County, and Regional authorities
- **Data Validation** - Verified with legal source citations

## 🚀 Quick Start

### Local Development

1. **Clone and navigate to the repository**:
   ```bash
   git clone [repository-url]
   cd SanDiegoGov
   ```

2. **Start the development server**:
   ```bash
   cd src
   python3 server.py
   ```

3. **Open your browser**:
   - **Network View**: `http://localhost:8000` (Interactive force-directed graph)
   - **Org Chart View**: `http://localhost:8000/orgchart.html` (Hierarchical tree structure)

### Alternative: Static File Server

If you have Node.js installed:
```bash
cd src
npx http-server -p 8000
```

Or with Python's built-in server:
```bash
cd src
python3 -m http.server 8000
```

## 📊 Data Architecture

### Entity Data Structure
Each entity record includes core information:
```csv
id,name,type,jurisdiction,parent_entity,website_url,description,legal_source,last_verified
```

### Relationship Data Structure
Authority and reporting relationships between entities:
```csv
relationship_id,source_entity_id,target_entity_id,relationship_type,relationship_category,authority_source,description,last_verified
```

### Data Files Organization
```
data/
├── sd_gov_entities_complete.csv         # 173 government entities (master file)
├── sd_gov_relationships_complete.csv    # 248 authority relationships
├── sd_gov_elected.csv                   # Elected officials (Mayor, Council, Supervisors)
├── sd_gov_city_departments.csv          # City of San Diego departments
├── sd_gov_county_departments.csv        # County of San Diego departments  
├── sd_gov_regional_authorities.csv      # Regional entities (SANDAG, MTS, etc.)
└── sd_gov_boards_commissions.csv        # Boards and commissions (city and county)
```

### Data Schema Details

**Entity Fields:**
- `id` - Unique identifier
- `name` - Official entity name
- `type` - Category (elected, department, board, etc.)
- `jurisdiction` - City, County, Regional, or Joint
- `parent_entity` - Hierarchical relationship
- `website_url` - Official website
- `description` - Brief functional description
- `budget` - Annual budget (if available)
- `staff_count` - Number of employees (if available)
- `creation_date` - When entity was established
- `legal_source` - Charter/code reference
- `last_verified` - Date information was last confirmed

**Relationship Types:**
- `reports_to` - Direct hierarchical authority
- `oversees` - Policy oversight relationship
- `coordinates_with` - Peer-level coordination
- `advises` - Advisory relationship
- `funds` - Financial relationship

## 🎨 Visualization Features

### Network View (Interactive Graph)
- **Force-directed graph** with 173 entities and 248 relationships
- **Jurisdiction color-coding**: City (blue), County (green), Regional (orange)
- **Relationship types**: Hierarchical (solid lines) and Appointment (dashed lines)
- **Interactive exploration**: Click, drag, zoom, and search
- **Filtering**: By jurisdiction, entity type, and relationship type
- **Real-time search**: Find any entity by name
- **Entity detail sidebar**: Complete information with relationship navigation

### Org Chart View (Hierarchical Tree)
- **Hierarchical tree structure** showing clear command chains
- **Current leadership names**: Actual people in positions (2024)
- **Collapsible branches**: Manage complexity with expand/collapse
- **Three-jurisdiction layout**: City, County, Regional authorities
- **Interactive navigation**: Click to explore organizational structure
- **Person-focused display**: Shows who actually runs each department
- **Zoom and pan**: Navigate large organizational hierarchy

### San Diego-Specific Features
- **Multi-jurisdictional complexity**: Handle regional governance federation
- **SANDAG coordination**: Regional planning authority relationships
- **Leadership transparency**: Current department heads and officials named
- **Cross-boundary appointments**: Regional representation mapping
- **Authority chain visualization**: Follow complete accountability pathways

## 🛠️ Technology Stack

### Frontend
- **Static HTML/CSS/JavaScript** - Simple, fast, reliable
- **D3.js v7** - Network visualization and interaction  
- **Responsive design** - Works on desktop and mobile
- **Progressive enhancement** - Functions without JavaScript for basic info

### Data Processing
- **Python scripts** - Data collection and validation
- **CSV format** - Simple, portable, version-controllable
- **Automated validation** - Data integrity and URL checking
- **Legal source citations** - Complete authority documentation

### Development
- **Simple HTTP server** - Local development and testing
- **No build process** - Direct file editing and refresh
- **Modern JavaScript** - ES6+ features, no frameworks needed
- **Accessible design** - WCAG 2.1 compliant

## 📁 Project Structure

```
SanDiegoGov/
├── data/                    # Government entity data (CSV files)
├── docs/                    # Project documentation  
├── scripts/                 # Data processing and validation
├── src/                     # Web visualization source
│   ├── index.html          # Network view (force-directed graph)
│   ├── orgchart.html       # Org chart view (hierarchical tree)
│   ├── styles.css          # Network view styling
│   ├── orgchart-styles.css # Org chart styling
│   ├── script.js           # D3.js network visualization
│   ├── orgchart-script.js  # D3.js hierarchical tree
│   ├── server.py           # Development HTTP server
│   └── data/               # Symlink to ../data/
├── LICENSE                 # MIT License
└── README.md              # This file
```

## 📖 Research Methodology

### Data Collection Standards
- **Primary sources only**: Official government websites and documents
- **Legal authority verification**: Every entity and relationship has cited legal basis
- **Multi-source validation**: Cross-referenced across official sources
- **Regular verification**: Systematic update process with verification dates

### San Diego-Specific Research
- **City Charter analysis**: San Diego's strong-mayor system
- **County governance**: Board of Supervisors and departmental structure  
- **Regional authorities**: SANDAG, MTS, NCTD, Airport, Port, Water authorities
- **Special districts**: Joint powers authorities and regional coordination

### Quality Assurance
- **Automated validation scripts**: URL checking, data integrity verification
- **Relationship verification**: All 248 relationships have documented legal authority
- **Entity completeness**: Complete data for core fields
- **Cross-reference accuracy**: Multiple source confirmation

## 🎯 Use Cases

### For Citizens
- **"Who's in charge of..."** - Find responsible officials for any issue
- **Government navigation** - Network view for relationships, Org chart for hierarchy
- **Civic engagement** - Identify actual people to contact
- **Authority understanding** - See who reports to whom in clear structure

### For Researchers
- **Government structure analysis** - Network relationships and hierarchy
- **Authority relationship mapping** - 248 documented relationships with legal citations
- **Leadership analysis** - Current department heads and officials identified
- **Regional governance studies** - Multi-jurisdictional complexity analysis

### For Officials
- **Interagency coordination** - Network view shows cross-department relationships  
- **Chain of command** - Org chart view shows clear reporting structures
- **Contact identification** - Current leadership names for direct communication
- **Organizational planning** - Comprehensive view of governmental structure

### For Media & Transparency
- **Leadership accountability** - Know who actually runs each department
- **Authority chains** - Follow decision-making pathways
- **Government complexity** - Make regional structure understandable to public

## 🔄 Future Enhancements

### Planned Features
- **Dashboard metrics** - City statistics and key performance indicators
- **Enhanced search** - Autocomplete and advanced filtering
- **Rich entity profiles** - Photos, member lists, enhanced data
- **Topic-based filtering** - Filter by functional areas (public safety, housing, etc.)
- **People spotlight** - Current leadership focus section

### Technical Improvements
- **API development** - Programmatic access to government data
- **Real-time updates** - Automated data refresh from official sources
- **Advanced search** - Full-text search across all entity information
- **Export capabilities** - Data export in multiple formats

## 🚀 Development Workflow

This project uses a clear separation between development (`src/`) and production (root) files.

### Project Structure

```
SanDiegoGov/
├── src/                # DEVELOPMENT FILES (edit these)
│   ├── index.html      # Network view page
│   ├── script.js       # Network visualization (uses ../data/)
│   ├── orgchart.html   # Org chart page
│   ├── orgchart-script.js # Org chart code (uses ../data/)
│   ├── styles.css      # Network styles
│   ├── orgchart-styles.css # Org chart styles
│   └── server.py       # Development server
├── data/               # CSV data files (shared between dev/prod)
│   ├── sd_gov_entities_complete.csv
│   ├── sd_gov_relationships_complete.csv
│   └── [other data files]
├── *.html, *.js, *.css # PRODUCTION FILES (auto-generated via build.sh)
├── build.sh            # Build script (src/ → root)
├── dev.sh              # Development server launcher
└── vercel.json         # Vercel deployment configuration
```

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/SanDiegoGov.git
cd SanDiegoGov

# Development mode (edit files in src/)
./dev.sh
# Visit http://localhost:8000

# Build for production (updates root files)
./build.sh

# Test production build
python -m http.server 8000

# Deploy to Vercel
vercel --prod
```

### Development Guidelines

1. **Always edit files in `src/` directory** - Never edit root JS/HTML/CSS files directly
2. **Run `./build.sh` before deploying** - This converts development files to production
3. **Test production build locally** - Use `python -m http.server 8000` after building
4. **Data files are shared** - Changes to `/data` CSVs affect both dev and prod immediately

### Adding New Features

When adding new files:

```javascript
// In src/newfile.js - use development paths:
d3.csv("../data/your_data.csv")
```

Then update `build.sh` to include your new files:

```bash
# Add these lines to build.sh:
sed 's|../data/|data/|g' src/newfile.js > newfile.js
cp src/newfile.html newfile.html
cp src/newfile.css newfile.css
```

### Daily Workflow

```bash
# Morning - start development
./dev.sh                    # Start dev server
# Edit files in src/ directory

# Ready to deploy?
./build.sh                  # Build production files
git add .
git commit -m "feat: your feature description"
vercel --prod               # Deploy to production
```

### Data Updates

```bash
# Edit CSV files directly
nano data/sd_gov_entities_complete.csv
# Changes appear in both dev and prod immediately - no build needed!
```

## 🤝 Contributing

We welcome contributions to improve San Diego's government transparency:

1. **Data updates**: Help maintain current entity information
2. **Relationship verification**: Validate and improve authority relationships
3. **Feature development**: Enhance visualization and user experience
4. **Documentation**: Improve research methodology and user guides

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **San Diego Government** - Official sources and public data
- **Open Government Community** - Transparency and accountability advocacy
- **Government transparency advocates** - Inspiration and proven methodology
