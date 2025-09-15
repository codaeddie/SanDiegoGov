# San Diego Government Chart

The San Diego Government Chart provides an interactive map of San Diego's complex multi-jurisdictional government structure. Explore 173 government entities and 248 authority relationships across city, county, and regional levels.

## Quick Start

### Local Development

```bash
git clone...
cd SanDiegoGov
python server.py

# navigate to: 
http://localhost:8012
```

## Project Structure

```
eddie in SanDiegoGov on   main
❯ lsd --tree --depth 2
├──  CLAUDE.md
├──  data
│   ├──  sd_gov_appointments.csv
│   ├──  sd_gov_boards_commissions.csv
│   ├──  sd_gov_city_departments.csv
│   ├──  sd_gov_county_departments.csv
│   ├──  sd_gov_elected.csv
│   ├──  sd_gov_entities_complete.csv
│   ├──  sd_gov_regional_authorities.csv
│   ├──  sd_gov_relationships_complete.csv
│   ├──  sd_gov_relationships_hierarchical.csv
│   ├──  sd_regional_boards_committees_2025.csv
│   └──  Struct.md
├──  docs
│   ├──  replication-guide.md
│   ├──  research-methodology.md
├──  index.html
├──  ISSUES.md
├──  LICENSE
├──  orgchart-script.js
├──  orgchart-styles.css
├──  orgchart.html
├──  README.md
├──  ROADMAP.md
├──  script.js
├──  scripts
│   ├──  generate_master_list.py
│   ├──  integrate_regional_boards.py
│   ├──  validate_data_quality.py
│   └──  validate_relationships.py
├──  server.py
├──  styles.css
└──  vercel.json
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

## Visualization Features

### Network View (Interactive Graph)
- **Force-directed graph** with 173 entities and 248 relationships
- **Jurisdiction color-coding**: City (blue), County (green), Regional (orange)
- **Relationship types**: Hierarchical (solid lines) and Appointment (dashed lines)
- **Interactive exploration**: Click, drag, zoom, and search
- ✅ **Fixed Filtering**: By jurisdiction, entity type, and relationship type - now works reliably
- **Real-time search**: Find any entity by name
- ✅ **Smart Entity Sidebar**: Complete information with working relationship navigation
- ✅ **Smooth Transitions**: No more jarring reloads when changing filters
- ✅ **Optimized Performance**: Efficient rendering with 60fps animations

### ~~Org Chart View (Hierarchical Tree)~~

- ~~✅ **Data-Driven Hierarchy**: Now built from actual CSV relationship data (not hardcoded)~~
- ~~**Hierarchical tree structure** showing clear command chains~~
- ~~**Current leadership names**: Actual people in positions (2024)~~
- ~~**Collapsible branches**: Manage complexity with expand/collapse~~
- ~~**Three-jurisdiction layout**: City, County, Regional authorities~~
- ~~**Interactive navigation**: Click to explore organizational structure~~
- ~~**Person-focused display**: Shows who actually runs each department~~
- ~~**Zoom and pan**: Navigate large organizational hierarchy~~
- ~~✅ **Synchronized Data**: Changes to CSV files now appear in org chart automatically~~

### San Diego-Specific Features
- **Multi-jurisdictional complexity**: Handle regional governance federation
- **SANDAG coordination**: Regional planning authority relationships
- **Leadership transparency**: Current department heads and officials named
- **Cross-boundary appointments**: Regional representation mapping
- **Authority chain visualization**: Follow complete accountability pathways

## Tech Stack

### Frontend
- **Static HTML/CSS/JavaScript** - Simple, fast, reliable
- **D3.js v7** - Network visualization and interaction

### Data Processing
- **Python scripts** - Data collection and validation
- **CSV format** - Simple, portable, version-controllable
- **Automated validation** - Data integrity and URL checking
- **Legal source citations** - Complete authority documentation

## Future Enhancements

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

## Contributing

**Anything.. please help me. idkwtfiamdoing** 

## License

MIT License - See [LICENSE](LICENSE) file for details.
