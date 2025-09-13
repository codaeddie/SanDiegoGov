# Development Roadmap - San Diego Government Visualization

## Current Implementation Status

The San Diego Government Chart is functional with core features implemented, but several advanced features remain unbuilt. This document provides an honest assessment of the current state and development priorities.

## ✅ What Currently Works

- **Basic Network Visualization** - D3.js force-directed graph with 173 entities
- **Basic Entity Profiles** - Name, description, relationships in sidebar
- **Basic Filtering** - Jurisdiction, entity type, relationship type filters  
- **Basic Search** - Simple text filtering of entities
- **Dual Views** - Network graph + Org chart views
- **Static Deployment** - HTML/CSS/JS files serve correctly
- **CSV Data Loading** - 173 entities, 248 relationships load successfully

## ❌ What Needs Development

### Critical Implementation Gaps

#### Issue #1: Dashboard Metrics Widget
**Priority: HIGH** | **Timeline: 2-3 hours**

**Problem**: No dashboard showing city statistics, population, budget aggregates, or key metrics.

**Current State**: Only entity/relationship counters in sidebar
**Target**: Prominent metrics dashboard similar to government transparency sites

**Implementation Steps**:
1. Add HTML structure for metrics cards in header area
2. Calculate budget totals from entity data
3. Add CSS styling for metric display
4. Update JavaScript to populate metrics dynamically

#### Issue #2: Enhanced Search with Autocomplete  
**Priority: HIGH** | **Timeline: 3-4 hours**

**Problem**: Current search is basic text filter with no dropdown, autocomplete, or advanced features.

**Current State**: Simple `input.addEventListener('input')` with basic filtering
**Target**: Dropdown search results, autocomplete, person search

**Implementation Steps**:
1. Create search index including entities and people
2. Build autocomplete dropdown with styled results
3. Add click handlers for search result navigation
4. Implement result highlighting and better UX

#### Issue #3: Enhanced Entity Profiles
**Priority: MEDIUM** | **Timeline: 4-6 hours**

**Problem**: Entity profiles lack photos, current member lists, rich formatting.

**Current State**: Basic name, description, website link in sidebar
**Target**: Official photos, member lists, enhanced data, better styling

**Implementation Steps**:
1. Extend CSV schema to include `photo_url`, `current_members`, `seat_count`
2. Update sidebar rendering to handle rich profile data
3. Add enhanced CSS styling for profile display
4. Collect official photos and member data for key entities

#### Issue #4: Topic-Based Filtering
**Priority: MEDIUM** | **Timeline: 3-5 hours**

**Problem**: Can only filter by jurisdiction/entity type, not by functional area.

**Current State**: Three filter categories (jurisdiction, entity type, relationships)
**Target**: Filter by topics like public safety, housing, transportation, environment

**Implementation Steps**:
1. Add `topic_tags` field to entity CSV schema
2. Categorize existing entities by functional area
3. Add topic filter buttons to UI
4. Update filtering logic to handle topic categories

#### Issue #5: People in Focus Section
**Priority: MEDIUM** | **Timeline: 2-3 hours**

**Problem**: No prominent display of current government leaders.

**Current State**: Leadership names buried in entity data
**Target**: Prominent cards showing mayor, council president, supervisors

**Implementation Steps**:
1. Add HTML structure for leadership grid
2. Extract current leadership from entity data
3. Add CSS styling for leadership cards
4. Add click handlers to navigate to leader entities

#### Issue #6: Data Schema Inconsistency
**Priority: MEDIUM** | **Timeline: 2-4 hours**

**Problem**: References to data fields that don't exist in CSV files.

**Current Schema**: Basic fields (id, name, type, description, etc.)
**Missing Fields**: photo_url, current_members, topic_tags, seat_count, budget

**Implementation Steps**:
1. Update CSV headers to include missing fields
2. Modify JavaScript to gracefully handle missing data
3. Create data collection plan for populating new fields
4. Update validation scripts for new schema

## Development Phases

### Phase 1: Quick Wins (8-12 hours total)
**Timeline: 1-2 weeks**
- Dashboard Metrics Widget
- Enhanced Search with Autocomplete  
- People in Focus Section

### Phase 2: Data Enhancement (8-12 hours total)
**Timeline: 2-3 weeks**
- Data Schema Extension
- Enhanced Entity Profiles
- Official Photo Collection

### Phase 3: Advanced Features (6-10 hours total)
**Timeline: 3-4 weeks**
- Topic-Based Filtering
- Advanced UI Polish
- Mobile Optimization

## Technical Debt Items

### Immediate Cleanup
- Remove references to unimplemented features in comments
- Clean up CSS for unused styling
- Validate all entity relationships work correctly
- Test cross-browser compatibility

### Code Quality
- Add proper error handling for missing data
- Implement graceful degradation for JavaScript failures
- Add loading states and better UX feedback
- Improve mobile responsiveness

## Data Collection Priorities

### High Priority Data Collection
1. **Official photos** for mayor, council members, department heads
2. **Current member lists** for boards and commissions
3. **Budget data** for major departments and entities
4. **Topic categorization** for all 173 entities

### Medium Priority Data Collection
1. **Contact information** for department heads
2. **Meeting schedules** for boards and commissions
3. **Performance metrics** for major departments
4. **Historical data** for entity creation/changes

## Success Criteria

### Phase 1 Complete
- [ ] Dashboard showing city population, budget, employee count
- [ ] Search with dropdown results and autocomplete
- [ ] Leadership section with current mayor/council/supervisors
- [ ] All features function on mobile devices

### Phase 2 Complete  
- [ ] Entity profiles include photos where available
- [ ] Board/commission member lists displayed
- [ ] Enhanced profile styling and layout
- [ ] Extended CSV schema fully populated

### Phase 3 Complete
- [ ] Topic filtering functional for all entities
- [ ] Advanced search across all data fields
- [ ] Professional-grade UI matching government transparency standards
- [ ] Performance optimization for large datasets

## Quality Assurance Checklist

### Before Each Release
- [ ] All existing functionality continues to work
- [ ] New features work across browsers (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness maintained
- [ ] Data loading performance acceptable (<3 seconds)
- [ ] No JavaScript console errors
- [ ] Accessibility standards maintained

### Before Production Deployment
- [ ] Full end-to-end testing completed
- [ ] Data accuracy verification
- [ ] Performance testing with full dataset
- [ ] Security review of any new code
- [ ] Documentation updated to reflect new features

## Resource Requirements

### Development Resources
- **Lead Developer**: 20-30 hours total for all phases
- **Data Researcher**: 10-15 hours for data collection and validation
- **Optional UX Designer**: 5-10 hours for advanced styling

### No Additional Technology Required
- All development uses existing HTML/CSS/JavaScript + D3.js stack
- No new dependencies or build processes needed
- Existing Python validation scripts sufficient

## Risk Assessment

### Low Risk Items
- Dashboard metrics, search enhancement, people section (straightforward UI work)
- Data schema extension (non-breaking changes)
- CSS/styling improvements

### Medium Risk Items  
- Topic categorization (requires subjective data classification)
- Photo collection (depends on availability of official images)
- Advanced profile features (complexity in data handling)

### Mitigation Strategies
- Implement features incrementally with fallbacks
- Test continuously with existing data
- Design for graceful degradation when data is missing
- Focus on core functionality before advanced features

---

**Bottom Line**: The foundation is solid and the codebase is ready for systematic enhancement. Each phase builds on the previous, maintaining stability while adding user value. The development approach prioritizes working features over perfect features, allowing for iterative improvement based on user feedback.
