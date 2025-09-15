#!/bin/bash
# Custom command: validate-all
# Comprehensive validation of data and code

echo "🔍 Running comprehensive validation on stable codebase..."
echo "========================================================="

# 1. Data Quality Check
echo ""
echo "📊 DATA VALIDATION"
echo "------------------"
python scripts/validate_data_quality.py
DATA_RESULT=$?

# 2. Relationship Integrity
echo ""
echo "🔗 RELATIONSHIP VALIDATION"
echo "--------------------------"
python scripts/validate_relationships.py
REL_RESULT=$?

# 3. Check for Regressions of Previously Resolved Issues
echo ""
echo "🛡️  REGRESSION PREVENTION"
echo "-------------------------"

# Check for regression of Issue #1: D3 Mutation problem
if grep -q "entityIds.has(rel.source)" script.js; then
    echo "❌ REGRESSION: Issue #1 detected - D3 mutation problem in filters"
    echo "   This was previously resolved. Use sourceId/targetId instead of source/target"
    exit 1
else
    echo "✅ Issue #1: Not detected"
fi

# Check for regression of Issue #2: DOM destruction
if grep -q 'selectAll("\*").remove()' script.js; then
    echo "❌ REGRESSION: Issue #2 detected - Complete DOM destruction on update"
    echo "   This was previously resolved. Use enter/update/exit pattern"
    exit 1
else
    echo "✅ Issue #2: Stable - No DOM destruction"
fi

# Check for regression of Issue #3: Hardcoded hierarchy
if grep -q "Todd Gloria" orgchart-script.js; then
    echo "❌ REGRESSION: Issue #3 detected - Hardcoded org chart data"
    echo "   This was previously resolved. Should build from CSV relationships"
    exit 1
else
    echo "✅ Issue #3: Stable - Data-driven hierarchy"
fi

# Check that Issue #5 performance optimizations remain
if grep -q "requestAnimationFrame" script.js; then
    echo "✅ Issue #5: Stable - Performance optimizations active"
else
    echo "❌ REGRESSION: Issue #5 - Performance optimizations missing"
    echo "   This was previously resolved. Add requestAnimationFrame for DOM updates"
    exit 1
fi

# 4. File Structure Check
echo ""
echo "📁 FILE STRUCTURE"
echo "-----------------"

REQUIRED_FILES=(
    "script.js"
    "orgchart-script.js"
    "index.html"
    "orgchart.html"
    "data/sd_gov_entities_complete.csv"
    "data/sd_gov_relationships_complete.csv"
    "build.sh"
    "dev.sh"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ Missing: $file"
    fi
done

# 5. Build Consistency
echo ""
echo "🏗️  BUILD CONSISTENCY"
echo "--------------------"

# Single directory structure - no build comparison needed
echo "ℹ️  Single directory structure - files are production ready"
        echo "   Run: ./build.sh"
    else
        echo "✅ Production files are up to date"
    fi
fi

# 6. Performance Metrics
echo ""
echo "⚡ PERFORMANCE METRICS"
echo "---------------------"

# Check file sizes
SCRIPT_SIZE=$(stat -f%z "script.js" 2>/dev/null || stat -c%s "script.js" 2>/dev/null)
if [ "$SCRIPT_SIZE" -gt 50000 ]; then
    echo "⚠️  script.js is large ($(($SCRIPT_SIZE / 1024))KB)"
    echo "   Consider code splitting"
else
    echo "✅ script.js size: $(($SCRIPT_SIZE / 1024))KB"
fi

# Count entities and relationships
ENTITY_COUNT=$(grep -c "^[^,]" data/sd_gov_entities_complete.csv | tail -1)
REL_COUNT=$(grep -c "^[^,]" data/sd_gov_relationships_complete.csv | tail -1)
echo "📊 Data size: $ENTITY_COUNT entities, $REL_COUNT relationships"

# 7. Summary
echo ""
echo "=================================="
echo "📋 VALIDATION SUMMARY"
echo "=================================="

if [ $DATA_RESULT -eq 0 ] && [ $REL_RESULT -eq 0 ]; then
    echo "✅ Core validation: PASSED"
else
    echo "❌ Core validation: FAILED"
fi

# Count warnings
WARNING_COUNT=$(grep -c "⚠️" /tmp/validation_output.txt 2>/dev/null || echo "0")
if [ "$WARNING_COUNT" -gt 0 ]; then
    echo "⚠️  Warnings found: $WARNING_COUNT"
fi

echo ""
echo "💡 Next steps:"
echo "  - Fix any ❌ errors (likely regressions of resolved issues)"
echo "  - Address ⚠️ warnings for optimization"
echo "  - For new development: fix-issue [type] (data/ui/perf/feature/bug/test)"
echo "  - Test stability with: test-filter"
echo "  - Ready for feature development if all validations pass"