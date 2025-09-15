#!/bin/bash
# Pre-commit hook for San Diego Gov Chart
# Validates data and code before allowing commits

echo "🔍 Running pre-commit validation on stable codebase..."

# Check if we're in the right directory
if [ ! -f "script.js" ]; then
    echo "❌ Not in SanDiegoGov root directory"
    exit 1
fi

# 1. Validate CSV data integrity
echo "📊 Validating data files..."
python scripts/validate_data_quality.py > /tmp/data_validation.log 2>&1
if [ $? -ne 0 ]; then
    echo "❌ Data validation failed:"
    cat /tmp/data_validation.log
    exit 1
fi

# 2. Check for relationship orphans
echo "🔗 Checking relationship integrity..."
python scripts/validate_relationships.py > /tmp/rel_validation.log 2>&1
if [ $? -ne 0 ]; then
    echo "❌ Relationship validation failed:"
    cat /tmp/rel_validation.log
    exit 1
fi

# 3. Check for console.log statements in production files
echo "🚫 Checking for debug statements..."
if grep -r "console\.log" *.js --exclude="*test*" | grep -v "^//" ; then
    echo "⚠️  Warning: console.log statements found in files"
    echo "Consider removing before production deployment"
fi

# 4. Verify build consistency
echo "🏗️  Checking build consistency..."
# Single directory structure - no build needed
echo "ℹ️  Single directory structure - files are production ready"

# 5. Check for new potential issues
echo "🔍 Checking for potential regressions..."
if grep -q "entityIds.has(rel.source)" script.js; then
    echo "❌ Critical: D3 mutation issue detected (previously resolved Issue #1)"
    echo "Use sourceId/targetId instead of source/target"
    exit 1
fi

if grep -q "selectAll.*remove()" script.js; then
    echo "❌ Critical: DOM destruction pattern detected (previously resolved Issue #2)"
    echo "Use enter/update/exit pattern instead"
    exit 1
fi

# 6. Validate feature additions don't break existing functionality
echo "🎯 Validating feature compatibility..."
if [ -f "package.json" ] && ! grep -q "test" package.json; then
    echo "⚠️  Warning: Consider adding automated tests for new features"
fi

echo "✅ Pre-commit validation complete - stable codebase maintained"