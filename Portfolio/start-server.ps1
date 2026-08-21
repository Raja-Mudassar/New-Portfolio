# Start a simple HTTP server for this folder (PowerShell)
# Usage: Right-click -> Run with PowerShell, or open PowerShell here and run: .\start-server.ps1

if (Get-Command python -ErrorAction SilentlyContinue) {
  python -m http.server 8000
} elseif (Get-Command py -ErrorAction SilentlyContinue) {
  py -m http.server 8000
} else {
  Write-Error "Python not found. Install Python (https://python.org) or run a server manually."
}
