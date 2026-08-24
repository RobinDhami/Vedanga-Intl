import os
import sys
from pathlib import Path


APP_ROOT = Path(__file__).resolve().parent
LOG_DIR = APP_ROOT / "logs"
LOG_FILE = LOG_DIR / "passenger-debug.log"
VENV_PYTHON = os.environ.get("APP_VENV_PYTHON", "")


def log_debug(message: str) -> None:
    try:
        LOG_DIR.mkdir(exist_ok=True)
        with LOG_FILE.open("a", encoding="utf-8") as handle:
            handle.write(f"{message}\n")
    except Exception:
        # Avoid breaking Passenger startup if logging fails.
        pass

if VENV_PYTHON and Path(VENV_PYTHON).exists() and sys.executable != VENV_PYTHON:
    log_debug(f"Re-exec to virtualenv python: {VENV_PYTHON}")
    os.execl(VENV_PYTHON, VENV_PYTHON, *sys.argv)

sys.path.insert(0, str(APP_ROOT))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

log_debug(
    "Passenger startup: "
    f"python={sys.executable} "
    f"django_settings={os.environ.get('DJANGO_SETTINGS_MODULE')} "
    f"force_script_name={os.environ.get('DJANGO_FORCE_SCRIPT_NAME')} "
    f"allowed_hosts={os.environ.get('DJANGO_ALLOWED_HOSTS')} "
    f"site_url={os.environ.get('NEXT_PUBLIC_SITE_URL')}"
)

try:
    from django.core.wsgi import get_wsgi_application

    application = get_wsgi_application()
    log_debug("Passenger startup complete: WSGI application created successfully")
except Exception as exc:
    import traceback

    log_debug(f"Passenger startup failed: {exc!r}")
    log_debug(traceback.format_exc())
    raise
