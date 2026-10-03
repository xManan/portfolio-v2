# Deploying to a VPS (no Docker)

The site is a single Node.js app: the public site, the dashboard (`/admin`) and its
API all run in one process. Content lives in one SQLite file (`data/site.db`) and
uploaded images in `media/`. Caddy sits in front and handles HTTPS.

**Uses:** about 150-250 MB RAM at runtime. Building needs about 1.5 GB, so add swap on a 1 GB VPS.

## 1. One-time server setup (Ubuntu / Debian)

```bash
# Node.js 22, SQLite CLI (for backups), Caddy
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs git sqlite3 debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt-get update && sudo apt-get install -y caddy

# Optional on a 1 GB VPS: 2 GB swap so builds don't run out of memory
sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# A dedicated user that owns the app
sudo useradd --system --create-home --shell /bin/bash portfolio
sudo mkdir -p /srv/portfolio && sudo chown portfolio:portfolio /srv/portfolio
```

## 2. Get the code and configure it

```bash
sudo -iu portfolio
git clone https://github.com/xManan/portfolio-v2.git /srv/portfolio
cd /srv/portfolio
cp .env.example .env
nano .env   # set PAYLOAD_SECRET (openssl rand -hex 32) and NEXT_PUBLIC_SERVER_URL=https://yourdomain.com
```

## 3. Install, create the database, fill it, build

```bash
npm ci
npm run migrate   # creates data/site.db
npm run seed      # fills it with the starter content (safe to re-run)
NODE_OPTIONS=--max-old-space-size=2048 npm run build
exit
```

## 4. Run it as a service

```bash
sudo cp /srv/portfolio/deploy/portfolio.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now portfolio
systemctl status portfolio        # should say "active (running)"
```

Let the `portfolio` user restart the service without a password (used by `deploy.sh`):

```bash
echo 'portfolio ALL=(root) NOPASSWD: /usr/bin/systemctl restart portfolio' | sudo tee /etc/sudoers.d/portfolio
```

## 5. Point your domain at it

1. At your DNS provider, add an **A record** for `yourdomain.com` (and `www`) pointing to the VPS IP.
2. Edit `deploy/Caddyfile`, replacing `example.com` with your domain, then:

```bash
sudo cp /srv/portfolio/deploy/Caddyfile /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

Caddy fetches the HTTPS certificate on its own within a minute.

## 6. Create your login

Open `https://yourdomain.com/admin`. The first visit asks you to create the admin account.

## Day to day

- **Editing content:** log in at `/admin`. Saving is live; no deploy.
- **Shipping code changes:** `sudo -iu portfolio /srv/portfolio/deploy/deploy.sh`
- **Backups:** `crontab -e` as the `portfolio` user and add
  `0 3 * * * /srv/portfolio/deploy/backup.sh` (daily copies of the database and images in `backups/`, kept 14 days).
  Copy that folder off the server now and then.
- **Logs:** `journalctl -u portfolio -f`

## Optional: Cloudflare in front

Put the domain on Cloudflare's free plan with the proxy (orange cloud) on and SSL mode
**Full (strict)**. Static assets are then served from Cloudflare's edge worldwide.
