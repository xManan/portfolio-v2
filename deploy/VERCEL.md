# Hosting on Vercel

Vercel doesn't keep files between requests, so the two things the VPS keeps on
disk live in hosted services instead:

| On the VPS | On Vercel | Free tier |
| --- | --- | --- |
| `data/site.db` (SQLite file) | [Turso](https://turso.tech), hosted SQLite | yes |
| `media/` (uploaded images) | [Vercel Blob](https://vercel.com/docs/vercel-blob) | yes |

The code switches automatically: a `libsql://` database URL uses Turso, and a
`BLOB_READ_WRITE_TOKEN` sends uploads to Blob. Nothing else changes. Editing in
`/admin` still goes live instantly, without a redeploy.

Do the steps in this order: the site is built from the database, so it needs
content before the first deploy.

## 1. Create the database (Turso)

```bash
curl -sSfL https://get.tur.so/install.sh | bash   # install the CLI
turso auth signup                                  # or: turso auth login
turso db create portfolio                          # pick a location near you with --location (see: turso db locations)
turso db show portfolio --url                      # -> libsql://portfolio-<you>.turso.io
turso db tokens create portfolio                   # -> a long token
```

Keep the URL and the token for the next steps.

## 2. Create the image store (Vercel Blob)

In the Vercel dashboard: **Storage → Create → Blob**, name it `portfolio-media`.
Open the store, go to its **.env.local** tab and copy `BLOB_READ_WRITE_TOKEN`.

## 3. Fill the database from your laptop

In the project folder, create a file called `.env.vercel` (git ignores it, so the tokens never get committed):

```bash
PAYLOAD_SECRET=<a long random string: openssl rand -hex 32>
DATABASE_URI=libsql://portfolio-<you>.turso.io
DATABASE_AUTH_TOKEN=<token from step 1>
BLOB_READ_WRITE_TOKEN=<token from step 2>
```

Then create the tables and the starter content in Turso, with the images going
to Blob:

```bash
set -a; source .env.vercel; set +a     # load the variables into this shell
npm run migrate
npm run seed
```

Use the same `PAYLOAD_SECRET` on Vercel in the next step: logins are signed with it.

## 4. Deploy

1. Push the repository to GitHub (with this code on `main`).
2. In Vercel: **Add New → Project**, import the repository. Vercel detects Next.js.
   Leave the build settings alone: it runs the `vercel-build` script, which
   applies any new migrations and then builds.
3. Under **Environment Variables**, add:

   | Name | Value |
   | --- | --- |
   | `PAYLOAD_SECRET` | the same value as in `.env.vercel` |
   | `DATABASE_URI` | `libsql://portfolio-<you>.turso.io` |
   | `DATABASE_AUTH_TOKEN` | the Turso token |
   | `SITE_URL` | `https://<project>.vercel.app` for now |

4. **Deploy.**
5. Connect the Blob store: **Storage → portfolio-media → Connect to project**.
   This adds `BLOB_READ_WRITE_TOKEN` to the project. Then redeploy
   (**Deployments → … → Redeploy**) so the site picks it up.

## 5. Create your login

Open `https://<project>.vercel.app/admin`. The first visit asks you to create
the admin account.

## 6. Use your domain

**Settings → Domains → Add**, enter your domain and add the DNS records Vercel
shows at your registrar. Then set `SITE_URL` to
`https://yourdomain.com` and redeploy.

## Serving it under a path (e.g. `yourdomain.com/cloud-kitchen-os`)

The whole site, dashboard included, can live under a path instead of the root.

1. In Vercel, add the environment variable `BASE_PATH` = `/cloud-kitchen-os` and
   redeploy. The site is then at `https://<project>.vercel.app/cloud-kitchen-os`,
   the dashboard at `/cloud-kitchen-os/admin`, and the bare Vercel URL redirects there.
2. Set `SITE_URL` to `https://yourdomain.com` (the domain only, no path).
3. In Cloudflare, forward that path on your domain to Vercel with a Worker:
   **Workers & Pages → Create → Worker**, paste this, set `VERCEL_HOST`, and **Deploy**:

   ```js
   const VERCEL_HOST = "<project>.vercel.app";

   export default {
     async fetch(request) {
       const url = new URL(request.url);
       url.hostname = VERCEL_HOST;
       return fetch(new Request(url, request), { redirect: "manual" });
     },
   };
   ```

4. Open the Worker's **Settings → Domains & Routes → Add → Route** and add two routes
   (zone: your domain):
   - `yourdomain.com/cloud-kitchen-os*` (the site)
   - `yourdomain.com/_vercel/*` (Vercel Analytics loads its script from the domain root)

   Your domain's DNS record must be **Proxied** (orange cloud) for routes to run.

The rest of `yourdomain.com` is untouched. Changing the path later means
updating `BASE_PATH`, the first route and redeploying.

## Day to day

- **Content:** edit in `/admin`. Saving is live, no deploy.
- **Code:** push to `main` and Vercel deploys. New migrations run during the build.
- **Backups:** `turso db shell portfolio .dump > backup.sql` saves the database;
  images stay in Blob.

## Good to know

- The free Hobby plan is meant for personal, non-commercial sites, which a
  portfolio is.
- `/admin` runs as serverless functions, so the first load after a quiet spell
  can take a second or two. The public pages are cached and stay fast.
