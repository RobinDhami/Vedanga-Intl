$ErrorActionPreference = "Stop"

$projectRoot = $PSScriptRoot
Set-Location $projectRoot

if (-not (Test-Path (Join-Path $projectRoot "node_modules"))) {
    throw "Dependencies are missing. Run .\setup.ps1 first."
}

if (-not (Test-Path (Join-Path $projectRoot ".env.local"))) {
    throw "Local environment is missing. Run .\setup.ps1 first."
}

pnpm dev --hostname 0.0.0.0 --port 3000
