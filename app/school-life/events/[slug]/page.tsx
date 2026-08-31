import EventDetailPageClient from "./EventDetailPageClient";

export default function Page({ params }: { params: { slug: string } }) {
  return <EventDetailPageClient slug={params.slug} />;
}
