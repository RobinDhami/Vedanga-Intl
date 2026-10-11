# GitHub Codespaces development

This repository is configured so the Vedanga International School site can be developed from a fresh GitHub Codespace without depending on a particular laptop.

## What the app uses today

- Next.js `13.5.1` App Router with React `18.2.0` and TypeScript.
- Node.js `22`, matching `.github/workflows/cpanel-package.yml`.
- Prisma `5.22.x` with MySQL. The repository currently has no `prisma/migrations` directory; the established schema workflow is `prisma db push`.
- Next.js API routes under `app/api`, including the public CMS collections, admin CRUD routes, auth routes, and upload routes.
- Signed, HTTP-only CMS session cookies. Admin credentials and the signing secret come from environment variables; no user session database is used.
- Uploaded CMS images are stored on the filesystem configured by `CMS_UPLOAD_DIR`. In Codespaces that defaults to `.local/uploads`, which is intentionally local to the Codespace and is not production media storage.
- Production is packaged by GitHub Actions into `.next/standalone` and `vedanga-cpanel-production.zip`, then started by cPanel/Passenger through `app.js`.

## First-time Codespace setup

1. Create a Codespace from the `main` branch. The dev container uses the Node 22 Bookworm image.
2. Configure a Codespaces secret named `DATABASE_URL` with a **separate development MySQL database**. Do not reuse the cPanel production URL. The database name must contain `dev` or `development`, for example `vedanga_dev`.
3. Rebuild or reload the container if the secret was added after creation.
4. The container runs `npm ci --include=optional` and `npm run prisma:generate` automatically.
5. Apply the existing schema workflow to the development database:

   ```bash
   npm run prisma:dev:push
   ```

6. Port 3000 is forwarded and opened in the browser automatically. The development server listens on `0.0.0.0`, so forwarded Codespaces URLs work.

The dev container also starts the server after the container starts. To run it manually instead:

```bash
npm run dev -- --hostname 0.0.0.0
```

## Development environment values

The Codespace supplies safe development defaults for `NODE_ENV`, `HOST`, `PORT`, `CMS_UPLOAD_DIR`, and `CMS_UPLOAD_PUBLIC_URL`. Configure the remaining values as Codespaces secrets or in an uncommitted `.env.local` file:

| Variable | Development guidance |
| --- | --- |
| `DATABASE_URL` | Required. Use a dedicated MySQL database and user such as `vedanga_dev`; never use production credentials. |
| `CMS_ADMIN_USERNAME` | Synthetic local admin username. |
| `CMS_ADMIN_PASSWORD` | Synthetic local password; do not copy the production password. |
| `CMS_SESSION_SECRET` | Long random development-only secret. |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` for local browser use. |
| `NEXT_PUBLIC_CMS_API_BASE_URL` | Usually `http://localhost:3000/api`. |
| `CMS_SITE_URL` | Usually `http://localhost:3000`. |
| `CMS_ALLOWED_ORIGINS` | `http://localhost:3000`. |
| `CMS_UPLOAD_DIR` | `.local/uploads` in Codespaces; use persistent external storage for production. |
| `CMS_UPLOAD_PUBLIC_URL` | `http://localhost:3000/uploads` in Codespaces. |

Do not commit `.env`, `.env.local`, credentials, production database URLs, or uploaded media. The existing `.gitignore` excludes local environment files and `uploads/`.

## Database safety rules

- `npm run prisma:dev:push` is the safe Codespaces command. It refuses `NODE_ENV=production`, requires `DATABASE_URL`, and requires a database name containing `dev` or `development`.
- `npm run prisma:push` remains available for the existing hosting workflow, but do not run it with production credentials from a Codespace.
- `npm run prisma:migrate` is not the repository's current established workflow because no Prisma migration history is committed. Do not invent or apply migrations as part of environment setup.
- Never run `prisma db push`, `prisma migrate`, or reset commands against the cPanel database. Use a synthetic development database and test content only.
- When changing the Prisma schema, review the generated SQL and back up the development database before applying changes. A future migration adoption should be a separate, planned database project.

## Common commands

```bash
npm ci --include=optional       # Reinstall exactly from package-lock.json
npm run prisma:generate        # Generate Prisma Client
npm run prisma:dev:push        # Apply schema to the guarded dev database
npm run lint                   # Existing Next.js lint command
npm run build                  # Existing production build command
npm run prisma:studio          # Inspect the configured development database
```

To inspect server output:

```bash
tail -f .local/next-dev.log
```

If the browser preview is unavailable, confirm port 3000 is forwarded, then restart the server with `npm run dev -- --hostname 0.0.0.0`. If Prisma reports a connection error, verify the Codespaces secret, the MySQL allowlist, URL-encoding of the password, and that the URL points to the development database.

## Deployment remains separate

Development changes are committed and pushed to GitHub as usual. The existing `cpanel-package.yml` workflow remains the production packaging path; it uses Node 22, installs from `package-lock.json`, builds with a synthetic build-only `DATABASE_URL`, and produces the cPanel archive. Production still requires its own cPanel environment variables, MySQL database, and persistent `CMS_UPLOAD_DIR` as documented in `NODE_STACK_MIGRATION.md`.

The Codespace must never be used as a bridge to the production database or production upload directory.
