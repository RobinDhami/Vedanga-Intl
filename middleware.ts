import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPrefixes = ["/admin", "/api"];

function normalizeHost(value: string | null) {
  return value?.split(":")[0].toLowerCase() ?? "";
}

function isProtectedPath(pathname: string) {
  return protectedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const cmsUrl = process.env.CMS_SITE_URL;
  if (!cmsUrl) {
    return NextResponse.next();
  }

  const cms = new URL(cmsUrl);
  const requestHost = normalizeHost(request.headers.get("host"));
  const cmsHost = normalizeHost(cms.host);

  if (requestHost === cmsHost) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL(`${pathname}${search}`, cms));
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
