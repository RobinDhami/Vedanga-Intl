# Vedanga Codex runtime

This project can be prepared on a new Codex workspace with:

```powershell
.\setup.ps1
```

Start the local site with:

```powershell
.\run-dev.ps1
```

The Windows wrappers `setup.cmd` and `run-dev.cmd` do the same thing.

The local frontend reads content from the live CMS API by default. Production
CMS credentials are not included in the repository. If local CMS/server routes
are needed, copy `.env.local.example` to `.env.local` and provide a local or
authorized database connection in that ignored file.
