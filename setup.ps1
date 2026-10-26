$ErrorActionPreference = "Stop"

$projectRoot = $PSScriptRoot
Set-Location $projectRoot

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    throw "Node.js is required. Install Node.js 18 or newer, then run .\setup.ps1 again."
}

$nodeMajor = [int]((node --version).TrimStart('v').Split('.')[0])
if ($nodeMajor -lt 18) {
    throw "Node.js 18 or newer is required. Detected Node.js $nodeMajor."
}

$packageManager = Get-Command pnpm -ErrorAction SilentlyContinue
if (-not $packageManager) {
    if (Get-Command corepack -ErrorAction SilentlyContinue) {
        corepack pnpm --version | Out-Null
        $packageManager = Get-Command pnpm -ErrorAction SilentlyContinue
    }
}

if (-not $packageManager) {
    throw "pnpm is required. Install pnpm or enable Corepack, then run .\setup.ps1 again."
}

if (-not (Test-Path (Join-Path $projectRoot ".env.local"))) {
    Copy-Item (Join-Path $projectRoot ".env.local.example") (Join-Path $projectRoot ".env.local")
    Write-Host "Created .env.local from .env.local.example"
}

if (-not (Test-Path (Join-Path $projectRoot "uploads"))) {
    New-Item -ItemType Directory -Path (Join-Path $projectRoot "uploads") | Out-Null
}

pnpm install --frozen-lockfile
pnpm prisma:generate
pnpm build

Write-Host ""
Write-Host "Setup complete. Run .\run-dev.ps1 to start the Vedanga project."
Write-Host "The local site will be available at http://localhost:3000"
