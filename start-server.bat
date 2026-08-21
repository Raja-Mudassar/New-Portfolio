@echo off
REM Start a simple HTTP server for this folder (Windows batch)
REM Usage: double-click or run from the folder.
cd /d "%~dp0"
python -m http.server 8000 2>nul || py -m http.server 8000 2>nul || (
  echo Python not found. Install Python from https://python.org
  pause
)
