@echo off
title Sri Venkateswara Company - Website Launcher
echo ========================================================
echo   SRI VENKATESWARA COMPANY (SVC) - OFFICIAL WEBSITE
echo   Precision Cold-Forged Rivets & Fasteners (Est. 1964)
echo ========================================================
echo.
echo Launching website in your default browser...
start "" "%~dp0index.html"
echo.
echo If you prefer running with a local HTTP server:
echo   1. With Node.js installed:  npx serve .
echo   2. With Python installed:   python -m http.server 3000
echo.
echo Website opened successfully!
pause

