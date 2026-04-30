import { events, GalleryImages, latestNews, notices, heroSlides as legacyHeroSlides } from "@/data/dummy";
import { legacyClubs, legacyTeamMembers, legacyVideos } from "@/data/cms-legacy";
import type {
  ClubItem,
  EventItem,
  GalleryImageItem,
  HeroSlide,
  NewsArticle,
  Notice,
  PhaseOneCollections,
  PhaseThreeCollections,
  PhaseFourCollections,
  PhaseTwoCollections,
  TeamMemberItem,
  VideoItem,
} from "@/types/cms";

export const phaseOneSeed: PhaseOneCollections = {
  heroSlides: legacyHeroSlides.map((slide, index): HeroSlide => ({
    id: index + 1,
    title: slide.title,
    subtitle: slide.subtitle,
    cta_text: slide.ctaText ?? "Contact Us",
    cta_link: slide.ctaLink ?? "/contact",
    sort_order: index,
    is_published: true,
    image_url: slide.image,
  })),
  notices: notices.map((notice, index): Notice => ({
    id: index + 1,
    title: notice.title,
    excerpt: notice.content,
    published_at: notice.date,
    is_published: true,
    image_url: "/images/foto2.jpg",
    link: "",
    show_in_overlay: index === 0,
  })),
  news: latestNews.map((article): NewsArticle => ({
    id: article.id,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    content: article.content,
    category: article.category,
    author: article.author,
    tags: article.tags,
    published_at: article.date,
    is_published: true,
    image_url: article.image,
  })),
  events: events.slice(0, 4).map((event): EventItem => ({
    id: event.id,
    title: event.title,
    slug: event.slug,
    description: event.description.trim(),
    category: event.category,
    venue: event.venue,
    date: event.date,
    time: event.time,
    schedule: event.schedule,
    published_at: event.date,
    is_published: true,
    image_url: event.image,
  })),
};

export const phaseTwoSeed: PhaseTwoCollections = {
  galleryImages: GalleryImages.map(
    (image): GalleryImageItem => ({
      id: image.id,
      title: image.title,
      description: image.description,
      category: image.category,
      taken_on: image.date,
      sort_order: image.id,
      is_published: true,
      image_url: image.src,
    })
  ),
  contactSubmissions: [],
};

export const phaseThreeSeed: PhaseThreeCollections = {
  videos: legacyVideos.map(
    (video): VideoItem => ({
      id: video.id,
      title: video.title,
      subtitle: video.subtitle,
      url: video.url,
      sort_order: video.id,
      is_published: true,
    })
  ),
  teamMembers: legacyTeamMembers.map(
    (member, index): TeamMemberItem => ({
      id: index + 1,
      name: member.name,
      position: member.position,
      image_url: member.image,
      qualifications: member.qualifications,
      subject: member.subject,
      email: member.email,
      phone: member.phone,
      team_group: member.team_group,
      show_on_homepage: member.show_on_homepage,
      sort_order: index + 1,
      is_published: true,
    })
  ),
};

export const phaseFourSeed: PhaseFourCollections = {
  jobOpenings: [],
  clubs: legacyClubs.map(
    (club, index): ClubItem => ({
      id: index + 1,
      name: club.name,
      slug: club.slug,
      description: club.description,
      icon_name: club.icon_name,
      members: club.members,
      meeting_day: club.meeting_day,
      activities: club.activities,
      advisor: club.advisor,
      image_url: club.image_url,
      sort_order: index + 1,
      is_published: true,
    })
  ),
};
