import type { NextRequest } from "next/server";

import { getLatestNotice } from "@/lib/server/cms-store";
import { corsPreflight, json, withCors } from "@/lib/server/cms-http";

export const dynamic = "force-dynamic";

export async function OPTIONS(request: NextRequest) {
  return corsPreflight(request);
}

export async function GET(request: NextRequest) {
  return withCors(request, json(await getLatestNotice()));
}
