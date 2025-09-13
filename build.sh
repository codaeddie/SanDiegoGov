#!/bin/bash
# Build script for San Diego Government Chart
# Converts development files (src/) to production files (root)

echo "🏗️  Building San Diego Government Chart for production..."
echo ""

# JavaScript files - fix the data paths
echo "📝 Processing JavaScript files..."
sed 's|../data/|data/|g' src/script.js > script.js
sed 's|../data/|data/|g' src/orgchart-script.js > orgchart-script.js
echo "   ✓ script.js (network view)"
echo "   ✓ orgchart-script.js (org chart view)"

# HTML files - straight copy (they reference local CSS/JS)
echo "📄 Copying HTML files..."
cp src/index.html index.html
cp src/orgchart.html orgchart.html
echo "   ✓ index.html"
echo "   ✓ orgchart.html"

# CSS files - straight copy
echo "🎨 Copying CSS files..."
cp src/styles.css styles.css
cp src/orgchart-styles.css orgchart-styles.css
echo "   ✓ styles.css"
echo "   ✓ orgchart-styles.css"

# Optional: Add timestamp to files for cache busting
echo ""
echo "📅 Build completed at $(date '+%Y-%m-%d %H:%M:%S')"

# Show file sizes for verification
echo ""
echo "📊 Production file sizes:"
ls -lh *.html *.js *.css | grep -v 'src' | awk '{print "   " $9 ": " $5}'

echo ""
echo "✅ Build complete! Production files ready in root directory."
echo ""
echo "Next steps:"
echo "  🔧 Test locally:  python -m http.server 8000"
echo "  🚀 Deploy:        vercel --prod"
echo "  💻 Development:   cd src && python server.py"