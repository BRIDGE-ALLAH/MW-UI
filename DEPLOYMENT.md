# Self-hosted deployment

Moonwitness UI is a standard Next.js application and can run on infrastructure you control. This project does **not** require Vercel. The supported deployment shape in this guide is a Linux host running Node.js behind a reverse proxy such as Nginx or Caddy.

## Production settings

Set the canonical public URL in the application environment:

```dotenv
NEXT_PUBLIC_APP_URL=https://ui.moonwitness.biz.id
```

Create `apps/v4/.env.production` (or inject the variable through your process manager). Do not commit production secrets. The current public documentation experience does not require provider-specific credentials for its basic site shell; configure any optional integrations separately.

Point the DNS A/AAAA records for `ui.moonwitness.biz.id` at your server. Terminate TLS at the reverse proxy and forward requests to the Next.js process on port `4000`.

## Build on the server

Install the Node.js version required by the repository's `.nvmrc`, enable Corepack, and install pnpm. Then run from the repository root:

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm v4:build
```

The `v4:build` script builds the registry artifacts before compiling the Next.js application. Keep generated output and application code on the same source revision.

## Run the production server

Start the app from the repository root:

```bash
pnpm v4:start
```

The app listens on port `4000`. Use a process manager (systemd, PM2, or an equivalent supervisor) to restart it after crashes and host reboots. Restrict the application port to localhost or the private network; expose only the reverse proxy.

Example systemd unit (adjust `User`, `WorkingDirectory`, and pnpm's absolute path for your host):

```ini
[Unit]
Description=Moonwitness UI
After=network.target

[Service]
Type=simple
User=moonwitness
WorkingDirectory=/srv/MW-UI
Environment=NODE_ENV=production
Environment=NEXT_PUBLIC_APP_URL=https://ui.moonwitness.biz.id
ExecStart=/usr/bin/pnpm v4:start
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

## Reverse proxy

Example Nginx server block:

```nginx
server {
    listen 80;
    server_name ui.moonwitness.biz.id;

    location / {
        proxy_pass http://127.0.0.1:4000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Configure HTTPS with your host's certificate automation (for example, Certbot) and redirect HTTP to HTTPS after the certificate is active.

## Release checklist

- [ ] DNS resolves to the intended host.
- [ ] TLS certificate is valid and renews automatically.
- [ ] `NEXT_PUBLIC_APP_URL` is exactly `https://ui.moonwitness.biz.id` at build and runtime.
- [ ] Dependencies are installed from the committed lockfile.
- [ ] Registry artifacts are built from the same revision.
- [ ] `pnpm v4:build` completes successfully.
- [ ] The process manager starts the app and restores it after reboot.
- [ ] The reverse proxy forwards the original host and HTTPS protocol.
- [ ] `/api/health` returns HTTP 200 for uptime monitoring.
- [ ] `/robots.txt`, `/sitemap.xml`, and the RSS feed use the production origin.
- [ ] Logs, backups, monitoring, and security updates are configured.

## Operational notes

- Do not expose port `4000` directly to the public internet when a reverse proxy is available.
- Keep environment files and credentials outside version control.
- Rebuild after changing `NEXT_PUBLIC_APP_URL`; Next.js public environment variables are embedded during the build.
- Deploy immutable, reviewed revisions and keep a rollback target.
- This guide documents a self-managed deployment path; it does not claim that DNS, TLS, server provisioning, or deployment has already been performed.
