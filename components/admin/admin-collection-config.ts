export const adminCollectionConfig = {
  "hero-slides": { label: "Hero Slides", phaseLabel: "Phase 1" },
  notices: { label: "Updates", phaseLabel: "Phase 1" },
  events: { label: "Events", phaseLabel: "Phase 1" },
  "gallery-images": { label: "Gallery Images", phaseLabel: "Phase 2" },
  "contact-submissions": { label: "Contact Submissions", phaseLabel: "Phase 2" },
  videos: { label: "Videos", phaseLabel: "Phase 3" },
  "team-members": { label: "Team Members", phaseLabel: "Phase 3" },
  clubs: { label: "Clubs", phaseLabel: "Phase 4" },
  "job-openings": { label: "Job Openings", phaseLabel: "Phase 4" },
} as const;

export type AdminCollectionRoute = keyof typeof adminCollectionConfig;

export function isAdminCollectionRoute(value: string): value is AdminCollectionRoute {
  return value in adminCollectionConfig;
}
