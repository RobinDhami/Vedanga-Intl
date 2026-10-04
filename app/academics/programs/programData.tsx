import {
  Users,
  Book,
  Award,
  Calculator,
  GraduationCap,
  Globe,
  Palette,
} from "lucide-react";

export interface ProgramDetail {
  title: string;
  grades: string;
  overview: string;
  heroImage: string;
  features: {
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
  curriculum: {
    coreSubjects: string[];
    electives?: string[];
    specialSubjects?: string[];
    tracks?: {
      name: string;
      subjects: string[];
    }[];
    approach: string;
  };
  dailySchedule: {
    time: string;
    activity: string;
  }[];
  gallery: string[];
}

export interface ProgramListItem {
  title: string;
  grades: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  image: string;
  color: string;
  slug: string;
}

export const PROGRAM_DATA: Record<string, ProgramDetail> = {
  "early-years": {
    title: "Early Years Program",
    grades: "Ages 3-6",
    overview:
      "Focus on play-based, inquiry-driven learning that develops language, motor skills, social-emotional growth, and curiosity.",
    heroImage: "/images/foto1.jpg",
    features: [
      {
        title: "Play-Based Learning",
        description: "Meaningful play that builds confidence, creativity, and early skills.",
        icon: <Palette className="h-6 w-6" />,
      },
      {
        title: "Growing Independence",
        description: "Daily routines that support communication, self-care, and social growth.",
        icon: <Users className="h-6 w-6" />,
      },
      {
        title: "Curious Minds",
        description: "Hands-on exploration that encourages children to ask questions and discover.",
        icon: <Globe className="h-6 w-6" />,
      },
    ],
    curriculum: {
      coreSubjects: [
        "Language & Literacy",
        "Early Numeracy",
        "Creative Arts",
        "Movement & Motor Skills",
        "Social-Emotional Learning",
      ],
      specialSubjects: ["Music & Movement", "Storytelling", "Outdoor Play"],
      approach:
        "Our Early Years program creates a safe, joyful environment where children learn through play, inquiry, movement, stories, and positive relationships.",
    },
    dailySchedule: [],
    gallery: ["/images/foto1.jpg", "/images/foto6.jpg", "/images/foto8.jpg"],
  },
  "primary-education": {
    title: "Primary Education Program",
    grades: "Grades 1-5",
    overview:
      "Our Primary Education program lays the foundation for lifelong learning through a balanced approach that nurtures intellectual curiosity, creativity, and social-emotional development.",
    heroImage: "/images/foto4.jpg",
    features: [
      {
        title: "Holistic Development",
        description:
          "Integrated approach focusing on cognitive, physical, social, and emotional growth",
        icon: <Users className="h-6 w-6" />,
      },
      {
        title: "Literacy Focus",
        description:
          "Strong emphasis on reading, writing, and communication skills development",
        icon: <Book className="h-6 w-6" />,
      },
      {
        title: "Exploratory Learning",
        description:
          "Hands-on activities and project-based learning to spark curiosity",
        icon: <Award className="h-6 w-6" />,
      },
    ],
    curriculum: {
      coreSubjects: [
        "English Language Arts",
        "Mathematics",
        "Science",
        "Social Studies",
        "Nepali Language",
      ],
      specialSubjects: [
        "Art & Music",
        "Physical Education",
        "Computer Literacy",
        "Moral Education",
      ],
      approach:
        "Our primary program uses thematic units that integrate multiple subjects, allowing students to make natural connections between different areas of knowledge. We emphasize play-based learning in the early grades, gradually transitioning to more structured academic work.",
    },
    dailySchedule: [
      { time: "8:00 - 8:30", activity: "Morning Assembly" },
      { time: "8:30 - 9:15", activity: "English Language" },
      { time: "9:15 - 10:00", activity: "Mathematics" },
      { time: "10:00 - 10:30", activity: "Break Time" },
      { time: "10:30 - 11:15", activity: "Science" },
      { time: "11:15 - 12:00", activity: "Social Studies" },
      { time: "12:00 - 12:45", activity: "Lunch & Recess" },
      { time: "12:45 - 1:30", activity: "Special Subject (Art/Music/PE)" },
      { time: "1:30 - 2:15", activity: "Nepali Language" },
      { time: "2:15 - 3:00", activity: "Project Work/Remedial" },
    ],
    gallery: [
      "/images/foto1.jpg",
      "/images/foto8.jpg",
      "/images/foto6.jpg",
    ],
  },
  "middle-school": {
    title: "Middle School Program",
    grades: "Grades 6-8",
    overview:
      "Our Middle School program serves as a bridge between primary and secondary education, focusing on developing critical thinking skills, subject mastery, and personal responsibility.",
    heroImage: "/images/foto12.jpg",
    features: [
      {
        title: "Subject Specialization",
        description:
          "Deeper exploration of core subjects with specialized teachers",
        icon: <Book className="h-6 w-6" />,
      },
      {
        title: "STEAM Integration",
        description:
          "Science, Technology, Engineering, Arts, and Mathematics focus",
        icon: <Calculator className="h-6 w-6" />,
      },
      {
        title: "Advisory Program",
        description: "Dedicated mentors to guide students through adolescence",
        icon: <Users className="h-6 w-6" />,
      },
    ],
    curriculum: {
      coreSubjects: [
        "Advanced English",
        "Algebra & Geometry",
        "Life & Physical Sciences",
        "World History & Geography",
        "Computer Science",
      ],
      electives: [
        "Foreign Languages",
        "Visual & Performing Arts",
        "Technology & Design",
        "Debate & Public Speaking",
      ],
      approach:
        "Our middle school curriculum emphasizes interdisciplinary connections, with project-based learning units that combine multiple subjects. We focus on developing organizational skills, time management, and independent learning habits to prepare students for secondary education.",
    },
    dailySchedule: [
      { time: "8:00 - 8:30", activity: "Homeroom/Advisory" },
      { time: "8:30 - 9:20", activity: "English" },
      { time: "9:20 - 10:10", activity: "Mathematics" },
      { time: "10:10 - 10:40", activity: "Break" },
      { time: "10:40 - 11:30", activity: "Science" },
      { time: "11:30 - 12:20", activity: "Social Studies" },
      { time: "12:20 - 1:00", activity: "Lunch" },
      { time: "1:00 - 1:50", activity: "Elective 1" },
      { time: "1:50 - 2:40", activity: "Elective 2" },
      { time: "2:40 - 3:30", activity: "Study Hall/Clubs" },
    ],
    gallery: [
      "/images/foto2.jpg",
      "/images/foto18.jpg",
      "/images/foto3.jpg",
    ],
  },
  "secondary-education": {
    title: "Secondary Education Program",
    grades: "Grades 9-10",
    overview:
      "Our Secondary Education program prepares students for the SEE examinations while developing advanced academic skills and career awareness through specialized tracks.",
    heroImage: "/images/foto18.jpg",
    features: [
      {
        title: "SEE Preparation",
        description: "Comprehensive test preparation and practice exams",
        icon: <GraduationCap className="h-6 w-6" />,
      },
      {
        title: "Career Exploration",
        description: "Guidance counseling and career awareness programs",
        icon: <Users className="h-6 w-6" />,
      },
      {
        title: "Advanced Sciences",
        description:
          "Laboratory-intensive courses in physics, chemistry, and biology",
        icon: <Calculator className="h-6 w-6" />,
      },
    ],
    curriculum: {
      coreSubjects: [
        "Advanced English",
        "Mathematics (Optional/General)",
        "Science (Physics, Chemistry, Biology)",
        "Social Studies & Population",
        "Nepali",
      ],
      tracks: [
        {
          name: "Science Track",
          subjects: [
            "Advanced Mathematics",
            "Computer Science",
            "Additional Science",
          ],
        },
        {
          name: "Management Track",
          subjects: ["Accountancy", "Business Studies", "Economics"],
        },
        {
          name: "Humanities Track",
          subjects: ["Sociology", "Psychology", "Political Science"],
        },
      ],
      approach:
        "Our secondary program offers specialized tracks to cater to different academic interests and career aspirations. We combine rigorous academic preparation with practical applications, ensuring students are ready for both examinations and real-world challenges.",
    },
    dailySchedule: [
      { time: "8:00 - 8:45", activity: "English" },
      { time: "8:45 - 9:30", activity: "Mathematics" },
      { time: "9:30 - 10:15", activity: "Science" },
      { time: "10:15 - 10:45", activity: "Break" },
      { time: "10:45 - 11:30", activity: "Social Studies" },
      { time: "11:30 - 12:15", activity: "Track Subject 1" },
      { time: "12:15 - 1:00", activity: "Lunch" },
      { time: "1:00 - 1:45", activity: "Nepali" },
      { time: "1:45 - 2:30", activity: "Track Subject 2" },
      { time: "2:30 - 3:15", activity: "Remedial/Test Prep" },
      { time: "3:15 - 4:00", activity: "Electives/Clubs" },
    ],
    gallery: [
      "/images/foto15.jpg",
      "/images/foto16.jpg",
      "/images/foto19.jpg",
    ],
  },
};

export const PROGRAM_LIST: ProgramListItem[] = [
  {
    title: "Early Years (Ages 3-6)",
    grades: "Ages 3-6",
    description:
      "Focus on play-based, inquiry-driven learning that develops language, motor skills, social-emotional growth, and curiosity.",
    icon: <Palette className="h-8 w-8" />,
    features: ["Play-Based Learning", "Language Development", "Creative Exploration", "Social-Emotional Growth"],
    image: "/images/foto1.jpg",
    color: "bg-rose-100 text-rose-600",
    slug: "early-years",
  },
  {
    title: "Primary School (Grades 1-5)",
    grades: "Grades 1-5",
    description:
      "Emphasize foundational literacy and numeracy, creativity, project work, and integrated thematic learning.",
    icon: <Book className="h-8 w-8" />,
    features: [
      "Foundational Literacy",
      "Numeracy Skills",
      "Project-Based Learning",
      "Creative Arts",
    ],
    image: "/images/foto4.jpg",
    color: "bg-blue-100 text-blue-600",
    slug: "primary-education",
  },
  {
    title: "Middle School (Grades 6-8)",
    grades: "Grades 6-8",
    description:
      "Develop analytical thinking, collaboration, research skills, and increasing student independence through interdisciplinary projects.",
    icon: <Calculator className="h-8 w-8" />,
    features: [
      "Analytical Thinking",
      "Research Skills",
      "Collaborative Learning",
      "Interdisciplinary Projects",
    ],
    image: "/images/foto13.jpg",
    color: "bg-purple-100 text-purple-600",
    slug: "middle-school",
  },
  {
    title: "Secondary School (Grades 9-10)",
    grades: "Grades 9-10",
    description:
      "Prepare students for higher education and careers with advanced academics, leadership opportunities, internships, entrepreneurship, and career guidance.",
    icon: <GraduationCap className="h-8 w-8" />,
    features: [
      "Advanced Academics",
      "Leadership Opportunities",
      "Career Guidance",
      "Entrepreneurship",
    ],
    image: "/images/foto12.jpg",
    color: "bg-green-100 text-green-600",
    slug: "secondary-education",
  },
  
];
