#!/bin/bash
# Custom command: fix-issue [type]
# Handles minor issues and feature implementation in stable codebase

ISSUE_TYPE=$1

if [ -z "$ISSUE_TYPE" ]; then
    echo "Usage: fix-issue [type]"
    echo "Available issue types:"
    echo "  data     - Fix data inconsistencies"
    echo "  ui       - Fix UI/UX issues"
    echo "  perf     - Performance optimizations"
    echo "  feature  - Implement new feature"
    echo "  bug      - Fix minor bugs"
    echo "  test     - Add or fix tests"
    exit 1
fi

echo "🔧 Handling $ISSUE_TYPE issue on stable codebase..."

case $ISSUE_TYPE in
    data)
        echo "📊 Handling data issue workflow..."
        # Create backup
        cp data/sd_gov_entities_complete.csv data/sd_gov_entities_complete.csv.backup
        cp data/sd_gov_relationships_complete.csv data/sd_gov_relationships_complete.csv.backup

        echo "1. Running data validation..."
        python scripts/validate_data_quality.py

        echo "2. Checking relationship integrity..."
        python scripts/validate_relationships.py

        echo "3. Backup created. Ready for data fixes."
        echo "   Use data-validator agent or manual CSV editing"
        ;;

    ui)
        echo "🎨 Handling UI/UX issue workflow..."
        # Create backup
        cp script.js script.js.backup
        cp orgchart-script.js orgchart-script.js.backup

        echo "1. UI files backed up"
        echo "2. Test current functionality: ./dev.sh"
        echo "3. Implement UI changes"
        echo "4. Test on http://localhost:8012"
        ;;

    perf)
        echo "⚡ Handling performance optimization workflow..."
        # Create backup
        cp script.js script.js.backup

        echo "1. Running performance baseline..."
        echo "2. Analyze performance metrics"
        echo "3. Implement optimizations carefully"
        echo "4. Validate no regressions with test-filter"
        ;;

    feature)
        echo "🚀 Handling new feature workflow..."
        # Create feature branch if in git repo
        if git rev-parse --git-dir > /dev/null 2>&1; then
            BRANCH_NAME="feature-$(date +%Y%m%d-%H%M%S)"
            git checkout -b $BRANCH_NAME
            echo "📝 Created feature branch: $BRANCH_NAME"
        fi

        # Create backups
        cp script.js script.js.backup
        cp orgchart-script.js orgchart-script.js.backup

        echo "1. Feature branch ready (if git available)"
        echo "2. Backups created"
        echo "3. Plan feature implementation"
        echo "4. Test with existing functionality"
        ;;

    bug)
        echo "🐛 Handling bug fix workflow..."
        # Create backup
        cp script.js script.js.backup

        echo "1. Files backed up"
        echo "2. Identify bug reproduction steps"
        echo "3. Fix bug while preserving stable functionality"
        echo "4. Test fix with test-filter command"
        ;;

    test)
        echo "🧪 Handling test addition workflow..."
        echo "1. Setting up test environment"
        echo "2. Create test files if needed"
        echo "3. Add tests for new functionality"
        echo "4. Ensure tests pass with existing code"

        # Create basic test structure if it doesn't exist
        if [ ! -d "tests" ]; then
            mkdir tests
            echo "📁 Created tests directory"
        fi
        ;;

    *)
        echo "❌ Unknown issue type: $ISSUE_TYPE"
        echo "Run 'fix-issue' without arguments to see available types"
        exit 1
        ;;
esac

echo ""
echo "✅ $ISSUE_TYPE workflow initiated"
echo "💡 Remember:"
echo "   - All major issues (1-5) are already resolved"
echo "   - Maintain stability while implementing changes"
echo "   - Test thoroughly with existing functionality"
echo "   - Use validate-all and test-filter commands"
echo ""
echo "📋 Next steps:"
echo "   1. Implement your changes"
echo "   2. Run: ./claude/commands/test-filter.sh"
echo "   3. Run: ./claude/commands/validate-all.sh"
echo "   4. Commit when ready"