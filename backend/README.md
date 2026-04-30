# Backend Phase 1

Lean Django backend scaffold for the first dynamic website modules:

- Hero slides
- News
- Events
- Notices

## Setup

1. Create a virtual environment.
2. Install dependencies:
   `pip install -r requirements.txt`
3. Run migrations:
   `python manage.py makemigrations`
   `python manage.py migrate`
4. Create an admin user:
   `python manage.py createsuperuser`
5. Start the server:
   `python manage.py runserver`

## Endpoints

- `/api/hero-slides/`
- `/api/news/`
- `/api/news/latest/`
- `/api/events/`
- `/api/events/latest/`
- `/api/notices/`
- `/api/notices/latest/`

The public Next.js admin screen currently lives at `/admin` and can fall back to seed data until the API is available.
