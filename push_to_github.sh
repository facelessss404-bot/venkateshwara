#!/usr/bin/env bash
# Deploy Sri Venkateswara Company Website to GitHub
set -e

echo "====================================================================="
echo "  SRI VENKATESWARA COMPANY (SVC) - PRODUCTION REPOSITORY DEPLOYMENT"
echo "====================================================================="

git init
git remote set-url origin https://github.com/facelessss404-bot/venkateshwara.git 2>/dev/null || git remote add origin https://github.com/facelessss404-bot/venkateshwara.git
git branch -M main
git add .
git commit -m "feat: Add SVC Intelligent Engineering Assistant, RAG Knowledge Base, Smart Search & Comparison Studio"
git push -u origin main

echo ""
echo "====================================================================="
echo "  SUCCESSFULLY PUSHED TO GITHUB!"
echo "  Deploy to Netlify via https://app.netlify.com or https://app.netlify.com/drop"
echo "====================================================================="

