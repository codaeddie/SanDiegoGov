# Claude Code Workflow Guide for San Diego Gov Chart

## 🚀 Quick Start Commands

### Essential Commands for This Project

```bash
# Start development session
"Start dev server on port 8012 and open the visualization"

# Validate everything
"Run validate-all"

# Test all functionality
"Run comprehensive test of all filters and views"

# Work on roadmap items
"Load ROADMAP.md and implement dashboard metrics feature"

# Add new features
"Add enhanced search functionality to the org chart"

# Development workflow
"Review codebase architecture and suggest next enhancement"
```

## 🎯 Optimized Workflows

### 1. Feature Development Workflow (Primary Focus)

```bash
# Step 1: Load context and plan feature
User: "Review ROADMAP.md and implement dashboard metrics"

# Claude will:
- Read ROADMAP.md and current architecture
- Use TodoWrite to create feature subtasks
- Analyze existing codebase structure
- Plan integration approach

# Step 2: Implement with testing
User: "Implement the feature with comprehensive testing"

# Claude will:
- Develop new functionality in src/
- Run dev server on port 8012
- Test feature integration
- Ensure no regressions

# Step 3: Validate and deploy
User: "Run validate-all and build for production"

# Claude will:
- Run comprehensive validation
- Test all existing functionality
- Build optimized production version
- Verify deployment readiness
```

### 2. Multi-Feature Development

```bash
# Develop multiple features in parallel
User: "Implement enhanced search and dashboard metrics simultaneously"

# Claude will coordinate development:
- Plan feature architecture and dependencies
- Develop enhanced search in visualization layer
- Add dashboard metrics to data layer
- Ensure features work together seamlessly
- Test comprehensive integration
```

### 3. Data Enhancement Workflow

```bash
# Enhance existing data with new features
User: "Add department performance metrics and citizen engagement scores"

# Claude will:
- Analyze current data structure
- Extend CSV schema with new fields
- Update data processing pipeline
- Integrate new metrics into visualizations
- Test enhanced data display
- Validate data integrity across all views
```

## 🛠️ Hooks in Action

### Pre-Commit Hook
Automatically runs before any commit:
- Validates all CSV data
- Checks relationship integrity
- Warns about console.log statements
- Ensures build is current
- Flags hardcoded values

### Post-Edit Hook
Provides immediate feedback:
- **For JS files**: Warns about D3 mutations, DOM destruction, performance issues
- **For CSV files**: Runs data validation immediately

## 🤖 Agent Configurations

### Feature Development Agent
```bash
# Trigger with:
"Use feature development agent for dashboard metrics"

# Agent will:
1. Read ROADMAP.md for feature requirements
2. Analyze current architecture
3. Design feature implementation
4. Develop with best practices
5. Test thoroughly and validate
```

### Enhancement Validator Agent
```bash
# Auto-triggers on feature development, or manually:
"Run enhancement validator agent"

# Agent will:
1. Test all existing functionality
2. Verify new features work correctly
3. Check performance impact
4. Validate user experience
5. Ensure production readiness
```

## 📋 Custom Commands Reference

### `validate-all`
Complete validation suite:
- Data quality check
- Relationship integrity
- Known issues detection
- File structure verification
- Build consistency
- Performance metrics

### `test-filter`
Tests all filter combinations:
- Jurisdiction filters (City/County/Regional)
- Type filters (Elected/Departments)
- Relationship filters (Hierarchical/Appointments)
- Checks for console errors
- Verifies node/link counts

### `develop-feature [name]`
Generates feature templates:
- Creates feature branch
- Provides development structure
- Includes test framework
- Suggests integration steps

## 💡 Pro Tips for Maximum Efficiency

### 1. Batch Operations
```bash
# Instead of sequential commands:
"Check script.js"
"Check orgchart-script.js"
"Check data files"

# Use parallel execution:
"Check script.js, orgchart-script.js, and all CSV files in parallel"
```

### 2. Smart Context Loading
```bash
# Start complex tasks with full context:
"Load ISSUES.md, CLAUDE.md, and current script.js, then fix issue #2"
```

### 3. Validation-Driven Development
```bash
# After every change:
"Make the change and immediately run validation"

# Even better - let hooks do it automatically!
```

### 4. Use Issue Templates
```bash
# Don't figure it out from scratch:
"Apply the ready-to-fix solution from ISSUES.md for issue #3"
```

### 5. Test Incrementally
```bash
# After each fix:
"Test just the City filter first, then test combinations"
```

## 🔄 Iteration Pattern

### The Optimal Fix Cycle (Per Issue)

1. **Read** (2 min)
   ```bash
   "Show me issue #X and the current implementation"
   ```

2. **Plan** (1 min)
   ```bash
   "Create todos for fixing issue #X"
   ```

3. **Implement** (5-10 min)
   ```bash
   "Apply the fix from ISSUES.md"
   ```

4. **Test** (3 min)
   ```bash
   "Run test-filter and check for errors"
   ```

5. **Validate** (2 min)
   ```bash
   "Run validate-all"
   ```

6. **Build** (1 min)
   ```bash
   "Run build.sh if validation passed"
   ```

## 📊 Success Metrics

### After Each Issue Fix
- [ ] No console errors
- [ ] All filters work
- [ ] Relationships display correctly
- [ ] Navigation works from any state
- [ ] Performance is smooth
- [ ] Validation passes

### Overall Project Health
- [x] All 5 critical issues resolved
- [x] 173 entities accessible
- [x] 248 relationships visible
- [x] Both views synchronized
- [x] Smooth performance achieved
- [x] Proper data-driven architecture
- [ ] Dashboard metrics implemented
- [ ] Enhanced search functionality
- [ ] Advanced filtering options
- [ ] Performance analytics
- [ ] Export capabilities

## 🚨 Common Pitfalls & Solutions

### Pitfall 1: Editing Production Files
```bash
# Wrong:
"Edit script.js"

# Right:
"Edit src/script.js"
```

### Pitfall 2: Not Testing After Development
```bash
# Wrong:
"Add all features then test"

# Right:
"Develop feature incrementally with testing"
```

### Pitfall 3: Ignoring Performance Impact
```bash
# Wrong:
"The performance impact is probably minimal"

# Right:
"Profile performance before and after changes"
```

### Pitfall 4: Not Following Architecture
```bash
# Wrong:
"Add quick feature without planning"

# Right:
"Follow established patterns and architecture"
```

## 🎓 Example Power Session

```bash
# The perfect 45-minute feature development session:

User: "Load ROADMAP.md and implement dashboard metrics with real-time updates."

Claude: [Creates TodoWrite list]
        [Reads architecture files]
        [Designs dashboard component]
        [Implements metrics collection]
        [Adds real-time data binding]
        [Tests on dev server port 8012]
        [Runs validate-all]
        [Builds for production]

User: "Excellent! Now add export functionality and commit the complete feature"

Claude: [Adds CSV/JSON export options]
        [Tests export functionality]
        [Runs comprehensive testing]
        [Creates feature commit with proper message]

# Result: Complete dashboard metrics feature with export, tested and committed in 45 minutes
```

## 🌟 Current Development Environment

### Development Setup
- **Dev Server**: Port 8012 (corrected from previous port issues)
- **Source Directory**: `/src/` (always work here, never root files)
- **Data Files**: Validated and complete (173 entities, 248 relationships)
- **Build Process**: Optimized and working (`build.sh`)
- **Validation**: Comprehensive suite available (`validate-all`)

### ROADMAP Priorities
1. **Dashboard Metrics** - Real-time performance indicators
2. **Enhanced Search** - Advanced filtering and search capabilities
3. **Export Features** - CSV/JSON/PDF export options
4. **Performance Analytics** - User interaction tracking
5. **Accessibility** - WCAG compliance improvements

## 📝 Remember

1. **Always work in `src/`** - never edit root files directly
2. **Test after every change** - maintain quality standards
3. **Follow established architecture** - build on solid foundation
4. **Use development hooks** - they catch common mistakes
5. **Run validate-all before building** - ensure production readiness
6. **Focus on ROADMAP items** - these are the current priorities

This workflow is optimized for feature development and enhancement. The foundation is solid - now we build amazing new capabilities on top of it.