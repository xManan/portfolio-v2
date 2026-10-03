#!/usr/bin/env bash
# Pull the latest code, apply database migrations, rebuild and restart.
# Only needed for code changes. Content edits in /admin go live instantly.
set -euo pipefail
cd "$(dirname "$0")/.."

git pull --ff-only
npm ci
npm run migrate
NODE_OPTIONS=--max-old-space-size=2048 npm run build
sudo systemctl restart portfolio
echo "Deployed $(git rev-parse --short HEAD)"
