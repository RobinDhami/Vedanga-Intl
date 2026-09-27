import type { NextRequest } from "next/server";

import { isImageUploadCollection, readManagedImage } from "@/lib/server/image-storage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(
  _request: NextRequest,
  { params }: { params: { collection: string; filename: string } }
) {
  if (!isImageUploadCollection(params.collection)) {
    return new Response("Not found", { status: 404 });
  }

  const image = await readManagedImage([params.collection, params.filename]);
  if (!image) {
    return new Response("Not found", { status: 404 });
  }

  const extension = params.filename.toLowerCase().split(".").pop();
  const contentType = extension === "png" ? "image/png" : extension === "webp" ? "image/webp" : "image/jpeg";

  return new Response(new Uint8Array(image), {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Type": contentType,
      "Content-Disposition": "inline",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
