#!/usr/bin/env bash
# Deploy Sri Venkateswara Company Website to GitHub
set -e

echo "====================================================================="
echo "  SRI VENKATESWARA COMPANY (SVC) - PRODUCTION REPOSITORY DEPLOYMENT"
echo "====================================================================="

git init
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/facelessss404-bot/venkateshwara.git
git branch -M main
git add .
git commit -m "feat: Sri Venkateswara Company (SVC) official website - production release"
git push -u origin main

echo ""
echo "====================================================================="
echo "  SUCCESSFULLY PUSHED TO GITHUB!"
echo "  Deploy to Netlify via https://app.netlify.com or https://app.netlify.com/drop"
echo "====================================================================="

