# Structure Phase: Relationship Mapping Methodology

## Following SF CivLab Approach: Simple Relationships First

### Phase Structure Overview
Following SF's proven pattern:
1. **Structure-1**: Hierarchical parent-child relationships only
2. **Structure-2**: Simple appointment relationships  
3. **No complex networks** until basic structure validates

## Structure-1: Hierarchical Relationships

### Relationship Types to Map
**Parent → Child Authority Relationships**
- Mayor → City Departments
- Board of Supervisors → County Departments  
- Department → Division/Office
- Regional Authority → Board/Committee

### Data Structure
```csv
relationship_id,parent_id,child_id,relationship_type,authority_source,last_verified
hier-001,mayor-001,city-dept-001,reports_to,San Diego City Charter,2024-09-03
```

### Relationship Categories (SF Model)
- **reports_to**: Direct hierarchical reporting
- **oversees**: Policy oversight without direct authority
- **coordinates_with**: Peer-level coordination
- **advises**: Advisory relationship without authority

## Structure-2: Appointment Relationships  

### Appointment Authority Mapping
**Appointer → Appointee Authority**
- Mayor → Board/Commission Members
- City Council → Commission Confirmations
- Board of Supervisors → County Board Members
- Regional Authority → Committee Members

### Data Structure
```csv
appointment_id,appointer_id,appointee_entity_id,appointment_type,term_length,authority_source,last_verified
appt-001,mayor-001,city-board-001,appoints_members,4_years,San Diego Municipal Code,2024-09-03
```

## Quality Standards

### Source Citation Requirements
- Every relationship must have documented authority source
- Legal citations from charter, municipal code, or ordinance
- No relationships without verified legal basis

### Validation Process
1. **Legal Authority Check**: Verify each relationship has legal source
2. **Logical Consistency**: Ensure relationships make governmental sense
3. **Cross-Reference**: Confirm relationships across multiple sources
4. **Completeness**: Map all major authority relationships

## San Diego Specific Challenges

### Multi-Jurisdictional Complexity
Unlike SF's unified system, San Diego requires:
- **Cross-jurisdictional coordination**: SANDAG ↔ Cities/County
- **Regional authority independence**: Special districts with own governance
- **Overlapping service areas**: Multiple entities serving same geographic areas

### Authority Types Unique to San Diego
- **Joint Powers Authority**: SANDAG's unique regional coordination role
- **Special District Independence**: Port, Airport, Water authorities with independent boards
- **County-City Separation**: Duplicate services with different authorities

## Implementation Strategy

### Structure-1 Execution
1. **City Hierarchy**: Mayor → City Departments → Divisions
2. **County Hierarchy**: Supervisors → County Departments → Divisions  
3. **Regional Hierarchy**: Authority Boards → Committees
4. **Validation**: Cross-check all relationships with legal sources

### Structure-2 Execution  
1. **City Appointments**: Mayor → Board members, City Council → Confirmations
2. **County Appointments**: Supervisors → Board members
3. **Regional Appointments**: Authority boards → Committee members
4. **Validation**: Verify appointment authorities with charter/code citations

## Success Metrics

### Relationship Coverage
- **Target**: All major entities have documented reporting relationships
- **Quality**: 100% of relationships have legal source citations
- **Accuracy**: Cross-validated against multiple official sources

### Visualization Readiness
- **Simple network graph**: Parent-child relationships visualizable
- **Appointment chains**: Clear accountability pathways
- **CSV format**: Ready for D3.js network visualization

`★ Insight ─────────────────────────────────────`
**Structure Phase Critical Success Factor: Simplicity First**

SF's breakthrough came from mapping simple, verifiable relationships before attempting complex networks. San Diego's multi-jurisdictional structure makes this even more important - we must establish clear parent-child and appointment relationships before tackling regional coordination complexity.
`─────────────────────────────────────────────────`

## Ready for Implementation

The methodology prioritizes:
1. **Verifiable relationships** with legal citations
2. **Simple structures** following SF's proven approach  
3. **Multi-jurisdictional coverage** adapted for San Diego's complexity
4. **Visualization readiness** for network graph development

This foundation will support advanced relationship mapping in future phases.