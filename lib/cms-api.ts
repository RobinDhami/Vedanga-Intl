import type {
  AdminSavePayload,
  AdminValidationResult,
  CmsSessionUser,
  ClubItem,
  ContactSubmissionItem,
  EventItem,
  GalleryImageItem,
  HeroSlide,
  JobOpeningItem,
  NewsArticle,
  Notice,
  PhaseOneCollections,
  PhaseThreeCollections,
  PhaseFourCollections,
  PhaseTwoCollections,
  TeamMemberItem,
  VideoItem,
} from "@/types/cms";
import { heroSlidesSeed } from "@/lib/cms-seed";

function getApiBaseUrl() {
  const configured = process.env.NEXT_PUBLIC_CMS_API_BASE_URL?.replace(/\/$/, "");
  if (configured) {
    return configured;
  }

  if (typeof window !== "undefined") {
    return "/api";
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (siteUrl) {
    return `${siteUrl}/api`;
  }

  return "http://localhost:3000/api";
}

function getApiUrl(path: string) {
  const [pathname, query] = path.split("?");
  const normalizedPath = pathname === "/" ? "" : pathname.replace(/\/+$/, "");
  return `${getApiBaseUrl()}${normalizedPath}${query ? `?${query}` : ""}`;
}

const REQUEST_TIMEOUT_MS = 8000;

function createTimeoutSignal(timeoutMs = REQUEST_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  return {
    signal: controller.signal,
    clear: () => clearTimeout(timeoutId),
  };
}

function getCookie(name: string) {
  if (typeof document === "undefined") return "";
  const cookies = document.cookie.split(";").map((value) => value.trim());
  const match = cookies.find((cookie) => cookie.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : "";
}

async function fetchJson<T>(path: string): Promise<T> {
  const { signal, clear } = createTimeoutSignal();
  const response = await fetch(getApiUrl(path), {
    cache: "no-store",
    signal,
  }).finally(clear);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

async function fetchAdminJson<T>(path: string): Promise<T> {
  const { signal, clear } = createTimeoutSignal();
  const response = await fetch(getApiUrl(path), {
    credentials: "include",
    cache: "no-store",
    signal,
  }).finally(clear);

  if (!response.ok) {
    throw new Error(`Failed to fetch admin ${path}: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getPhaseOneCollections(): Promise<PhaseOneCollections> {
  try {
    const [heroSlides, notices, news, events] = await Promise.all([
      fetchJson<HeroSlide[]>("/hero-slides/"),
      fetchJson<Notice[]>("/notices/"),
      fetchJson<NewsArticle[]>("/news/"),
      fetchJson<EventItem[]>("/events/"),
    ]);

    return { heroSlides, notices, news, events };
  } catch {
    return { heroSlides: heroSlidesSeed, notices: [], news: [], events: [] };
  }
}

export async function getLatestNoticeOverlay(): Promise<Notice | null> {
  try {
    const notice = await fetchJson<Notice | null>("/notices/latest/");
    if (notice) {
      return notice;
    }
  } catch {
    // Dynamic notices must come from the CMS.
  }

  return null;
}

export async function getAdminPhaseOneCollections(): Promise<PhaseOneCollections> {
  const [heroSlides, notices, news, events] = await Promise.all([
    fetchAdminJson<HeroSlide[]>("/admin/hero-slides/"),
    fetchAdminJson<Notice[]>("/admin/notices/"),
    fetchAdminJson<NewsArticle[]>("/admin/news/"),
    fetchAdminJson<EventItem[]>("/admin/events/"),
  ]);

  return { heroSlides, notices, news, events };
}

export async function getPhaseThreeCollections(): Promise<PhaseThreeCollections> {
  try {
    const [videos, teamMembers] = await Promise.all([fetchJson<VideoItem[]>("/videos/"), getTeamMembers()]);
    return { videos, teamMembers };
  } catch {
    return { videos: [], teamMembers: [] };
  }
}

export async function getAdminPhaseThreeCollections(): Promise<PhaseThreeCollections> {
  const [videos, teamMembers] = await Promise.all([
    fetchAdminJson<VideoItem[]>("/admin/videos/"),
    fetchAdminJson<TeamMemberItem[]>("/admin/team-members/"),
  ]);
  return { videos, teamMembers };
}

export async function getPhaseFourCollections(): Promise<PhaseFourCollections> {
  try {
    const [jobOpenings, clubs] = await Promise.all([
      fetchJson<JobOpeningItem[]>("/job-openings/"),
      fetchJson<ClubItem[]>("/clubs/"),
    ]);
    return { jobOpenings, clubs };
  } catch {
    return { jobOpenings: [], clubs: [] };
  }
}

export async function getAdminPhaseFourCollections(): Promise<PhaseFourCollections> {
  const [jobOpeningsResult, clubsResult] = await Promise.allSettled([
    fetchAdminJson<JobOpeningItem[]>("/admin/job-openings/"),
    fetchAdminJson<ClubItem[]>("/admin/clubs/"),
  ]);

  return {
    jobOpenings: jobOpeningsResult.status === "fulfilled" ? jobOpeningsResult.value : [],
    clubs: clubsResult.status === "fulfilled" ? clubsResult.value : [],
  };
}

export async function getClubs() {
  try {
    return await fetchJson<ClubItem[]>("/clubs/");
  } catch {
    // Dynamic clubs must come from the CMS.
  }

  return [];
}

export async function getTeamMembers(options?: { group?: "academic" | "eca"; homepage?: boolean }) {
  try {
    const params = new URLSearchParams();
    if (options?.group) {
      params.set("group", options.group);
    }
    if (options?.homepage) {
      params.set("homepage", "true");
    }

    const path = params.size ? `/team-members/?${params.toString()}` : "/team-members/";
    return await fetchJson<TeamMemberItem[]>(path);
  } catch {
    // Dynamic team members must come from the CMS.
  }

  return [];
}

export async function getPhaseTwoCollections(): Promise<PhaseTwoCollections> {
  try {
    const galleryImages = await fetchJson<GalleryImageItem[]>("/gallery-images/");

    return {
      galleryImages,
      contactSubmissions: [],
    };
  } catch {
    return { galleryImages: [], contactSubmissions: [] };
  }
}

export async function getAdminPhaseTwoCollections(): Promise<PhaseTwoCollections> {
  const [galleryImages, contactSubmissions] = await Promise.all([
    fetchAdminJson<GalleryImageItem[]>("/admin/gallery-images/"),
    fetchAdminJson<ContactSubmissionItem[]>("/admin/contact-submissions/"),
  ]);

  return {
    galleryImages,
    contactSubmissions,
  };
}

export async function getSessionUser(): Promise<CmsSessionUser> {
  const { signal, clear } = createTimeoutSignal();
  const response = await fetch(getApiUrl("/auth/me/"), {
    credentials: "include",
    cache: "no-store",
    signal,
  })
    .catch(() => null)
    .finally(clear);

  if (!response || !response.ok) {
    return { authenticated: false, is_staff: false };
  }

  return response.json() as Promise<CmsSessionUser>;
}

export async function ensureCsrfCookie() {
  await fetch(getApiUrl("/auth/csrf/"), {
    credentials: "include",
    cache: "no-store",
  });
}

export async function loginToCms(username: string, password: string) {
  await ensureCsrfCookie();

  const response = await fetch(getApiUrl("/auth/login/"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken"),
    },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Login failed." }));
    throw new Error(error.detail || "Login failed.");
  }

  return response.json() as Promise<CmsSessionUser>;
}

export async function logoutFromCms() {
  await ensureCsrfCookie();

  const response = await fetch(getApiUrl("/auth/logout/"), {
    method: "POST",
    headers: {
      "X-CSRFToken": getCookie("csrftoken"),
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Logout failed.");
  }
}

export async function savePhaseOneItem(
  collection: "hero-slides" | "notices" | "news" | "events",
  payload: AdminSavePayload
) {
  return saveAdminItem(collection, payload);
}

export type AdminCollection =
  | "hero-slides"
  | "notices"
  | "news"
  | "events"
  | "gallery-images"
  | "contact-submissions"
  | "videos"
  | "team-members"
  | "clubs"
  | "job-openings";

export async function getAdminCollectionItems<T>(collection: AdminCollection) {
  return fetchAdminJson<T[]>(`/admin/${collection}/`);
}

export type ImageUploadCollection = Exclude<
  AdminCollection,
  "contact-submissions" | "videos"
>;

export async function uploadCmsImage(file: File, collection: ImageUploadCollection) {
  await ensureCsrfCookie();

  const formData = new FormData();
  formData.set("file", file);
  formData.set("collection", collection);

  const response = await fetch(getApiUrl("/admin/uploads/"), {
    method: "POST",
    headers: {
      "X-CSRFToken": getCookie("csrftoken"),
    },
    credentials: "include",
    body: formData,
  });

  const result = (await response.json().catch(() => null)) as
    | { url?: string; detail?: string }
    | null;

  if (!response.ok || !result?.url) {
    throw new Error(result?.detail || "Image upload failed.");
  }

  return result.url;
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    return await fetchJson<HeroSlide[]>("/hero-slides/");
  } catch {
    return heroSlidesSeed;
  }
}

export async function getNotices(): Promise<Notice[]> {
  try {
    return await fetchJson<Notice[]>("/notices/");
  } catch {
    return [];
  }
}

export async function getNewsArticles(): Promise<NewsArticle[]> {
  try {
    return await fetchJson<NewsArticle[]>("/news/");
  } catch {
    return [];
  }
}

export async function getNewsArticle(slug: string): Promise<NewsArticle | null> {
  const articles = await getNewsArticles();
  return articles.find((article) => article.slug === slug) ?? null;
}

export async function getEvents(): Promise<EventItem[]> {
  try {
    return await fetchJson<EventItem[]>("/events/");
  } catch {
    return [];
  }
}

export async function getEvent(slug: string): Promise<EventItem | null> {
  const events = await getEvents();
  return events.find((event) => event.slug === slug) ?? null;
}

function buildAdminItemPath(collection: AdminCollection, identifier?: string | number) {
  if (identifier === undefined || identifier === null) {
    return `/admin/${collection}/`;
  }

  return `/admin/${collection}/${identifier}/`;
}

async function sendAdminMutation(
  method: "POST" | "PATCH" | "DELETE",
  collection: AdminCollection,
  payload?: AdminSavePayload,
  identifier?: string | number
) {
  await ensureCsrfCookie();

  const response = await fetch(getApiUrl(buildAdminItemPath(collection, identifier)), {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken"),
    },
    credentials: "include",
    body: method === "DELETE" ? undefined : JSON.stringify(payload ?? {}),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    if (error && typeof error === "object") {
      const message = Object.entries(error)
        .map(([field, messages]) => {
          const text = Array.isArray(messages) ? messages.join(", ") : String(messages);
          return `${field}: ${text}`;
        })
        .join(" | ");
      throw new Error(message || `Failed to save ${collection}.`);
    }
    throw new Error(`Failed to save ${collection}.`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export async function saveAdminItem(collection: AdminCollection, payload: AdminSavePayload) {
  return sendAdminMutation("POST", collection, payload);
}

export async function updateAdminItem(
  collection: AdminCollection,
  identifier: string | number,
  payload: AdminSavePayload
) {
  return sendAdminMutation("PATCH", collection, payload, identifier);
}

export async function deleteAdminItem(collection: AdminCollection, identifier: string | number) {
  return sendAdminMutation("DELETE", collection, undefined, identifier);
}

export function validatePhaseOnePayload(
  collection: "hero-slides" | "notices" | "news" | "events",
  payload: AdminSavePayload
): AdminValidationResult {
  if (!payload.title?.trim()) {
    return { valid: false, message: "Title is required." };
  }

  if (collection === "hero-slides" && !payload.image_url?.trim()) {
    return { valid: false, message: "Hero image is required." };
  }

  if (collection === "notices" && !payload.excerpt?.trim()) {
    return { valid: false, message: "Notice summary is required." };
  }

  if (collection === "news") {
    if (!payload.category?.trim()) {
      return { valid: false, message: "News category is required." };
    }
    if (!payload.excerpt?.trim()) {
      return { valid: false, message: "News summary is required." };
    }
    if (!payload.author?.trim()) {
      return { valid: false, message: "Author is required." };
    }
    if (!payload.content?.trim()) {
      return { valid: false, message: "Content is required." };
    }
    if (!payload.image_url?.trim()) {
      return { valid: false, message: "News image is required." };
    }
  }

  if (collection === "events") {
    if (!payload.category?.trim()) {
      return { valid: false, message: "Event category is required." };
    }
    if (!payload.description?.trim()) {
      return { valid: false, message: "Event summary is required." };
    }
    if (!payload.venue?.trim()) {
      return { valid: false, message: "Venue is required." };
    }
    if (!payload.date?.trim()) {
      return { valid: false, message: "Event date is required." };
    }
    if (!payload.image_url?.trim()) {
      return { valid: false, message: "Event image is required." };
    }
  }

  return { valid: true };
}

export async function submitContactSubmission(payload: {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message?: string;
}) {
  const response = await fetch(getApiUrl("/contact-submissions/"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    if (error && typeof error === "object") {
      const message = Object.entries(error)
        .map(([field, messages]) => {
          const text = Array.isArray(messages) ? messages.join(", ") : String(messages);
          return `${field}: ${text}`;
        })
        .join(" | ");
      throw new Error(message || "Contact submission failed.");
    }
    throw new Error("Contact submission failed.");
  }

  return response.json();
}
