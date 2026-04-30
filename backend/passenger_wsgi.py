import os
import sys
from pathlib import Path


APP_ROOT = Path(__file__).resolve().parent
VENV_PYTHON = os.environ.get("APP_VENV_PYTHON", "")

if VENV_PYTHON and Path(VENV_PYTHON).exists() and sys.executable != VENV_PYTHON:
    os.execl(VENV_PYTHON, VENV_PYTHON, *sys.argv)

sys.path.insert(0, str(APP_ROOT))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

from django.core.wsgi import get_wsgi_application


application = get_wsgi_application()
