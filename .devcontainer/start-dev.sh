#!/usr/bin/env bash
set -euo pipefail

if [ ! -d node_modules ]; then
  echo "node_modules is missing. Run: npm ci --include=optional"
  exit 1
fi

if [ ! -f node_modules/.prisma/client/index.js ]; then
  npm run prisma:generate
fi

if pgrep -f "next dev" >/dev/null 2>&1; then
  exit 0
fi

mkdir -p .local
nohup npm run dev -- --hostname 0.0.0.0 > .local/next-dev.log 2>&1 &
echo "Next.js development server started on port ${PORT:-3000}. Logs: .local/next-dev.log"
