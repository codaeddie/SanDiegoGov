@echo off
REM Kill Python server process on Windows

echo ================================
echo Killing Python Server Process
echo ================================
echo.

REM Method 1: Kill by port
echo Method 1: Killing process on port 8012...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8012 ^| findstr LISTENING') do (
    echo Found PID: %%a
    taskkill /F /PID %%a 2>NUL
    if not errorlevel 1 (
        echo Successfully killed process %%a
    ) else (
        echo Failed to kill process %%a - may need admin rights
    )
)

REM Method 2: Kill all Python processes (more aggressive)
echo.
echo Method 2: Kill ALL Python processes? (y/n)
set /p confirm=
if /i "%confirm%"=="y" (
    taskkill /F /IM python.exe 2>NUL
    if not errorlevel 1 (
        echo Successfully killed all Python processes
    ) else (
        echo No Python processes found or insufficient permissions
    )
)

echo.
echo Done! You can now restart the server.
pause
