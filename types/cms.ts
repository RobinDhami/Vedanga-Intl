export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  cta_text?: string;
  cta_link?: string;
  sort_order?: number;
  is_published?: boolean;
  image_url: string;
}

export interface Notice {
  id: number;
  title: string;
  excerpt: string;
  link?: string;
  published_at?: string;
  is_published?: boolean;
  image_url?: string;
  show_in_overlay?: boolean;
}

export interface NewsArticle {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  tags: string[];
  published_at?: string;
  is_published?: boolean;
  image_url: string;
}

export interface EventItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  venue: string;
  date: string;
  time?: string;
  schedule?: Array<{
    day: string;
    date: string;
    events: string[];
  }>;
  published_at?: string;
  is_published?: boolean;
  image_url: string;
}

export interface GalleryImageItem {
  id: number;
  title: string;
  description: string;
  category: string;
  taken_on?: string;
  sort_order?: number;
  is_published?: boolean;
  image_url: string;
}

export interface ClubItem {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon_name: "code" | "camera" | "mic" | "palette" | "music";
  members: number;
  meeting_day?: string;
  activities: string[];
  advisor?: string;
  image_url: string;
  sort_order?: number;
  is_published?: boolean;
}

export interface ContactSubmissionItem {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message?: string;
  status?: string;
  notes?: string;
  created_at?: string;
}

export interface VideoItem {
  id: number;
  title: string;
  subtitle: string;
  url: string;
  sort_order?: number;
  is_published?: boolean;
}

export interface TeamMemberItem {
  id: number;
  name: string;
  position: string;
  image_url?: string;
  qualifications?: string;
  subject?: string;
  email?: string;
  phone?: string;
  team_group?: "academic" | "eca";
  show_on_homepage?: boolean;
  sort_order?: number;
  is_published?: boolean;
}

export interface JobOpeningItem {
  id: number;
  title: string;
  department: string;
  employment_type: string;
  experience: string;
  education: string;
  description: string;
  image_url?: string;
  sort_order?: number;
  is_published?: boolean;
}

export interface PhaseOneCollections {
  heroSlides: HeroSlide[];
  notices: Notice[];
  news: NewsArticle[];
  events: EventItem[];
}

export interface PhaseTwoCollections {
  galleryImages: GalleryImageItem[];
  contactSubmissions: ContactSubmissionItem[];
}

export interface PhaseThreeCollections {
  videos: VideoItem[];
  teamMembers: TeamMemberItem[];
}

export interface PhaseFourCollections {
  jobOpenings: JobOpeningItem[];
  clubs: ClubItem[];
}

export interface AdminSavePayload {
  title?: string;
  subtitle?: string;
  excerpt?: string;
  description?: string;
  category?: string;
  author?: string;
  venue?: string;
  date?: string;
  cta_text?: string;
  cta_link?: string;
  link?: string;
  show_in_overlay?: boolean;
  content?: string;
  url?: string;
  is_published?: boolean;
  name?: string;
  position?: string;
  image_url?: string;
  icon_name?: "code" | "camera" | "mic" | "palette" | "music";
  members?: number;
  meeting_day?: string;
  activities?: string[];
  advisor?: string;
  qualifications?: string;
  subject?: string;
  email?: string;
  phone?: string;
  team_group?: "academic" | "eca";
  show_on_homepage?: boolean;
  employment_type?: string;
  experience?: string;
  education?: string;
  department?: string;
  source?: string;
  first_name?: string;
  last_name?: string;
  message?: string;
}

export interface CmsSessionUser {
  authenticated: boolean;
  is_staff: boolean;
  username?: string;
  email?: string;
}

export interface AdminValidationResult {
  valid: boolean;
  message?: string;
}
