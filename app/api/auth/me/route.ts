import type { NextRequest } from "next/server";

import { json } from "@/lib/server/cms-http";
import { getSessionUserFromRequest } from "@/lib/server/cms-auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  return json(getSessionUserFromRequest(request));
}
