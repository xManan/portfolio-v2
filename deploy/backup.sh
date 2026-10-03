#!/usr/bin/env bash
# Daily backup of the database and uploaded images. Keeps the last 14 days.
# Add to cron:  0 3 * * * /srv/portfolio/deploy/backup.sh
set -euo pipefail
cd "$(dirname "$0")/.."

mkdir -p backups
stamp=$(date +%F)
# .backup takes a consistent snapshot even while the site is running.
sqlite3 data/site.db ".backup 'backups/site-$stamp.db'"
tar -czf "backups/media-$stamp.tar.gz" media 2>/dev/null || true
find backups -type f -mtime +14 -delete
