#!/bin/bash
# Test script to verify the setup

echo "🧪 Testing San Diego Government Chart Setup"
echo "=========================================="
echo ""

# Check if all required files exist
echo "📁 Checking file structure..."

# Check src files
if [ -f "src/script.js" ] && [ -f "src/orgchart-script.js" ] && [ -f "src/index.html" ]; then
    echo "✅ Source files present in src/"
else
    echo "❌ Missing source files in src/"
    exit 1
fi

# Check data files
if [ -f "data/sd_gov_entities_complete.csv" ] && [ -f "data/sd_gov_relationships_complete.csv" ]; then
    echo "✅ Data files present"
else
    echo "❌ Missing data files"
    exit 1
fi

# Check scripts
if [ -f "build.sh" ] && [ -f "dev.sh" ]; then
    echo "✅ Build scripts present"
else
    echo "❌ Missing build scripts"
    exit 1
fi

echo ""
echo "🔍 Checking path configurations..."

# Check if src files use correct dev paths
if grep -q "../data/" src/script.js && grep -q "../data/" src/orgchart-script.js; then
    echo "✅ Source files use correct ../data/ paths"
else
    echo "❌ Source files have incorrect paths"
    echo "   Run: sed -i 's|data/|../data/|g' src/*.js"
fi

echo ""
echo "🏗️  Running build test..."

# Try to run build
if bash build.sh > /dev/null 2>&1; then
    echo "✅ Build script executed successfully"
    
    # Check if production files were created
    if [ -f "script.js" ] && [ -f "orgchart-script.js" ]; then
        echo "✅ Production files generated"
        
        # Check if production files use correct paths
        if grep -q "data/" script.js && ! grep -q "../data/" script.js; then
            echo "✅ Production files use correct data/ paths"
        else
            echo "❌ Production files have incorrect paths"
        fi
    else
        echo "❌ Production files not generated"
    fi
else
    echo "❌ Build script failed"
fi

echo ""
echo "=========================================="
echo "📊 Test Summary:"
echo ""

if [ -f "script.js" ] && [ -f "orgchart-script.js" ] && [ -f "index.html" ]; then
    echo "✅ Setup is COMPLETE and WORKING!"
    echo ""
    echo "You can now:"
    echo "  1. Run './dev.sh' for development"
    echo "  2. Run 'python -m http.server 8000' to test production"
    echo "  3. Run 'vercel --prod' to deploy"
else
    echo "⚠️  Setup needs attention. Check errors above."
fi

echo ""
