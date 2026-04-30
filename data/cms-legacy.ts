export const legacyTeamMembers: Array<{
  name: string;
  position: string;
  image: string;
  qualifications: string;
  subject: string;
  email: string;
  phone: string;
  team_group: "academic" | "eca";
  show_on_homepage: boolean;
}> = [
  {
    name: "Bhawesh Chhatkuli, M.Sc.Humanities (TU)",
    position: "Principal",
    image: "/images/ppp.png",
    qualifications: "Masters in Humanities (TU)",
    subject: "Science and Mathematics",
    email: "s.johnson@school.edu",
    phone: "+1 (555) 123-4567",
    team_group: "academic",
    show_on_homepage: true,
  },
  {
    name: "Sharada Adhikari, STEAM Educator",
    position: "Academic Director",
    image: "/images/Team8.png",
    qualifications: "M.Ed. in Educational Administration",
    subject: "Steam Educator",
    email: "j.smith@school.edu",
    phone: "+1 (555) 234-5678",
    team_group: "academic",
    show_on_homepage: true,
  },
  {
    name: "Sudip Shrestha",
    position: "ECA Coordinator/Futsal Coach (ANFA 1st Batch)",
    image: "/images/Team5.jpg",
    qualifications: "Former National Player, Former APF Coach 'A' Division, AFC 'C' Licence Coach",
    subject: "Physical Education",
    email: "s.shrestha@school.edu",
    phone: "+977 (123) 456-7890",
    team_group: "eca",
    show_on_homepage: false,
  },
  {
    name: "Dambar Bahadur Ale Magar",
    position: "Karate Instructor",
    image: "/images/Team2.jpg",
    qualifications: "Former Karate National Player, National Referee, Nepal",
    subject: "Karate",
    email: "d.magar@school.edu",
    phone: "+977 (123) 567-8901",
    team_group: "eca",
    show_on_homepage: false,
  },
  {
    name: "Yogina Shrestha",
    position: "Skater Instructor",
    image: "/images/Team1.jpg",
    qualifications: "National Player Roll Ball, Indo-Nepal Skate Race Gold Medalist (2015)",
    subject: "Skating",
    email: "y.shrestha@school.edu",
    phone: "+977 (123) 678-9012",
    team_group: "eca",
    show_on_homepage: false,
  },
  {
    name: "Bishnu Shrestha",
    position: "Arts & Crafts Instructor (Visual and Sculpting)",
    image: "/images/Team7.jpg",
    qualifications: "Lecturer of Arts (Tribhuvan University)",
    subject: "Arts & Crafts",
    email: "b.shrestha@school.edu",
    phone: "+977 (123) 789-0123",
    team_group: "eca",
    show_on_homepage: false,
  },
  {
    name: "Raj Shrestha",
    position: "Dance Instructor",
    image: "/images/Team6.jpg",
    qualifications: "Director, Let's Dance",
    subject: "Dance",
    email: "r.shrestha@school.edu",
    phone: "+977 (123) 890-1234",
    team_group: "eca",
    show_on_homepage: false,
  },
  {
    name: "Subash Chandra Joshi",
    position: "Senior Music Instructor (Eastern Music)",
    image: "/images/Team3.jpg",
    qualifications: "Music Composer/Singer, Image Fm Music Award Winner",
    subject: "Eastern Music",
    email: "s.joshi@school.edu",
    phone: "+977 (123) 901-2345",
    team_group: "eca",
    show_on_homepage: false,
  },
];

export const legacyVideos = [
  {
    id: 1,
    title: "Introduction to Vedanga International School",
    subtitle: "A brief overview of our values and goals",
    url: "https://www.youtube.com/embed/NA-ZUDBEtZc",
  },
  {
    id: 2,
    title: "Annual Function 2081 (Part 1)",
    subtitle: "Watch part 1 of the highlights from our annual program at Vedanga International School",
    url: "https://www.youtube.com/embed/UPza3U4_hF4",
  },
  {
    id: 3,
    title: "Annual Function 2081 (Part 2)",
    subtitle: "Watch part 2 of the highlights from our annual program at Vedanga International School",
    url: "https://www.youtube.com/embed/63Oy7xrfM2g?si=z-4Dn6dxlyjt8p24",
  },
];

export const legacyClubs: Array<{
  name: string;
  slug: string;
  description: string;
  icon_name: "code" | "camera" | "mic" | "palette" | "music";
  members: number;
  meeting_day: string;
  activities: string[];
  advisor: string;
  image_url: string;
}> = [
  {
    name: "Robotics Club",
    slug: "robotics-club",
    description:
      "Learn coding, circuits, and AI-driven technology. Work on real-world robotics projects and automation. Collaborate on hardware cum software innovations for competitions.",
    icon_name: "code",
    members: 40,
    meeting_day: "Thursday",
    activities: ["Coding Workshops", "Robotics Projects", "Competitions"],
    advisor: "Ms. Sarah Chen",
    image_url: "/images/foto18.jpg",
  },
  {
    name: "Digital Content Creation Club",
    slug: "digital-content-creation-club",
    description:
      "Learn video editing, animation, and graphic design. Create content for social media, school projects, and events. Work on branding and multimedia storytelling.",
    icon_name: "camera",
    members: 30,
    meeting_day: "Friday",
    activities: ["Video Editing", "Animation", "Graphic Design"],
    advisor: "Mr. James Wilson",
    image_url: "/images/foto21.jpg",
  },
  {
    name: "Studio Club",
    slug: "studio-club",
    description:
      "Record and edit podcasts on student life, tech, and creativity. Share your voice through poetry readings and storytelling sessions. Collaborate with the Digital Content Club for high-quality productions.",
    icon_name: "mic",
    members: 25,
    meeting_day: "Monday",
    activities: ["Podcasting", "Poetry Readings", "Storytelling"],
    advisor: "Mrs. Lisa Chen",
    image_url: "/images/foto15.jpg",
  },
  {
    name: "Arts Club",
    slug: "arts-club",
    description:
      "Explore sketching, painting, and creative writing. Work on mural projects and school exhibitions.",
    icon_name: "palette",
    members: 32,
    meeting_day: "Wednesday",
    activities: ["Sketching", "Painting", "Creative Writing"],
    advisor: "Mr. Robert Taylor",
    image_url: "/images/foto5.jpg",
  },
  {
    name: "Music & Dance Club",
    slug: "music-and-dance-club",
    description:
      "Learn instrumental and vocal performance at school competitions. Explore different genres from classical to modern.",
    icon_name: "music",
    members: 40,
    meeting_day: "Monday",
    activities: ["Instrumental Practice", "Vocal Performance", "Competitions"],
    advisor: "Mrs. Lisa Chen",
    image_url: "/images/foto7.jpg",
  },
];
