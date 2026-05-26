import type { NextRequest } from "next/server";

import { validateAdminCredentials } from "@/lib/server/cms-auth";
import { badRequest, forbidden, json, requireCsrf, withSessionCookie } from "@/lib/server/cms-http";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!requireCsrf(request)) {
    return forbidden("CSRF validation failed.");
  }

  const body = (await request.json().catch(() => null)) as { username?: string; password?: string } | null;
  const username = body?.username?.trim() || "";
  const password = body?.password || "";

  if (!validateAdminCredentials(username, password)) {
    return badRequest("Invalid username or password.");
  }

  const response = json({
    authenticated: true,
    is_staff: true,
    username,
    email: undefined,
  });

  return withSessionCookie(response, { username });
}
