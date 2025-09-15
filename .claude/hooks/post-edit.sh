#!/bin/bash
# Post-edit hook - runs after any file edit
# Provides immediate feedback on changes

# Only run for JavaScript and CSV files
if [[ "$1" == *.js ]] || [[ "$1" == *.csv ]]; then
    echo "🔄 Post-edit validation for $1 (stable system check)"

    # For JavaScript files
    if [[ "$1" == *.js ]]; then
        # Check for regression of previously resolved issues
        if grep -q "rel\.source.*===" "$1"; then
            echo "❌ REGRESSION: D3 mutation issue detected!"
            echo "This was resolved in Issue #1. Use sourceId/targetId for comparisons."
        fi

        if grep -q "selectAll.*remove()" "$1"; then
            echo "❌ REGRESSION: DOM destruction detected!"
            echo "This was resolved in Issue #2. Use enter/update/exit pattern."
        fi

        if grep -q "attr.*d\.source\.x" "$1" && ! grep -q "requestAnimationFrame" "$1"; then
            echo "❌ REGRESSION: Performance issue detected!"
            echo "This was resolved in Issue #5. Use requestAnimationFrame for DOM updates."
        fi

        # Check for new code quality issues
        if grep -q "console\.error\|console\.warn" "$1" && ! grep -q "^//" <<< "$(grep "console\.error\|console\.warn" "$1")"; then
            echo "💡 Consider replacing console errors with proper error handling"
        fi

        if grep -q "TODO\|FIXME\|HACK" "$1"; then
            echo "📝 TODO/FIXME comments found - consider addressing before commit"
        fi
    fi

    # For CSV files
    if [[ "$1" == *.csv ]]; then
        echo "📊 Data file changed - running enhanced validation..."
        python scripts/validate_data_quality.py --file "$1" 2>/dev/null
        if [ $? -eq 0 ]; then
            echo "✅ Data validation passed"
            echo "🔗 Checking relationship integrity..."
            python scripts/validate_relationships.py 2>/dev/null
            if [ $? -eq 0 ]; then
                echo "✅ Relationship integrity maintained"
            else
                echo "⚠️  Relationship validation warning - check for orphaned relationships"
            fi
        else
            echo "❌ Data validation failed - check format and required fields"
        fi
    fi

    echo "✅ Post-edit validation complete"
fi