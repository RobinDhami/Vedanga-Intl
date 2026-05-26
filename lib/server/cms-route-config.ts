import type { CmsCollectionKey } from "@/lib/server/cms-store";

export const publicCollectionKeys = [
  "hero-slides",
  "notices",
  "news",
  "events",
  "gallery-images",
  "contact-submissions",
  "videos",
  "team-members",
  "clubs",
  "job-openings",
] as const satisfies readonly CmsCollectionKey[];

export function isCmsCollectionKey(value: string): value is CmsCollectionKey {
  return publicCollectionKeys.includes(value as CmsCollectionKey);
}

