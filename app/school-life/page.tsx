import Link from "next/link";

const sections = [
  {
    title: "Events",
    href: "/school-life/events",
    description: "Explore school events and community activities.",
  },
  {
    title: "Clubs",
    href: "/school-life/clubs",
    description: "Discover student clubs and organizations.",
  },
  {
    title: "Gallery",
    href: "/school-life/gallery",
    description: "Browse school moments and highlights.",
  },
  {
    title: "Videos",
    href: "/school-life/videos",
    description: "Watch stories and highlights from school life.",
  },
];

export default function SchoolLifePage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#D41D33]">School Life</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Explore the activities, clubs, gallery, and stories that shape everyday life at Vedanga.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h2 className="text-2xl font-semibold text-gray-900">{section.title}</h2>
              <p className="mt-2 text-gray-600">{section.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
