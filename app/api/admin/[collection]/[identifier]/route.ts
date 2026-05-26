import type { NextRequest } from "next/server";

import { badRequest, forbidden, json, requireCsrf, requireStaffSession, unauthenticated } from "@/lib/server/cms-http";
import { isCmsCollectionKey } from "@/lib/server/cms-route-config";
import { deleteAdminItem, updateAdminItem } from "@/lib/server/cms-store";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { collection: string; identifier: string } }
) {
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
  const item = await updateAdminItem(params.collection, params.identifier, body);

  if (!item) {
    return badRequest("Item not found.");
  }

  return json(item);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { collection: string; identifier: string } }
) {
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

  const deleted = await deleteAdminItem(params.collection, params.identifier);

  if (!deleted) {
    return badRequest("Item not found.");
  }

  return new Response(null, { status: 204 });
}
