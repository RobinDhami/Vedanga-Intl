## Node Stack Migration Notes

This project can now run as a single Next.js app with built-in API routes instead of a separate Django backend.

### What changed

- Removed static-export-only mode from `next.config.js`
- Added Node-native API routes under `app/api`
- Replaced the file-backed CMS with a Prisma-backed MySQL store that seeds itself from the existing frontend seed data
- Added cookie-based admin auth for the custom `/admin` dashboard
- Added a cPanel-friendly `app.js` startup file for Passenger/Node hosting

### Hosting requirements

- Node.js hosting that supports running a Next.js server
- A MySQL database that the app can reach from the hosting account
- Environment variables for:
  - `NEXT_PUBLIC_SITE_URL`
  - `NEXT_PUBLIC_CMS_API_BASE_URL`
  - `CMS_ADMIN_USERNAME`
  - `CMS_ADMIN_PASSWORD`
  - `CMS_SESSION_SECRET`
  - `DATABASE_URL`
  - `CMS_UPLOAD_DIR` (a persistent writable directory outside the deployed app)
  - `CMS_UPLOAD_PUBLIC_URL` (for example `https://cms.vedanga.edu.np/uploads`)

### Important note

This stack-change path replaces the old Django API with:

- `/api/auth/csrf/`
- `/api/auth/login/`
- `/api/auth/logout/`
- `/api/auth/me/`
- `/api/*` content endpoints
- `/api/admin/*` admin CRUD endpoints

The current implementation now uses Prisma with MySQL. That avoids the Python hosting limitation and avoids relying on writable JSON files in cPanel.

### Next deployment steps

1. Create a MySQL database and user in cPanel, then grant the user full access to that database.
2. Upload the whole project to the Node application directory, not just the old `out/` folder.
3. Register the app in Application Manager with:
   - Domain: your selected site domain
   - Base URL: `/`
   - Application path: the uploaded project folder
4. Set the environment variables from `.env.example`, including a real `DATABASE_URL`.
5. Install dependencies.
6. Run:
   - `npm run prisma:generate`
   - `npm run prisma:push`
   - `npm run build`
7. Create the directory configured by `CMS_UPLOAD_DIR` and make sure the Node application user can write to it.
8. Start the Node app through cPanel/Passenger. cPanel's docs recommend an `app.js` startup file for Node apps.
9. Test:
   - public pages
   - `/admin`
   - contact form
   - `/api/notices/latest`

### Logging

Per cPanel's current docs, Node application logs are typically written in the application's `logs/` directory.
