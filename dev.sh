#!/bin/bash
# Development server runner for San Diego Government Chart

echo "🔧 Starting development server..."
echo ""
echo "📂 Working directory: $(pwd)"
echo "🌐 Server URL: http://localhost:8012"
echo ""
echo "📊 Network View: http://localhost:8012"
echo "🌳 Org Chart: http://localhost:8012/orgchart.html"
echo ""
echo "Note: Edit files directly in root directory"
echo "Files are production-ready - no build step needed"
echo ""

python3 server.py
