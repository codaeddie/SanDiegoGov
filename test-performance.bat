@echo off
REM Test script for San Diego Gov Visualization Performance

echo ================================
echo San Diego Gov Viz - Performance Test
echo ================================
echo.

REM Check if server is running
tasklist /FI "IMAGENAME eq python.exe" 2>NUL | find /I "python.exe" >NUL
if "%ERRORLEVEL%"=="1" (
    echo Starting server...
    start /B python server.py
    timeout /t 2 /nobreak >NUL
) else (
    echo Server may already be running
)

echo Opening visualization in browser...
echo URL: http://localhost:8000
echo.

REM Open in default browser
start http://localhost:8000

echo Performance Testing Instructions:
echo ---------------------------------
echo 1. Open Chrome DevTools (F12)
echo 2. Go to Performance tab
echo 3. Click Record (circle icon)
echo 4. Interact with the visualization for 10-15 seconds:
echo    - Drag nodes around
echo    - Click on different entities
echo    - Use filters
echo    - Search for entities
echo 5. Stop recording
echo.
echo Expected Performance Metrics:
echo - FPS: 45-60 during simulation
echo - Scripting time: Less than 30%% of total
echo - No memory leaks (heap should stabilize)
echo.
echo Check Console for any errors or warnings
echo.
echo Press any key to exit...
pause >NUL
