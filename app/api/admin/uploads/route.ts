import type { NextRequest } from "next/server";

import { badRequest, forbidden, json, requireCsrf, requireStaffSession, unauthenticated } from "@/lib/server/cms-http";
import {
  buildManagedImageUrl,
  isImageUploadCollection,
  MAX_IMAGE_UPLOAD_BYTES,
  storeUploadedImage,
} from "@/lib/server/image-storage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!requireStaffSession(request)) {
    return unauthenticated();
  }

  if (!requireCsrf(request)) {
    return forbidden("CSRF validation failed.");
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_IMAGE_UPLOAD_BYTES + 1024 * 1024) {
    return badRequest("Images must be no larger than 8 MB.");
  }

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");
  const collection = formData?.get("collection");

  if (!(file instanceof File)) {
    return badRequest("Choose an image to upload.");
  }
  if (typeof collection !== "string" || !isImageUploadCollection(collection)) {
    return badRequest("Unknown image collection.");
  }

  try {
    const stored = await storeUploadedImage(file, collection);
    return json(
      {
        url: buildManagedImageUrl(request.nextUrl.origin, stored.relativePath),
        size: stored.size,
      },
      { status: 201 }
    );
  } catch (error) {
    return badRequest(error instanceof Error ? error.message : "Image processing failed.");
  }
}
