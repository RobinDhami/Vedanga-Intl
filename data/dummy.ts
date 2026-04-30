export interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
  tagline?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
  id?: string | number;
}
export const heroSlides: HeroSlide[] = [
  {
    image: "/images/foto14.jpg",
    title: "Excellence in Education",
    subtitle: "Nurturing Minds, Shaping Futures",
  },
  {
    image: "/images/foto2.jpg",
    title: "World-Class Facilities",
    subtitle: "Creating the Perfect Learning Environment",
  },
  {
    image: "/images/foto16.jpg",
    title: "Holistic Development",
    subtitle: "Beyond Academics",
  },
  {
    image: "/images/foto8.jpg",
    title: "World-Class Facilities",
    subtitle: "Creating the Perfect Learning Environment",
  },
  {
    image: "/images/foto3.jpg",
    title: "Holistic Development",
    subtitle: "Beyond Academics",
  },
];

export const galleryImages = [
  "/images/foto5.jpg",
  "/images/foto12.jpg",
  "/images/foto13.jpg",
  "/images/foto14.jpg",
];

export const news = [
  {
    id: 1,
    title: "Outstanding Academic Results in National Examinations",
    excerpt:
      "Our students have achieved exceptional results in this year's national examinations, with 95% scoring distinction grades across all subjects.",
    date: "2024-03-15",
    category: "Academic",
    author: "Admin",
    image: "/images/foto3.jpg",
    slug: "outstanding-academic-results",
    color: "bg-blue-100 text-blue-600",
    content: `
      <p class="mb-4">We are proud to announce that our students have achieved exceptional results in this year's national examinations. The dedication of our students, combined with the support of our faculty and parents, has led to outstanding academic performance across all subjects.</p>
      
      <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">Key Highlights</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>95% of students scored distinction</li>
        <li>100% pass rate across all subjects</li>
        <li>Top scores in Mathematics and Sciences</li>
        <li>Multiple students ranked in national top 10</li>
      </ul>

      <p class="mb-4">This achievement reflects our commitment to academic excellence and our holistic approach to education. We continue to strive for even better results while ensuring our students develop into well-rounded individuals.</p>
    `,
    tags: ["Academic", "Achievement", "Examinations"],
  },
  {
    id: 2,
    title: "New STEM Laboratory Inauguration",
    excerpt:
      "State-of-the-art STEM laboratory inaugurated with cutting-edge technology to enhance scientific learning and innovation.",
    date: "2024-03-10",
    category: "Facilities",
    author: "Principal",
    image: "/images/foto4.jpg",
    slug: "stem-lab-inauguration",
    color: "bg-green-100 text-green-600",
    content: `
      <p class="mb-4">We are excited to announce the inauguration of our new STEM laboratory, equipped with the latest technology to foster innovation and scientific learning.</p>
      
      <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">Features Include</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>3D printing and robotics stations</li>
        <li>Virtual reality science simulations</li>
        <li>Advanced microscopy equipment</li>
        <li>Collaborative research spaces</li>
      </ul>

      <p class="mb-4">This facility represents our commitment to preparing students for careers in science and technology, with hands-on learning experiences that inspire creativity and problem-solving.</p>
    `,
    tags: ["STEM", "Facilities", "Innovation"],
  },
  {
    id: 3,
    title: "International Student Exchange Program Launch",
    excerpt:
      "New global partnership program offering students international exposure and cross-cultural learning opportunities.",
    date: "2024-03-05",
    category: "International",
    author: "Admin",
    image: "/images/foto5.jpg",
    slug: "student-exchange-program",
    color: "bg-purple-100 text-purple-600",
    content: `
      <p class="mb-4">We are thrilled to launch our new International Student Exchange Program in partnership with leading schools across three continents.</p>
      
      <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">Program Highlights</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Semester-long exchanges with partner schools</li>
        <li>Cultural immersion experiences</li>
        <li>Language learning opportunities</li>
        <li>Global classroom collaborations</li>
      </ul>

      <p class="mb-4">This program will broaden our students' horizons and prepare them to be global citizens in an increasingly interconnected world.</p>
    `,
    tags: ["International", "Exchange", "Global"],
  },
  {
    id: 4,
    title: "Annual Sports Day Champions Crowned",
    excerpt:
      "Record-breaking performances at this year's sports day with new school records set in multiple events.",
    date: "2024-02-28",
    category: "Sports",
    author: "Sports Director",
    image: "/images/foto7.jpg",
    slug: "sports-day-champions",
    color: "bg-red-100 text-red-600",
    content: `
      <p class="mb-4">Our annual sports day was a tremendous success, with students demonstrating exceptional athleticism and sportsmanship.</p>
      
      <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">Notable Achievements</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>New school records in 100m dash and long jump</li>
        <li>Close competition in team events</li>
        <li>Outstanding performances from all age groups</li>
        <li>Spirit award for best team support</li>
      </ul>

      <p class="mb-4">Congratulations to all participants for their dedication and to the champions in each category.</p>
    `,
    tags: ["Sports", "Achievement", "Athletics"],
  },
  {
    id: 5,
    title: "School Wins Environmental Sustainability Award",
    excerpt:
      "Recognized for our comprehensive green initiatives and student-led conservation projects.",
    date: "2024-02-20",
    category: "Academic",
    author: "Eco Club",
    image: "/images/foto9.jpg",
    slug: "sustainability-award",
    color: "bg-yellow-100 text-yellow-600",
    content: `
      <p class="mb-4">Our school has been honored with the prestigious Green Schools Award for our outstanding environmental initiatives.</p>
      
      <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">Our Green Programs</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Solar panel installation covering 60% of energy needs</li>
        <li>Comprehensive recycling program</li>
        <li>Student-led organic garden</li>
        <li>Water conservation systems</li>
      </ul>

      <p class="mb-4">This recognition reflects our commitment to environmental stewardship and sustainable education.</p>
    `,
    tags: ["Environment", "Award", "Sustainability"],
  },
];
export const Newscategories = [
  "All",
  "Academic",
  "Events",
  "Facilities",
  "International",
  "Sports",
];
export const latestNews = (() => {
  const now = new Date();
  const recentNews = news.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  ); // Sort newest first

  return recentNews.slice(0, 3); // Return the 3 most recent news items
})();
export const GalleryImages = [
  {
    id: 1,
    src: "/images/foto1.jpg",
    category: "School Life",
    title: "Student Life",
    description: "Students enjoying school activities",
    date: "March 15, 2024",
  },
  {
    id: 2,
    src: "/images/foto2.jpg",
    category: "Academics",
    title: "Library",
    description: "Our state-of-the-art library facility",
    date: "March 10, 2024",
  },
  {
    id: 3,
    src: "/images/foto3.jpg",
    category: "Sports",
    title: "Annual Sports Meet",
    description: "Highlights from our annual sports day",
    date: "March 5, 2024",
  },
  {
    id: 4,
    src: "/images/foto4.jpg",
    category: "Events",
    title: "Cultural Festival",
    description: "Celebrating diversity through cultural performances",
    date: "March 1, 2024",
  },
  {
    id: 5,
    src: "/images/foto5.jpg",
    category: "Activities",
    title: "Science Fair",
    description: "Students showcasing their scientific projects",
    date: "February 25, 2024",
  },
  {
    id: 6,
    src: "/images/foto6.jpg",
    category: "School Life",
    title: "Student Council",
    description: "Student leaders in action",
    date: "February 20, 2024",
  },
  {
    id: 7,
    src: "/images/foto7.jpg",
    category: "School Life",
    title: "Student Council",
    description: "Student leaders in action",
    date: "February 20, 2024",
  },
  {
    id: 8,
    src: "/images/foto8.jpg",
    category: "School Life",
    title: "Student Council",
    description: "Student leaders in action",
    date: "February 20, 2024",
  },
  {
    id: 9,
    src: "/images/foto9.jpg",
    category: "School Life",
    title: "Student Council",
    description: "Student leaders in action",
    date: "February 20, 2024",
  },
  {
    id: 10,
    src: "/images/foto10.jpg",
    category: "School Life",
    title: "Student Council",
    description: "Student leaders in action",
    date: "February 20, 2024",
  },
  {
    id: 11,
    src: "/images/foto19.jpg",
    category: "School Life",
    title: "Student Council",
    description: "Student leaders in action",
    date: "February 20, 2024",
  },
  {
    id: 12,
    src: "/images/foto12.jpg",
    category: "School Life",
    title: "Student Council",
    description: "Student leaders in action",
    date: "February 20, 2024",
  },
  {
    id: 13,
    src: "/images/foto13.jpg",
    category: "School Life",
    title: "Student Council",
    description: "Student leaders in action",
    date: "February 20, 2024",
  },
  {
    id: 14,
    src: "/images/foto14.jpg",
    category: "School Life",
    title: "Student Life",
    description: "Students enjoying campus activities",
    date: "March 15, 2024",
  },
  {
    id: 15,
    src: "/images/foto15.jpg",
    category: "Academics",
    title: "Library",
    description: "Our state-of-the-art library facility",
    date: "March 10, 2024",
  },
  {
    id: 16,
    src: "/images/foto16.jpg",
    category: "Sports",
    title: "Annual Sports Meet",
    description: "Highlights from our annual sports day",
    date: "March 5, 2024",
  },
  {
    id: 17,
    src: "/images/foto17.jpg",
    category: "Events",
    title: "Cultural Festival",
    description: "Celebrating diversity through cultural performances",
    date: "March 1, 2024",
  },
  {
    id: 18,
    src: "/images/foto18.jpg",
    category: "Activities",
    title: "Science Fair",
    description: "Students showcasing their scientific projects",
    date: "February 25, 2024",
  },
];

export const Gallerycategories = [
  "All",
  "School Life",
  "Academics",
  "Sports",
  "Events",
  "Activities",
];

export const notices = [
  {
    title: "Admission Open for Academic Year 2024-25",
    date: "2024-02-15",
    category: "Admissions",
    content:
      "Applications are now being accepted for all grades. Limited seats available.",
  },
  {
    title: "Parent-Teacher Meeting Schedule",
    date: "2024-02-10",
    category: "Academic",
    content:
      "The first term parent-teacher meeting will be held on March 1st, 2024.",
  },
  {
    title: "Holiday Notice: Holi Festival",
    date: "2024-02-05",
    category: "Holiday",
    content:
      "School will remain closed on March 25th, 2024 for Holi celebrations.",
  },
];
export const events = [
  {
    id: 1,
    title: "Election of Head and Deputy Head",
    slug: "election-of-head-and-deputy-head",
    date: "2025-05-02",
    time: "12:00 AM - 5:00 PM",
    venue: "Sports Complex",
    category: "Community",
    image: "/images/foto14.jpg",
    description: `
      The Election of Head and Deputy Head is an annual event that encourages student participation in the democratic process. Students from various grades campaign for leadership positions, showcasing their vision and plans for the school. This event fosters leadership skills, public speaking, and teamwork among the participants. The election process includes candidate speeches, voting, and the announcement of results. It is a significant event that empowers students to take on leadership roles and contribute to the school community.
    `,
    schedule: [
      {
        day: "Election Day",
        date: "May 02, 2025",
        events: [
          "8:00 AM - Opening Ceremony",
          "9:30 AM - Candidate Speeches",
          "11:00 AM - Voting Begins",
          "4:00 PM - Results Announcement",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "House Division (Internal)",
    slug: "house-division-internal",
    date: "2025-05-13",
    time: "11:00 AM - 3:00 PM",
    venue: "Auditorium",
    category: "Community",
    image: "/images/foto6.jpg",
    description: `
      The House Division is an internal event where students are divided into different houses for the academic year. This division fosters a sense of belonging and team spirit among the students. Each house will participate in various inter-house competitions throughout the year, promoting healthy competition and collaboration. The event includes team-building activities and the assignment of house captains and vice-captains. It is an essential part of the school's extracurricular activities, encouraging students to work together and support each other.
    `,
    schedule: [
      {
        day: "Division Day",
        date: "May 13, 2025",
        events: [
          "10:00 AM - Welcome and Introduction",
          "11:30 AM - House Assignments",
          "1:00 PM - Team Building Activities",
          "2:30 PM - Closing Remarks",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Debate (Sr. and M.S.) House-wise",
    slug: "housewise-debate-sr-and-ms",
    date: "2025-05-22",
    time: "6:00 PM - 9:00 PM",
    venue: "School Ground",
    category: "Academic",
    image: "/images/foto21.jpg",
    description: `
      The House-wise Debate competition is an annual event that encourages critical thinking, public speaking, and teamwork among Senior and Middle School students. Each house prepares and presents arguments on various topics, fostering a culture of healthy debate and intellectual discourse. The competition is judged by a panel of experts, and the winning house is awarded points that contribute to their overall house score. This event is a highlight of the academic year, promoting academic excellence and fostering a competitive spirit among the students.
    `,
    schedule: [
      {
        day: "Debate Day",
        date: "May 22, 2025",
        events: [
          "6:00 PM - Opening Ceremony",
          "6:30 PM - Debate Rounds Begin",
          "7:30 PM - Final Round",
          "8:30 PM - Award Ceremony",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Oath taking and badge distribution",
    slug: "oath-taking-and-badge-distribution",
    date: "2025-05-22",
    time: "10:00 AM - 12:00 PM",
    venue: "Auditorium",
    category: "Community",
    image: "/images/foto4.jpg",
    description: `
      The Oath taking and badge distribution ceremony is an event where newly elected student leaders take an oath and receive their badges. This ceremony marks the beginning of their leadership roles and responsibilities. It is an important event that encourages students to take on leadership positions and contribute to the school community.
    `,
    schedule: [
      {
        day: "Oath Taking Day",
        date: "May 22, 2025",
        events: [
          "10:00 AM - Welcome and Introduction",
          "10:30 AM - Oath Taking Ceremony",
          "11:00 AM - Badge Distribution",
          "11:30 AM - Closing Remarks",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Tulsi plantation and puja",
    slug: "tulsi-plantation-and-puja",
    date: "2025-06-22",
    time: "9:00 AM - 11:00 AM",
    venue: "School Garden",
    category: "Cultural",
    image: "/images/foto2.jpg",
    description: `
      Tulsi plantation and puja is an event where students participate in planting Tulsi plants and performing puja. This event aims to promote the significance of Tulsi in Hindu culture and encourage students to appreciate and respect nature. The event includes planting activities, puja rituals, and discussions about the importance of Tulsi.
    `,
    schedule: [
      {
        day: "Tulsi Plantation Day",
        date: "June 22, 2025",
        events: [
          "9:00 AM - Welcome and Introduction",
          "9:30 AM - Planting Activities",
          "10:30 AM - Puja Rituals",
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Dahi chiura & Ropain",
    slug: "dahi-chiura-and-ropain",
    date: "2025-06-29",
    time: "2:00 PM - 5:00 PM",
    venue: "City Center",
    category: "Cultural",
    image: "/images/foto12.jpg",
    description: `
      The Dahi chiura & Ropain event is a celebration of traditional Nepali culture. Students participate in activities such as Dahi chiura (curd and beaten rice) making and Ropain (traditional Nepali feast) preparation. This event aims to preserve and promote Nepali cultural heritage among the students. It includes cultural performances, traditional games, and a feast where students and teachers come together to celebrate. The event fosters a sense of cultural pride and unity among the participants.
    `,
    schedule: [
      {
        day: "Cultural Day",
        date: "June 29, 2025",
        events: [
          "2:00 PM - Welcome and Introduction",
          "2:30 PM - Dahi chiura Competition",
          "3:30 PM - Ropain Demonstration",
          "4:30 PM - Cultural Performances",
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Poem recitation Sr. M.S. & Jr(housewise)",
    slug: "poem-recitation-sr-ms-jr-housewise",
    date: "2025-07-10",
    time: "4:00 PM - 7:00 PM",
    venue: "Classroom Hall",
    category: "Academic",
    image: "/images/foto2.jpg",
    description: `
      The House-wise Poem Recitation competition is an annual event that encourages students to explore and appreciate literature. Students from Senior, Middle School, and Junior levels participate in reciting poems from various genres and authors. This event promotes language skills, public speaking, and a love for literature among the students. The competition is judged by a panel of experts, and the winning house is awarded points that contribute to their overall house score. It is a significant event that fosters academic excellence and cultural appreciation.
    `,
    schedule: [
      {
        day: "Recitation Day",
        date: "July 10, 2025",
        events: [
          "4:00 PM - Opening Ceremony",
          "4:30 PM - Recitation Rounds Begin",
          "5:30 PM - Final Round",
          "6:30 PM - Award Ceremony",
        ],
      },
    ],
  },
  {
    id: 8,
    title: "1st Term",
    slug: "1st-term",
    date: "2025-08-01",
    time: "All Day",
    venue: "School Premises",
    category: "Academic",
    image: "/images/foto18.jpg",
    description: `
      The 1st Term exams are conducted to assess the academic progress of students. The exams cover various subjects and are an important part of the academic evaluation process. Students are encouraged to prepare thoroughly and perform to the best of their abilities.
    `,
    schedule: [
      {
        day: "Exam Day",
        date: "August 1, 2025",
        events: ["9:00 AM - Exam Begins", "12:00 PM - Exam Ends"],
      },
    ],
  },
  {
    id: 9,
    title: "1st PTI",
    slug: "1st-pti",
    date: "2025-08-17",
    time: "10:00 AM - 12:00 PM",
    venue: "School Premises",
    category: "Community",
    image: "/images/foto13.jpg",
    description: `
      The 1st Parent-Teacher Interaction (PTI) is an event where parents and teachers discuss the academic progress and behavior of students. The event aims to foster a collaborative relationship between parents and teachers to support the academic and personal development of students.
    `,
    schedule: [
      {
        day: "PTI Day",
        date: "August 17, 2025",
        events: [
          "10:00 AM - Welcome and Introduction",
          "10:30 AM - Parent-Teacher Discussions",
          "11:30 AM - Feedback and Q&A",
        ],
      },
    ],
  },
  {
    id: 10,
    title: "Quiz (Jr. M.S., Sr) House-wise",
    slug: "quiz-jr-ms-sr-housewise",
    date: "2025-09-16",
    time: "10:00 AM - 12:00 PM",
    venue: "Auditorium",
    category: "Academic",
    image: "/images/foto2.jpg",
    description: `
      The House-wise Quiz competition is an annual event that encourages critical thinking, general knowledge, and teamwork among Junior, Middle School, and Senior School students. Each house participates in the quiz competition, answering questions on various topics. The competition is judged by a panel of experts, and the winning house is awarded points that contribute to their overall house score. The event aims to promote academic excellence and foster a competitive spirit among the students.
    `,
    schedule: [
      {
        day: "Quiz Day",
        date: "September 16, 2025",
        events: [
          "10:00 AM - Welcome and Introduction",
          "10:30 AM - Quiz Rounds Begin",
          "11:30 AM - Award Ceremony",
        ],
      },
    ],
  },
  {
    id: 11,
    title: "Children’s Day celebration( Cake-cutting)",
    slug: "childrens-day-celebration",
    date: "2025-09-29",
    time: "10:00 AM - 12:00 PM",
    venue: "School Premises",
    category: "Cultural",
    image: "/images/foto1.jpg",
    description: `
      Children’s Day celebration is an event where students participate in various activities to celebrate Children's Day. The event includes cake-cutting ceremonies, cultural performances, and discussions about the rights and welfare of children. The event aims to promote the importance of Children's Day and encourage students to appreciate the significance of the day.
    `,
    schedule: [
      {
        day: "Children’s Day",
        date: "September 29, 2025",
        events: [
          "10:00 AM - Welcome and Introduction",
          "10:30 AM - Cake-cutting Ceremony",
          "11:30 AM - Cultural Performances",
        ],
      },
    ],
  },
  {
    id: 12,
    title: "Inter-house Art Competition",
    slug: "inter-house-art-competition",
    date: "2025-11-22",
    time: "10:00 AM - 12:00 PM",
    venue: "School Premises",
    category: "Academic",
    image: "/images/foto16.jpg",
    description: `
      The Inter-house Art Competition is an annual event that encourages creativity and artistic skills among students. Each house participates in the art competition, creating artworks based on various themes. The competition is judged by a panel of experts, and the winning house is awarded points that contribute to their overall house score. The event aims to promote artistic excellence and foster a competitive spirit among the students.
    `,
    schedule: [
      {
        day: "Art Competition Day",
        date: "November 22, 2025",
        events: [
          "10:00 AM - Welcome and Introduction",
          "10:30 AM - Art Rounds Begin",
          "11:30 AM - Award Ceremony",
        ],
      },
    ],
  },
  {
    id: 13,
    title: "Haat bazaar",
    slug: "haat-bazaar",
    date: "2025-12-05",
    time: "10:00 AM - 12:00 PM",
    venue: "School Premises",
    category: "Community",
    image: "/images/foto6.jpg",
    description: `
      Haat bazaar is an event where students participate in various activities related to the Haat (elephant) festival. The event includes making Haat-themed crafts, cultural performances, and discussions about the significance of the festival. The event aims to promote the cultural heritage of Nepal and encourage students to appreciate the festival.
    `,
    schedule: [
      {
        day: "Haat bazaar Day",
        date: "December 5, 2025",
        events: [
          "10:00 AM - Welcome and Introduction",
          "10:30 AM - Haat-themed Crafts",
          "11:30 AM - Cultural Performances",
        ],
      },
    ],
  },
  {
    id: 14,
    title: "1st Term Exam",
    slug: "1st-term-exam",
    date: "2025-12-11",
    time: "All Day",
    venue: "School Premises",
    category: "Academic",
    image: "/images/foto3.jpg",
    description: `
      The 1st Term Exam is conducted to assess the academic progress of students. The exams cover various subjects and are an important part of the academic evaluation process. Students are encouraged to prepare thoroughly and perform to the best of their abilities.
    `,
    schedule: [
      {
        day: "Exam Day",
        date: "December 11, 2025",
        events: ["9:00 AM - Exam Begins", "12:00 PM - Exam Ends"],
      },
    ],
  },
  {
    id: 15,
    title: "3rd PTI",
    slug: "3rd-pti",
    date: "2025-12-26",
    time: "10:00 AM - 12:00 PM",
    venue: "School Premises",
    category: "Community",
    image: "/images/foto8.jpg",
    description: `
      The 3rd Parent-Teacher Interaction (PTI) is an event where parents and teachers discuss the academic progress and behavior of students. The event aims to foster a collaborative relationship between parents and teachers to support the academic and personal development of students.
    `,
    schedule: [
      {
        day: "PTI Day",
        date: "December 26, 2025",
        events: [
          "10:00 AM - Welcome and Introduction",
          "10:30 AM - Parent-Teacher Discussions",
          "11:30 AM - Feedback and Q&A",
        ],
      },
    ],
  },
  {
    id: 16,
    title: "Sports Meet",
    slug: "sports-meet",
    date: "2025-12-22",
    time: "9:00 AM - 3:00 PM",
    venue: "Sports Complex",
    category: "Sports",
    image: "/images/foto14.jpg",
    description: `
      Sports Meet is an annual event that encourages physical fitness and team spirit among students. Students participate in various sports activities and competitions, promoting healthy competition and collaboration. The event includes sports activities, award ceremonies, and discussions about the importance of physical fitness.
    `,
    schedule: [
      {
        day: "Sports Meet Day",
        date: "December 22, 2025",
        events: [
          "9:00 AM - Welcome and Introduction",
          "9:30 AM - Sports Activities Begin",
          "12:30 PM - Award Ceremony",
        ],
      },
    ],
  },
  {
    id: 17,
    title: "Annual Exhibition",
    slug: "annual-exhibition",
    date: "2026-01-17",
    time: "10:00 AM - 12:00 PM",
    venue: "School Premises",
    category: "Community",
    image: "/images/foto19.jpg",
    description: `
      The Annual Exhibition is an event where students showcase their projects, artworks, and achievements from the academic year. The event includes exhibitions, presentations, and discussions about the students' work. The event aims to promote creativity, innovation, and academic excellence among students.
    `,
    schedule: [
      {
        day: "Annual Exhibition Day",
        date: "January 17, 2026",
        events: [
          "10:00 AM - Welcome and Introduction",
          "10:30 AM - Exhibitions and Presentations",
          "11:30 AM - Discussions and Q&A",
        ],
      },
    ],
  },
  {
    id: 18,
    title: "Annual Function",
    slug: "annual-function",
    date: "2026-02-16",
    time: "10:00 AM - 12:00 PM",
    venue: "Auditorium",
    category: "Cultural",
    image: "/images/foto16.jpg",
    description: `
      The Annual Function is an event that celebrates the achievements and accomplishments of the school community. The event includes cultural performances, award ceremonies, and speeches by students and teachers. The event aims to promote a sense of community and pride among students and teachers.
    `,
    schedule: [
      {
        day: "Annual Function Day",
        date: "February 16, 2026",
        events: [
          "10:00 AM - Welcome and Introduction",
          "10:30 AM - Cultural Performances",
          "11:30 AM - Award Ceremony",
        ],
      },
    ],
  },
  {
    id: 19,
    title: "Night out (MS and Sr.)",
    slug: "night-out-ms-sr",
    date: "2026-02-22",
    time: "6:00 PM - 9:00 PM",
    venue: "School Premises",
    category: "Community",
    image: "/images/foto9.jpg",
    description: `
      Night out is an event where Middle School and Senior School students participate in various activities and games during the evening. The event aims to promote team spirit, collaboration, and a sense of community among students. The event includes games, activities, and discussions about the importance of teamwork and collaboration.
    `,
    schedule: [
      {
        day: "Night Out Day",
        date: "February 22, 2026",
        events: [
          "6:00 PM - Welcome and Introduction",
          "6:30 PM - Games and Activities Begin",
          "8:30 PM - Closing Remarks",
        ],
      },
    ],
  },
  {
    id: 20,
    title: "Final Exam",
    slug: "final-exam",
    date: "2026-03-19",
    time: "All Day",
    venue: "School Premises",
    category: "Academic",
    image: "/images/foto13.jpg",
    description: `
      The Final Exam is conducted to assess the academic progress of students at the end of the academic year. The exams cover various subjects and are an important part of the academic evaluation process. Students are encouraged to prepare thoroughly and perform to the best of their abilities.
    `,
    schedule: [
      {
        day: "Exam Day",
        date: "March 19, 2026",
        events: ["9:00 AM - Exam Begins", "12:00 PM - Exam Ends"],
      },
    ],
  },
  {
    id: 21,
    title: "Final PTI",
    slug: "final-pti",
    date: "2026-03-26",
    time: "10:00 AM - 12:00 PM",
    venue: "School Premises",
    category: "Community",
    image: "/images/foto3.jpg",
    description: `
      The Final Parent-Teacher Interaction (PTI) is an event where parents and teachers discuss the academic progress and behavior of students at the end of the academic year. The event aims to foster a collaborative relationship between parents and teachers to support the academic and personal development of students.
    `,
    schedule: [
      {
        day: "PTI Day",
        date: "March 26, 2026",
        events: [
          "10:00 AM - Welcome and Introduction",
          "10:30 AM - Parent-Teacher Discussions",
          "11:30 AM - Feedback and Q&A",
        ],
      },
    ],
  },
];

export const Eventcategories = [
  "All",
  "Academic",
  "Sports",
  "Cultural",
  "Community",
];

export const latestEvents = (() => {
  const now = new Date();
  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= now) // Only future events
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Sort soonest first

  // If fewer than 3 upcoming events, add the most recent past events
  if (upcomingEvents.length < 3) {
    const pastEvents = events
      .filter((event) => new Date(event.date) < now)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort newest first

    return [
      ...upcomingEvents,
      ...pastEvents.slice(0, 3 - upcomingEvents.length),
    ];
  }

  return upcomingEvents.slice(0, 4);
})();
