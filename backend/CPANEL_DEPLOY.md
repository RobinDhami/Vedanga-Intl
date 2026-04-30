# cPanel Backend Deploy

Recommended layout in your cPanel home directory:

```text
/home/USERNAME/
  vedanga-backend/
    apps/
    config/
    logs/
    media/
    staticfiles/
    tmp/
    .env.production.example
    db.sqlite3
    manage.py
    passenger_wsgi.py
    requirements.txt
```

Recommended Application Manager setup for this project:

- `Deployment Domain`: `vedanga.edu.np`
- `Base Application URL`: `/backend`
- `Application Path`: `vedanga-backend`
- `Environment`: `Production`

Why `/backend` instead of `api.vedanga.edu.np`:

- The frontend admin uses Django session + CSRF cookies from browser JavaScript.
- Keeping backend on the same site origin avoids cross-subdomain cookie issues.

Expected live URLs after deployment:

- API base: `https://vedanga.edu.np/backend/api`
- Django admin: `https://vedanga.edu.np/backend/django-admin/`

Environment variables to add in Application Manager:

- `DJANGO_SECRET_KEY`
- `DJANGO_DEBUG=false`
- `DJANGO_ALLOWED_HOSTS=vedanga.edu.np,www.vedanga.edu.np`
- `DJANGO_FORCE_SCRIPT_NAME=/backend`
- `DJANGO_CORS_ALLOWED_ORIGINS=https://vedanga.edu.np,https://www.vedanga.edu.np`
- `DJANGO_CSRF_TRUSTED_ORIGINS=https://vedanga.edu.np,https://www.vedanga.edu.np`
- `NEXT_PUBLIC_SITE_URL=https://vedanga.edu.np`
- `APP_VENV_PYTHON=/home/USERNAME/virtualenv/vedanga-backend/3.11/bin/python`

After uploading the backend files:

1. Create the app in `Application Manager`.
2. Create or confirm the Python virtual environment for that app.
3. Install dependencies from `requirements.txt`.
4. Run:
   - `python manage.py migrate`
   - `python manage.py collectstatic --noinput`
5. Create a superuser if needed:
   - `python manage.py createsuperuser`
6. Restart Passenger by touching:
   - `tmp/restart.txt`

Frontend rebuild needed after backend is live:

- Set `NEXT_PUBLIC_CMS_API_BASE_URL=https://vedanga.edu.np/backend/api`
- Rebuild the static frontend
- Re-upload the new frontend export to `public_html`
