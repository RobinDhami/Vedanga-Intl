import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { CMS_CSRF_COOKIE, CMS_SESSION_COOKIE, SESSION_MAX_AGE_SECONDS, buildSignedSession, createCsrfToken, getSessionUserFromRequest, verifyCsrf } from "@/lib/server/cms-auth";

function getAllowedOrigins() {
  const configured = process.env.CMS_ALLOWED_ORIGINS?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (configured && configured.length > 0) {
    return configured;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return siteUrl ? [siteUrl] : [];
}

function getRequestOrigin(request: NextRequest) {
  const origin = request.headers.get("origin")?.trim();
  if (!origin) return null;

  return getAllowedOrigins().includes(origin) ? origin : null;
}

export function withCors(request: NextRequest, response: NextResponse, methods = "GET, POST, OPTIONS") {
  const origin = getRequestOrigin(request);
  if (!origin) {
    return response;
  }

  response.headers.set("Access-Control-Allow-Origin", origin);
  response.headers.set("Access-Control-Allow-Methods", methods);
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, X-CSRFToken");
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Vary", "Origin");

  return response;
}

export function corsPreflight(request: NextRequest, methods = "GET, POST, OPTIONS") {
  return withCors(request, new NextResponse(null, { status: 204 }), methods);
}

export function json(data: unknown, init?: ResponseInit) {
  return NextResponse.json(data, init);
}

export function unauthenticated() {
  return json({ detail: "Authentication required." }, { status: 401 });
}

export function forbidden(message = "Staff access is required.") {
  return json({ detail: message }, { status: 403 });
}

export function badRequest(detail: string) {
  return json({ detail }, { status: 400 });
}

export function requireStaffSession(request: NextRequest) {
  const session = getSessionUserFromRequest(request);
  return session.authenticated && session.is_staff ? session : null;
}

export function requireCsrf(request: NextRequest) {
  return verifyCsrf(request);
}

export function withCsrfCookie(response: NextResponse) {
  response.cookies.set(CMS_CSRF_COOKIE, createCsrfToken(), {
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  return response;
}

export function withSessionCookie(response: NextResponse, user: { username: string; email?: string }) {
  response.cookies.set(CMS_SESSION_COOKIE, buildSignedSession(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  return response;
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(CMS_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}
