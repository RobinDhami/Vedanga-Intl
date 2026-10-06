import "server-only";

import type { Prisma } from "@prisma/client";

import { heroSlidesSeed } from "@/lib/cms-seed";
import { deleteManagedImage } from "@/lib/server/image-storage";
import { prisma } from "@/lib/server/prisma";
import type {
  AdminSavePayload,
  ClubItem,
  ContactSubmissionItem,
  EventItem,
  GalleryImageItem,
  HeroSlide,
  JobOpeningItem,
  Notice,
  TeamMemberItem,
  VideoItem,
} from "@/types/cms";

export type CmsCollectionKey =
  | "hero-slides"
  | "notices"
  | "events"
  | "gallery-images"
  | "contact-submissions"
  | "videos"
  | "team-members"
  | "clubs"
  | "job-openings";

// Seed only once per server process. Re-running nine count queries before every
// request makes the CMS feel slow and can overload a small cPanel database.
let seedPromise: Promise<void> | null = null;
let seeded = false;

async function cleanupReplacedImage(previousUrl: string, nextUrl: string) {
  if (previousUrl && previousUrl !== nextUrl) {
    await deleteManagedImage(previousUrl);
  }
}

function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "item"
  );
}

function coerceStringArray(value: Prisma.JsonValue | null | undefined): string[] {
  return Array.isArray(value) ? value.map((item) => String(item)) : [];
}

function coerceSchedule(value: Prisma.JsonValue | null | undefined): EventItem["schedule"] {
  return Array.isArray(value)
    ? value.map((item) => {
        const entry = item as Record<string, unknown>;
        return {
          day: String(entry.day ?? ""),
          date: String(entry.date ?? ""),
          events: Array.isArray(entry.events) ? entry.events.map((event) => String(event)) : [],
        };
      })
    : [];
}

function withPublishedDate<T extends { is_published?: boolean; published_at?: string }>(item: T): T {
  if (item.is_published && !item.published_at) {
    return { ...item, published_at: new Date().toISOString() };
  }

  if (!item.is_published) {
    return { ...item, published_at: undefined };
  }

  return item;
}

async function buildUniqueSlugFor(model: "events" | "clubs", source: string, excludeId?: number) {
  const baseSlug = slugify(source);
  let candidate = baseSlug;
  let index = 2;

  while (true) {
    let existing:
      | { id: number; slug: string }
      | null = null;

    switch (model) {
      case "events":
        existing = await prisma.event.findUnique({ where: { slug: candidate }, select: { id: true, slug: true } });
        break;
      case "clubs":
        existing = await prisma.club.findUnique({ where: { slug: candidate }, select: { id: true, slug: true } });
        break;
    }

    if (!existing || (excludeId !== undefined && existing.id === excludeId)) {
      return candidate;
    }

    candidate = `${baseSlug}-${index}`;
    index += 1;
  }
}

function mapHeroSlide(item: Awaited<ReturnType<typeof prisma.heroSlide.findFirstOrThrow>>): HeroSlide {
  return {
    id: item.id,
    title: item.title,
    subtitle: item.subtitle,
    cta_text: item.ctaText,
    cta_link: item.ctaLink,
    sort_order: item.sortOrder,
    is_published: item.isPublished,
    image_url: item.imageUrl,
  };
}

function mapNotice(item: Awaited<ReturnType<typeof prisma.notice.findFirstOrThrow>>): Notice {
  return {
    id: item.id,
    title: item.title,
    excerpt: item.excerpt,
    link: item.link,
    published_at: item.publishedAt ?? undefined,
    is_published: item.isPublished,
    image_url: item.imageUrl,
    show_in_overlay: item.showInOverlay,
  };
}

function mapEvent(item: Awaited<ReturnType<typeof prisma.event.findFirstOrThrow>>): EventItem {
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    description: item.description,
    category: item.category,
    venue: item.venue,
    date: item.date,
    time: item.time,
    schedule: coerceSchedule(item.schedule),
    published_at: item.publishedAt ?? undefined,
    is_published: item.isPublished,
    image_url: item.imageUrl,
  };
}

function mapGalleryImage(item: Awaited<ReturnType<typeof prisma.galleryImage.findFirstOrThrow>>): GalleryImageItem {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    category: item.category,
    taken_on: item.takenOn ?? undefined,
    sort_order: item.sortOrder,
    is_published: item.isPublished,
    image_url: item.imageUrl,
  };
}

function mapVideo(item: Awaited<ReturnType<typeof prisma.video.findFirstOrThrow>>): VideoItem {
  return {
    id: item.id,
    title: item.title,
    subtitle: item.subtitle,
    url: item.url,
    sort_order: item.sortOrder,
    is_published: item.isPublished,
  };
}

function mapTeamMember(item: Awaited<ReturnType<typeof prisma.teamMember.findFirstOrThrow>>): TeamMemberItem {
  return {
    id: item.id,
    name: item.name,
    position: item.position,
    image_url: item.imageUrl,
    qualifications: item.qualifications,
    subject: item.subject,
    email: item.email,
    phone: item.phone,
    team_group: item.teamGroup as "academic" | "eca",
    show_on_homepage: item.showOnHomepage,
    sort_order: item.sortOrder,
    is_published: item.isPublished,
  };
}

function mapClub(item: Awaited<ReturnType<typeof prisma.club.findFirstOrThrow>>): ClubItem {
  return {
    id: item.id,
    name: item.name,
    slug: item.slug,
    description: item.description,
    icon_name: item.iconName as ClubItem["icon_name"],
    members: item.members,
    meeting_day: item.meetingDay,
    activities: coerceStringArray(item.activities),
    advisor: item.advisor,
    image_url: item.imageUrl,
    sort_order: item.sortOrder,
    is_published: item.isPublished,
  };
}

function mapJobOpening(item: Awaited<ReturnType<typeof prisma.jobOpening.findFirstOrThrow>>): JobOpeningItem {
  return {
    id: item.id,
    title: item.title,
    department: item.department,
    employment_type: item.employmentType,
    experience: item.experience,
    education: item.education,
    description: item.description,
    image_url: item.imageUrl,
    sort_order: item.sortOrder,
    is_published: item.isPublished,
  };
}

function mapContactSubmission(
  item: Awaited<ReturnType<typeof prisma.contactSubmission.findFirstOrThrow>>
): ContactSubmissionItem {
  return {
    id: item.id,
    first_name: item.firstName,
    last_name: item.lastName,
    email: item.email,
    phone: item.phone,
    message: item.message,
    status: item.status,
    notes: item.notes,
    created_at: item.createdAt.toISOString(),
  };
}

async function seedIfNeeded() {
  // Vercel serverless functions can close a long transaction while the
  // first request seeds all CMS collections. Use the shared Prisma client
  // directly so each collection write can complete independently.
  const tx = prisma;
    const heroCount = await tx.heroSlide.count();

    if (heroCount === 0) {
      await tx.heroSlide.createMany({
          data: heroSlidesSeed.map((item, index) => ({
          title: item.title,
          subtitle: item.subtitle,
          imageUrl: item.image_url,
          ctaText: item.cta_text || "",
          ctaLink: item.cta_link || "",
          sortOrder: item.sort_order ?? index,
          isPublished: Boolean(item.is_published),
        })),
      });
    }

}

async function ensureSeeded() {
  if (seeded) return;

  if (!seedPromise) {
    seedPromise = seedIfNeeded()
      .then(() => {
        seeded = true;
      })
      .finally(() => {
        seedPromise = null;
      });
  }

  return seedPromise;
}

export async function getPublicHeroSlides() {
  await ensureSeeded();
  return (await prisma.heroSlide.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  })).map(mapHeroSlide);
}

export async function getPublicNotices() {
  await ensureSeeded();
  return (await prisma.notice.findMany({
    where: { isPublished: true },
    orderBy: { updatedAt: "desc" },
  })).map(mapNotice);
}

export async function getLatestNotice() {
  await ensureSeeded();
  const overlayNotice = await prisma.notice.findFirst({
    where: { isPublished: true, showInOverlay: true },
    orderBy: { updatedAt: "desc" },
  });

  return overlayNotice ? mapNotice(overlayNotice) : null;
}

export async function getPublicEvents() {
  await ensureSeeded();
  return (await prisma.event.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  })).map(mapEvent);
}

export async function getPublicGalleryImages() {
  await ensureSeeded();
  return (await prisma.galleryImage.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  })).map(mapGalleryImage);
}

export async function getPublicClubs() {
  await ensureSeeded();
  return (await prisma.club.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  })).map(mapClub);
}

export async function getPublicVideos() {
  await ensureSeeded();
  return (await prisma.video.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  })).map(mapVideo);
}

export async function getPublicTeamMembers(options?: { group?: "academic" | "eca"; homepage?: boolean }) {
  await ensureSeeded();
  return (await prisma.teamMember.findMany({
    where: {
      isPublished: true,
      ...(options?.group ? { teamGroup: options.group } : {}),
      ...(options?.homepage ? { showOnHomepage: true } : {}),
    },
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  })).map(mapTeamMember);
}

export async function getPublicJobOpenings() {
  await ensureSeeded();
  return (await prisma.jobOpening.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  })).map(mapJobOpening);
}

export async function getAdminCollection(key: CmsCollectionKey) {
  await ensureSeeded();

  switch (key) {
    case "hero-slides":
      return (await prisma.heroSlide.findMany({ orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }] })).map(mapHeroSlide);
    case "notices":
      return (await prisma.notice.findMany({ orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }] })).map(mapNotice);
    case "events":
      return (await prisma.event.findMany({ orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }] })).map(mapEvent);
    case "gallery-images":
      return (await prisma.galleryImage.findMany({ orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }] })).map(mapGalleryImage);
    case "contact-submissions":
      return (await prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } })).map(mapContactSubmission);
    case "videos":
      return (await prisma.video.findMany({ orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }] })).map(mapVideo);
    case "team-members":
      return (await prisma.teamMember.findMany({ orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }] })).map(mapTeamMember);
    case "clubs":
      return (await prisma.club.findMany({ orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }] })).map(mapClub);
    case "job-openings":
      return (await prisma.jobOpening.findMany({ orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }] })).map(mapJobOpening);
  }
}

export async function createContactSubmission(
  payload: Required<Pick<ContactSubmissionItem, "first_name" | "last_name" | "email" | "phone">> &
    Pick<ContactSubmissionItem, "message">
) {
  const item = await prisma.contactSubmission.create({
    data: {
      firstName: payload.first_name.trim(),
      lastName: payload.last_name.trim(),
      email: payload.email.trim(),
      phone: payload.phone.trim(),
      message: payload.message?.trim() || "",
      status: "new",
      notes: "",
    },
  });

  return mapContactSubmission(item);
}

export async function createAdminItem(key: CmsCollectionKey, payload: AdminSavePayload) {
  await ensureSeeded();

  switch (key) {
    case "hero-slides": {
      const sortOrder = await prisma.heroSlide.count();
      const item = await prisma.heroSlide.create({
        data: {
          title: payload.title?.trim() || "",
          subtitle: payload.subtitle?.trim() || "",
          ctaText: payload.cta_text?.trim() || "",
          ctaLink: payload.cta_link?.trim() || "",
          imageUrl: payload.image_url?.trim() || "",
          sortOrder,
          isPublished: Boolean(payload.is_published),
        },
      });
      return mapHeroSlide(item);
    }
    case "notices": {
      const sortOrder = await prisma.notice.count();
      const item = await prisma.notice.create({
        data: {
          title: payload.title?.trim() || "",
          excerpt: payload.excerpt?.trim() || "",
          link: payload.link?.trim() || "",
          imageUrl: payload.image_url?.trim() || "",
          showInOverlay: Boolean(payload.show_in_overlay),
          sortOrder,
          isPublished: Boolean(payload.is_published),
          publishedAt: Boolean(payload.is_published) ? new Date().toISOString() : null,
        },
      });
      return mapNotice(item);
    }
    case "events": {
      const sortOrder = await prisma.event.count();
      const slug = await buildUniqueSlugFor("events", payload.title?.trim() || "item");
      const item = await prisma.event.create({
        data: {
          title: payload.title?.trim() || "",
          slug,
          description: payload.description?.trim() || "",
          category: payload.category?.trim() || "",
          venue: payload.venue?.trim() || "",
          date: payload.date?.trim() || "",
          time: "",
          schedule: [],
          imageUrl: payload.image_url?.trim() || "",
          sortOrder,
          isPublished: Boolean(payload.is_published),
          publishedAt: Boolean(payload.is_published) ? new Date().toISOString() : null,
        },
      });
      return mapEvent(item);
    }
    case "gallery-images": {
      const sortOrder = await prisma.galleryImage.count();
      const item = await prisma.galleryImage.create({
        data: {
          title: payload.title?.trim() || "Gallery image",
          description: payload.description?.trim() || "",
          category: payload.category?.trim() || "",
          takenOn: null,
          imageUrl: payload.image_url?.trim() || "",
          sortOrder,
          isPublished: Boolean(payload.is_published),
        },
      });
      return mapGalleryImage(item);
    }
    case "videos": {
      const sortOrder = await prisma.video.count();
      const item = await prisma.video.create({
        data: {
          title: payload.title?.trim() || "",
          subtitle: payload.subtitle?.trim() || "",
          url: payload.url?.trim() || "",
          sortOrder,
          isPublished: Boolean(payload.is_published),
        },
      });
      return mapVideo(item);
    }
    case "team-members": {
      const sortOrder = typeof payload.sort_order === "number" ? payload.sort_order : await prisma.teamMember.count();
      const item = await prisma.teamMember.create({
        data: {
          name: payload.name?.trim() || "",
          position: payload.position?.trim() || "",
          imageUrl: payload.image_url?.trim() || "",
          qualifications: payload.qualifications?.trim() || "",
          subject: payload.subject?.trim() || "",
          email: payload.email?.trim() || "",
          phone: payload.phone?.trim() || "",
          teamGroup: payload.team_group || "academic",
          showOnHomepage: Boolean(payload.show_on_homepage),
          sortOrder,
          isPublished: Boolean(payload.is_published),
        },
      });
      return mapTeamMember(item);
    }
    case "clubs": {
      const sortOrder = await prisma.club.count();
      const slug = await buildUniqueSlugFor("clubs", payload.name?.trim() || "club");
      const item = await prisma.club.create({
        data: {
          name: payload.name?.trim() || "",
          slug,
          description: payload.description?.trim() || "",
          iconName: payload.icon_name || "code",
          members: payload.members || 0,
          meetingDay: payload.meeting_day?.trim() || "",
          activities: payload.activities || [],
          advisor: payload.advisor?.trim() || "",
          imageUrl: payload.image_url?.trim() || "",
          sortOrder,
          isPublished: Boolean(payload.is_published),
        },
      });
      return mapClub(item);
    }
    case "job-openings": {
      const sortOrder = await prisma.jobOpening.count();
      const item = await prisma.jobOpening.create({
        data: {
          title: payload.title?.trim() || "",
          department: payload.department?.trim() || "",
          employmentType: payload.employment_type?.trim() || "",
          experience: payload.experience?.trim() || "",
          education: payload.education?.trim() || "",
          description: payload.description?.trim() || "",
          imageUrl: payload.image_url?.trim() || "",
          sortOrder,
          isPublished: Boolean(payload.is_published),
        },
      });
      return mapJobOpening(item);
    }
    case "contact-submissions":
      return createContactSubmission({
        first_name: payload.first_name?.trim() || "",
        last_name: payload.last_name?.trim() || "",
        email: payload.email?.trim() || "",
        phone: payload.phone?.trim() || "",
        message: payload.message?.trim() || "",
      });
  }
}

export async function updateAdminItem(key: CmsCollectionKey, identifier: string, payload: AdminSavePayload) {
  await ensureSeeded();

  switch (key) {
    case "hero-slides": {
      const current = await prisma.heroSlide.findUnique({ where: { id: Number(identifier) } });
      if (!current) return null;
      const item = await prisma.heroSlide.update({
        where: { id: current.id },
        data: {
          title: payload.title?.trim() || "",
          subtitle: payload.subtitle?.trim() || "",
          ctaText: payload.cta_text?.trim() || "",
          ctaLink: payload.cta_link?.trim() || "",
          imageUrl: payload.image_url?.trim() || "",
          isPublished: Boolean(payload.is_published),
        },
      });
      await cleanupReplacedImage(current.imageUrl, item.imageUrl);
      return mapHeroSlide(item);
    }
    case "notices": {
      const current = await prisma.notice.findUnique({ where: { id: Number(identifier) } });
      if (!current) return null;
      const nextItem = withPublishedDate({
        title: payload.title?.trim() || "",
        excerpt: payload.excerpt?.trim() || "",
        link: payload.link?.trim() || "",
        image_url: payload.image_url?.trim() || "",
        show_in_overlay: Boolean(payload.show_in_overlay),
        is_published: Boolean(payload.is_published),
        published_at: current.publishedAt ?? undefined,
      });
      const item = await prisma.notice.update({
        where: { id: current.id },
        data: {
          title: nextItem.title,
          excerpt: nextItem.excerpt,
          link: nextItem.link || "",
          imageUrl: nextItem.image_url || "",
          showInOverlay: Boolean(nextItem.show_in_overlay),
          isPublished: Boolean(nextItem.is_published),
          publishedAt: nextItem.published_at || null,
        },
      });
      await cleanupReplacedImage(current.imageUrl, item.imageUrl);
      return mapNotice(item);
    }
    case "events": {
      const current = await prisma.event.findUnique({ where: { slug: identifier } });
      if (!current) return null;
      const slug = await buildUniqueSlugFor("events", payload.title?.trim() || "item", current.id);
      const nextItem = withPublishedDate({
        title: payload.title?.trim() || "",
        description: payload.description?.trim() || "",
        category: payload.category?.trim() || "",
        venue: payload.venue?.trim() || "",
        date: payload.date?.trim() || "",
        image_url: payload.image_url?.trim() || "",
        is_published: Boolean(payload.is_published),
        published_at: current.publishedAt ?? undefined,
      });
      const item = await prisma.event.update({
        where: { id: current.id },
        data: {
          title: nextItem.title,
          slug,
          description: nextItem.description,
          category: nextItem.category,
          venue: nextItem.venue,
          date: nextItem.date,
          imageUrl: nextItem.image_url || "",
          isPublished: Boolean(nextItem.is_published),
          publishedAt: nextItem.published_at || null,
        },
      });
      await cleanupReplacedImage(current.imageUrl, item.imageUrl);
      return mapEvent(item);
    }
    case "gallery-images": {
      const current = await prisma.galleryImage.findUnique({ where: { id: Number(identifier) } });
      if (!current) return null;
      const item = await prisma.galleryImage.update({
        where: { id: current.id },
        data: {
          title: payload.title?.trim() || "",
          description: payload.description?.trim() || "",
          category: payload.category?.trim() || "",
          imageUrl: payload.image_url?.trim() || "",
          isPublished: Boolean(payload.is_published),
        },
      });
      await cleanupReplacedImage(current.imageUrl, item.imageUrl);
      return mapGalleryImage(item);
    }
    case "videos": {
      const item = await prisma.video.update({
        where: { id: Number(identifier) },
        data: {
          title: payload.title?.trim() || "",
          subtitle: payload.subtitle?.trim() || "",
          url: payload.url?.trim() || "",
          isPublished: Boolean(payload.is_published),
        },
      }).catch(() => null);
      return item ? mapVideo(item) : null;
    }
    case "team-members": {
      const current = await prisma.teamMember.findUnique({ where: { id: Number(identifier) } });
      if (!current) return null;
      const item = await prisma.teamMember.update({
        where: { id: current.id },
        data: {
          name: payload.name?.trim() || "",
          position: payload.position?.trim() || "",
          imageUrl: payload.image_url?.trim() || "",
          qualifications: payload.qualifications?.trim() || "",
          subject: payload.subject?.trim() || "",
          email: payload.email?.trim() || "",
          phone: payload.phone?.trim() || "",
          teamGroup: payload.team_group || "academic",
          showOnHomepage: Boolean(payload.show_on_homepage),
          sortOrder: typeof payload.sort_order === "number" ? payload.sort_order : current.sortOrder,
          isPublished: Boolean(payload.is_published),
        },
      });
      await cleanupReplacedImage(current.imageUrl, item.imageUrl);
      return mapTeamMember(item);
    }
    case "clubs": {
      const current = await prisma.club.findUnique({ where: { slug: identifier } });
      if (!current) return null;
      const slug = await buildUniqueSlugFor("clubs", payload.name?.trim() || "club", current.id);
      const item = await prisma.club.update({
        where: { id: current.id },
        data: {
          name: payload.name?.trim() || "",
          slug,
          description: payload.description?.trim() || "",
          iconName: payload.icon_name || "code",
          members: payload.members || 0,
          meetingDay: payload.meeting_day?.trim() || "",
          activities: payload.activities || [],
          advisor: payload.advisor?.trim() || "",
          imageUrl: payload.image_url?.trim() || "",
          isPublished: Boolean(payload.is_published),
        },
      });
      await cleanupReplacedImage(current.imageUrl, item.imageUrl);
      return mapClub(item);
    }
    case "job-openings": {
      const current = await prisma.jobOpening.findUnique({ where: { id: Number(identifier) } });
      if (!current) return null;
      const item = await prisma.jobOpening.update({
        where: { id: current.id },
        data: {
          title: payload.title?.trim() || "",
          department: payload.department?.trim() || "",
          employmentType: payload.employment_type?.trim() || "",
          experience: payload.experience?.trim() || "",
          education: payload.education?.trim() || "",
          description: payload.description?.trim() || "",
          imageUrl: payload.image_url?.trim() || "",
          isPublished: Boolean(payload.is_published),
        },
      });
      await cleanupReplacedImage(current.imageUrl, item.imageUrl);
      return mapJobOpening(item);
    }
    case "contact-submissions":
      return null;
  }
}

export async function deleteAdminItem(key: CmsCollectionKey, identifier: string) {
  await ensureSeeded();

  try {
    switch (key) {
      case "hero-slides":
        await deleteManagedImage((await prisma.heroSlide.delete({ where: { id: Number(identifier) } })).imageUrl);
        return true;
      case "notices":
        await deleteManagedImage((await prisma.notice.delete({ where: { id: Number(identifier) } })).imageUrl);
        return true;
      case "events":
        await deleteManagedImage((await prisma.event.delete({ where: { slug: identifier } })).imageUrl);
        return true;
      case "gallery-images":
        await deleteManagedImage((await prisma.galleryImage.delete({ where: { id: Number(identifier) } })).imageUrl);
        return true;
      case "contact-submissions":
        await prisma.contactSubmission.delete({ where: { id: Number(identifier) } });
        return true;
      case "videos":
        await prisma.video.delete({ where: { id: Number(identifier) } });
        return true;
      case "team-members":
        await deleteManagedImage((await prisma.teamMember.delete({ where: { id: Number(identifier) } })).imageUrl);
        return true;
      case "clubs":
        await deleteManagedImage((await prisma.club.delete({ where: { slug: identifier } })).imageUrl);
        return true;
      case "job-openings":
        await deleteManagedImage((await prisma.jobOpening.delete({ where: { id: Number(identifier) } })).imageUrl);
        return true;
    }
  } catch {
    return false;
  }
}
