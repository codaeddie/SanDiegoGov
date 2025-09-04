# San Diego Government Data Structure

## File Organization

Following the SF model with adaptations for San Diego's governmental complexity:

### Core Entity Files
- `sd_gov_elected.csv` - Elected officials (Mayor, Council, County Supervisors)
- `sd_gov_city_departments.csv` - City of San Diego departments
- `sd_gov_county_departments.csv` - County of San Diego departments  
- `sd_gov_boards_commissions.csv` - Boards and commissions (city and county)
- `sd_gov_advisory.csv` - Advisory bodies and citizen committees
- `sd_gov_regional_authorities.csv` - Regional entities (SANDAG, MTS, etc.)
- `sd_gov_entities_complete.csv` - Master file with all entities

### Data Schema

Each entity record includes:
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

### Relationship Mapping
- `sd_gov_relationships.csv` - Entity-to-entity relationships
- Relationship types: reports_to, oversees, advises, coordinates_with, funds

## Data Sources
All data sourced from official government documents with full citations maintained in source_citations.md