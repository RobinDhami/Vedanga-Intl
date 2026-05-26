import { json, withCsrfCookie } from "@/lib/server/cms-http";

export const dynamic = "force-dynamic";

export async function GET() {
  return withCsrfCookie(json({ detail: "CSRF cookie set" }));
}
