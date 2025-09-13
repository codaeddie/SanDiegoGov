#!/bin/bash
# Development server runner for San Diego Government Chart

echo "🔧 Starting development server..."
echo ""
echo "📂 Working directory: src/"
echo "🌐 Server URL: http://localhost:8000"
echo ""
echo "Note: Edit files in src/ directory"
echo "When ready to deploy, run: ./build.sh"
echo ""

cd src && python server.py
