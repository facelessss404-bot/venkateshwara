@echo off
TITLE Deploy Sri Venkateswara Company Website to GitHub
echo =====================================================================
echo   SRI VENKATESWARA COMPANY (SVC) - PRODUCTION REPOSITORY DEPLOYMENT
echo =====================================================================
echo.
echo Step 1: Initializing Git repository...
git init

echo Step 2: Configuring remote origin...
git remote remove origin 2>nul
git remote add origin https://github.com/facelessss404-bot/venkateshwara.git

echo Step 3: Setting default branch to main...
git branch -M main

echo Step 4: Staging all production website files (HTML, CSS, JS, 3D, Config)...
git add .

echo Step 5: Creating production release commit...
git commit -m "feat: Sri Venkateswara Company (SVC) official website - production release"

echo Step 6: Pushing codebase to GitHub (facelessss404-bot/venkateshwara)...
git push -u origin main

echo.
echo =====================================================================
echo   SUCCESSFULLY PUSHED TO GITHUB!
echo =====================================================================
echo.
echo NEXT STEP - HOST ON NETLIFY:
echo 1. Open https://app.netlify.com/
echo 2. Click [Add new site] ^> [Import an existing project]
echo 3. Select [GitHub] and pick: facelessss404-bot/venkateshwara
echo 4. Netlify will automatically detect netlify.toml:
echo      - Build Command: (leave empty - static site)
echo      - Publish Directory: .
echo 5. Click [Deploy site] — Your website will be LIVE globally!
echo.
echo ALTERNATIVE INSTANT DROP (Zero Setup):
echo You can also drag-and-drop this entire folder directly to:
echo https://app.netlify.com/drop
echo =====================================================================
pause

