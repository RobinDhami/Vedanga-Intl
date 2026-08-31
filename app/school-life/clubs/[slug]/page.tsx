import ClubDetailPageClient from "./ClubDetailPageClient";

export default function Page({ params }: { params: { slug: string } }) {
  return <ClubDetailPageClient slug={params.slug} />;
}
