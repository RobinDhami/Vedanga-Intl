import { events } from "@/data/dummy";
import { EventDetail } from "./EventDetail";

export async function generateStaticParams() {
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const event = events.find((item) => item.slug === params.slug);

  if (!event) {
    return <div>Event not found</div>;
  }

  return <EventDetail event={event} />;
}
