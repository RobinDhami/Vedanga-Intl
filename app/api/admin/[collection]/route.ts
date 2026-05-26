import type { NextRequest } from "next/server";

import { badRequest, json, requireCsrf, requireStaffSession, unauthenticated, forbidden } from "@/lib/server/cms-http";
import { isCmsCollectionKey } from "@/lib/server/cms-route-config";
import { createAdminItem, getAdminCollection } from "@/lib/server/cms-store";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, { params }: { params: { collection: string } }) {
  const session = requireStaffSession(request);
  if (!session) {
    return unauthenticated();
  }

  if (!isCmsCollectionKey(params.collection)) {
    return badRequest("Unknown collection.");
  }

  return json(await getAdminCollection(params.collection));
}

export async function POST(request: NextRequest, { params }: { params: { collection: string } }) {
  const session = requireStaffSession(request);
  if (!session) {
    return unauthenticated();
  }

  if (!requireCsrf(request)) {
    return forbidden("CSRF validation failed.");
  }

  if (!isCmsCollectionKey(params.collection)) {
    return badRequest("Unknown collection.");
  }

  const body = (await request.json().catch(() => null)) ?? {};
  return json(await createAdminItem(params.collection, body), { status: 201 });
}
