#!/bin/bash
# Test script for San Diego Gov Visualization Performance

echo "================================"
echo "San Diego Gov Viz - Performance Test"
echo "================================"
echo ""

# Check if server is running
if ! pgrep -f "python.*server.py" > /dev/null; then
    echo "Starting server..."
    python server.py &
    SERVER_PID=$!
    sleep 2
else
    echo "Server already running"
    SERVER_PID=""
fi

echo "Opening visualization in browser..."
echo "URL: http://localhost:8000"
echo ""

# Open in default browser based on OS
if [[ "$OSTYPE" == "darwin"* ]]; then
    open http://localhost:8000
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open http://localhost:8000
elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "win32" ]]; then
    start http://localhost:8000
fi

echo "Performance Testing Instructions:"
echo "---------------------------------"
echo "1. Open Chrome DevTools (F12)"
echo "2. Go to Performance tab"
echo "3. Click Record (●)"
echo "4. Interact with the visualization for 10-15 seconds:"
echo "   - Drag nodes around"
echo "   - Click on different entities"
echo "   - Use filters"
echo "   - Search for entities"
echo "5. Stop recording"
echo ""
echo "Expected Performance Metrics:"
echo "- FPS: 45-60 during simulation"
echo "- Scripting time: <30% of total"
echo "- No memory leaks (heap should stabilize)"
echo ""
echo "Check Console for any errors or warnings"
echo ""
echo "Press Ctrl+C to stop the server when done"

# Keep script running
if [ -n "$SERVER_PID" ]; then
    wait $SERVER_PID
fi
