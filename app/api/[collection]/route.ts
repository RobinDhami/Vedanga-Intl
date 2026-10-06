import type { NextRequest } from "next/server";

import { badRequest, corsPreflight, json, requireStaffSession, unauthenticated, withCors } from "@/lib/server/cms-http";
import { isCmsCollectionKey } from "@/lib/server/cms-route-config";
import {
  createContactSubmission,
  getAdminCollection,
  getPublicClubs,
  getPublicEvents,
  getPublicGalleryImages,
  getPublicHeroSlides,
  getPublicJobOpenings,
  getPublicNotices,
  getPublicTeamMembers,
  getPublicVideos,
} from "@/lib/server/cms-store";

export const dynamic = "force-dynamic";

export async function OPTIONS(request: NextRequest) {
  return corsPreflight(request);
}

export async function GET(request: NextRequest, { params }: { params: { collection: string } }) {
  const { collection } = params;

  if (!isCmsCollectionKey(collection)) {
    return withCors(request, badRequest("Unknown collection."));
  }

  switch (collection) {
    case "hero-slides":
      return withCors(request, json(await getPublicHeroSlides()));
    case "notices":
      return withCors(request, json(await getPublicNotices()));
    case "events":
      return withCors(request, json(await getPublicEvents()));
    case "gallery-images":
      return withCors(request, json(await getPublicGalleryImages()));
    case "videos":
      return withCors(request, json(await getPublicVideos()));
    case "clubs":
      return withCors(request, json(await getPublicClubs()));
    case "job-openings":
      return withCors(request, json(await getPublicJobOpenings()));
    case "team-members": {
      const { searchParams } = new URL(request.url);
      const group = searchParams.get("group");
      const homepage = searchParams.get("homepage") === "true";
      return withCors(
        request,
        json(
        await getPublicTeamMembers({ group: group === "academic" || group === "eca" ? group : undefined, homepage })
        )
      );
    }
    case "contact-submissions": {
      const session = requireStaffSession(request);
      if (!session) {
        return withCors(request, unauthenticated());
      }
      return withCors(request, json(await getAdminCollection("contact-submissions")));
    }
  }
}

export async function POST(request: NextRequest, { params }: { params: { collection: string } }) {
  if (params.collection !== "contact-submissions") {
    return withCors(request, badRequest("This collection does not accept public submissions."));
  }

  const body = (await request.json().catch(() => null)) as
    | { first_name?: string; last_name?: string; email?: string; phone?: string; message?: string }
    | null;

  if (!body?.first_name?.trim() || !body?.last_name?.trim() || !body?.email?.trim() || !body?.phone?.trim()) {
    return withCors(request, badRequest("first_name, last_name, email, and phone are required."));
  }

  return withCors(
    request,
    json(
      await createContactSubmission({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        phone: body.phone,
        message: body.message,
      }),
      { status: 201 }
    )
  );
}
