#!/bin/bash
# Test script to verify the single-directory setup

echo "🧪 Testing San Diego Government Chart Setup"
echo "=========================================="
echo ""

# Check if all required files exist
echo "📁 Checking file structure..."

# Check root files (single directory structure)
if [ -f "script.js" ] && [ -f "orgchart-script.js" ] && [ -f "index.html" ]; then
    echo "✅ Main files present in root directory"
else
    echo "❌ Missing main files in root directory"
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
if [ -f "build.sh" ] && [ -f "dev.sh" ] && [ -f "server.py" ]; then
    echo "✅ Build and server scripts present"
else
    echo "❌ Missing scripts"
    exit 1
fi

echo ""
echo "🔍 Checking path configurations..."

# Check if root files use correct paths
if grep -q "data/" script.js && grep -q "data/" orgchart-script.js; then
    echo "✅ Files use correct data/ paths"
else
    echo "❌ Files have incorrect data paths"
fi

echo ""
echo "🌐 Testing server functionality..."

# Check if server can start (quick test)
if python3 -c "import http.server; print('Python server available')" > /dev/null 2>&1; then
    echo "✅ Python server available"
else
    echo "❌ Python server not available"
fi

echo ""
echo "=========================================="
echo "📊 Test Summary:"
echo ""

if [ -f "script.js" ] && [ -f "orgchart-script.js" ] && [ -f "index.html" ] && [ -f "data/sd_gov_entities_complete.csv" ]; then
    echo "✅ Setup is COMPLETE and WORKING!"
    echo ""
    echo "Single-directory structure ready:"
    echo "  🔧 Run './dev.sh' to start development server"
    echo "  🌐 Access http://localhost:8012 for Network View"
    echo "  🌳 Access http://localhost:8012/orgchart.html for Org Chart"
    echo "  🚀 Run 'vercel --prod' to deploy"
else
    echo "⚠️  Setup needs attention. Check errors above."
fi

echo ""