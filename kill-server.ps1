# PowerShell script to kill Python server

Write-Host "================================" -ForegroundColor Cyan
Write-Host "Python Server Process Killer" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Method 1: Find and kill by port
Write-Host "Checking for processes on port 8012..." -ForegroundColor Yellow
$connections = Get-NetTCPConnection -LocalPort 8012 -ErrorAction SilentlyContinue

if ($connections) {
    foreach ($conn in $connections) {
        $pid = $conn.OwningProcess
        $process = Get-Process -Id $pid -ErrorAction SilentlyContinue
        
        if ($process) {
            Write-Host "Found process: $($process.Name) (PID: $pid)" -ForegroundColor Green
            
            try {
                Stop-Process -Id $pid -Force
                Write-Host "✓ Successfully killed process $pid" -ForegroundColor Green
            } catch {
                Write-Host "✗ Failed to kill process $pid - may need admin rights" -ForegroundColor Red
                Write-Host "  Try running PowerShell as Administrator" -ForegroundColor Yellow
            }
        }
    }
} else {
    Write-Host "No process found on port 8012" -ForegroundColor Yellow
}

Write-Host ""

# Method 2: List all Python processes
$pythonProcesses = Get-Process python* -ErrorAction SilentlyContinue

if ($pythonProcesses) {
    Write-Host "Python processes running:" -ForegroundColor Yellow
    $pythonProcesses | Format-Table Id, ProcessName, StartTime, CPU -AutoSize
    
    Write-Host ""
    $killAll = Read-Host "Kill all Python processes? (y/n)"
    
    if ($killAll -eq 'y') {
        foreach ($proc in $pythonProcesses) {
            try {
                Stop-Process -Id $proc.Id -Force
                Write-Host "✓ Killed $($proc.ProcessName) (PID: $($proc.Id))" -ForegroundColor Green
            } catch {
                Write-Host "✗ Failed to kill $($proc.ProcessName) (PID: $($proc.Id))" -ForegroundColor Red
            }
        }
    }
} else {
    Write-Host "No Python processes found" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Done! You can now restart the server." -ForegroundColor Green
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
