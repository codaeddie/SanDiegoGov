# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Running the Development Server
```bash
# Start development server from project root
./dev.sh
# OR
python3 server.py

# Access the application:
# Network View: http://localhost:8012
# Org Chart View: http://localhost:8012/orgchart.html
```

### Building for Production
```bash
# Build production files
./build.sh

# Test production build locally
python -m http.server 8012
```

### Data Validation
```bash
# Validate entity and relationship data integrity
python scripts/validate_data_quality.py
python scripts/validate_relationships.py
```

## Architecture Overview

### Two-View System
- **Network View** (`index.html` / `script.js`): D3.js force-directed graph showing 173 entities and 248 relationships
- **Org Chart View** (`orgchart.html` / `orgchart-script.js`): Hierarchical tree structure with actual leadership names

### Critical Issues Resolved
- **Relationship filtering**: Now works correctly across all entity types
- **Performance optimizations**: Implemented for better graph rendering
- **Org chart data**: Now uses actual data structure instead of hardcoded hierarchy
- **Development environment**: Server configuration and path handling corrected

### Development vs Production Structure
- **Development files**: Located in project root - edit these directly
- **Production files**: Auto-generated via `build.sh` when needed
- **Data files**: Located in `data/` directory - consistent paths for both dev and production

### Data Architecture
- **Master entity file**: `data/sd_gov_entities_complete.csv` (173 government entities)
- **Relationships file**: `data/sd_gov_relationships_complete.csv` (248 authority relationships)
- **Supporting data**: Separate CSV files for elected officials, departments, boards, regional authorities

### Key Technical Details
- Both development and production use consistent `data/` paths - no path conversion needed
- Server runs from project root on port 8012 (standard for both dev and production testing)
- No build process required for data updates - CSV changes are immediate
- Static site with no backend dependencies - just HTML/CSS/JavaScript and D3.js v7

### Development Environment Status
- All critical path and server configuration issues have been resolved
- Development workflow now matches production environment structure
- Relationship filtering and performance optimizations are fully functional

## Important Instructions

Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.