import type { NextRequest } from "next/server";

import { forbidden, json, requireCsrf, clearSessionCookie } from "@/lib/server/cms-http";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!requireCsrf(request)) {
    return forbidden("CSRF validation failed.");
  }

  return clearSessionCookie(json({ authenticated: false }));
}
