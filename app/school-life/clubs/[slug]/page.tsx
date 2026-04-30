import ClubDetailPageClient from "./ClubDetailPageClient";
import { clubs as fallbackClubs } from "../ClubData";

export async function generateStaticParams() {
  return fallbackClubs.map((club) => ({
    slug: club.slug,
  }));
}

export default function Page({ params }: { params: { slug: string } }) {
  return <ClubDetailPageClient slug={params.slug} />;
}
