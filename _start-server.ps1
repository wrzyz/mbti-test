$ErrorActionPreference = "Stop"
$env:HOST = "0.0.0.0"
$env:PORT = "8090"
Set-Location "D:\chatgpt\mbti-test"
$logOut = "D:\chatgpt\mbti-test\server-out.txt"
$logErr = "D:\chatgpt\mbti-test\server-err.txt"
"" | Set-Content -Path $logOut
"" | Set-Content -Path $logErr
$p = Start-Process -FilePath "node" -ArgumentList "server.js" -WorkingDirectory "D:\chatgpt\mbti-test" -RedirectStandardOutput $logOut -RedirectStandardError $logErr -WindowStyle Hidden -PassThru
"STARTED_PID=$($p.Id)" | Out-File -FilePath "D:\chatgpt\mbti-test\server-pid.txt" -Encoding ascii
Start-Sleep -Seconds 1
Get-Content $logOut
Get-Content $logErr
