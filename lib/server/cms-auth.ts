import crypto from "crypto";

import type { NextRequest } from "next/server";

import type { CmsSessionUser } from "@/types/cms";

export const CMS_SESSION_COOKIE = "cms_session";
export const CMS_CSRF_COOKIE = "csrftoken";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

type SessionPayload = {
  username: string;
  is_staff: true;
  email?: string;
  exp: number;
};

function getSessionSecret() {
  return process.env.CMS_SESSION_SECRET || "development-cms-session-secret-change-me";
}

function getAdminUsername() {
  return process.env.CMS_ADMIN_USERNAME || "admin";
}

function getAdminPassword() {
  return process.env.CMS_ADMIN_PASSWORD || "admin12345";
}

function toBase64Url(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function fromBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signValue(value: string) {
  return crypto.createHmac("sha256", getSessionSecret()).update(value).digest("base64url");
}

export function buildSignedSession(user: { username: string; email?: string }) {
  const payload: SessionPayload = {
    username: user.username,
    email: user.email,
    is_staff: true,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS,
  };

  const encoded = toBase64Url(JSON.stringify(payload));
  const signature = signValue(encoded);
  return `${encoded}.${signature}`;
}

export function parseSignedSession(token: string | undefined): CmsSessionUser {
  if (!token) {
    return { authenticated: false, is_staff: false };
  }

  const [encoded, signature] = token.split(".");
  if (!encoded || !signature || signValue(encoded) !== signature) {
    return { authenticated: false, is_staff: false };
  }

  try {
    const payload = JSON.parse(fromBase64Url(encoded)) as SessionPayload;
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return { authenticated: false, is_staff: false };
    }

    return {
      authenticated: true,
      is_staff: payload.is_staff,
      username: payload.username,
      email: payload.email,
    };
  } catch {
    return { authenticated: false, is_staff: false };
  }
}

export function getSessionUserFromRequest(request: NextRequest): CmsSessionUser {
  return parseSignedSession(request.cookies.get(CMS_SESSION_COOKIE)?.value);
}

export function validateAdminCredentials(username: string, password: string) {
  return username === getAdminUsername() && password === getAdminPassword();
}

export function createCsrfToken() {
  return crypto.randomBytes(24).toString("hex");
}

export function verifyCsrf(request: NextRequest) {
  const cookieToken = request.cookies.get(CMS_CSRF_COOKIE)?.value;
  const headerToken = request.headers.get("x-csrftoken");
  return Boolean(cookieToken && headerToken && cookieToken === headerToken);
}
