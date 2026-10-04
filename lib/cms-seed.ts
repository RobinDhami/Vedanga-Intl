import type { HeroSlide } from "@/types/cms";

// Hero slides are the only collection with an intentional local fallback.
// All other collections must come from the CMS database.
export const heroSlidesSeed: HeroSlide[] = [
  {
    id: 1,
    title: "Excellence in Education",
    subtitle: "Nurturing Minds, Shaping Futures",
    cta_text: "Contact Us",
    cta_link: "/contact",
    sort_order: 0,
    is_published: true,
    image_url: "/images/foto14.jpg",
  },
  {
    id: 2,
    title: "World-Class Facilities",
    subtitle: "Creating the Perfect Learning Environment",
    cta_text: "Contact Us",
    cta_link: "/contact",
    sort_order: 1,
    is_published: true,
    image_url: "/images/foto2.jpg",
  },
  {
    id: 3,
    title: "Holistic Development",
    subtitle: "Beyond Academics",
    cta_text: "Contact Us",
    cta_link: "/contact",
    sort_order: 2,
    is_published: true,
    image_url: "/images/foto16.jpg",
  },
  {
    id: 4,
    title: "World-Class Facilities",
    subtitle: "Creating the Perfect Learning Environment",
    cta_text: "Contact Us",
    cta_link: "/contact",
    sort_order: 3,
    is_published: true,
    image_url: "/images/foto8.jpg",
  },
  {
    id: 5,
    title: "Holistic Development",
    subtitle: "Beyond Academics",
    cta_text: "Contact Us",
    cta_link: "/contact",
    sort_order: 4,
    is_published: true,
    image_url: "/images/foto3.jpg",
  },
];
