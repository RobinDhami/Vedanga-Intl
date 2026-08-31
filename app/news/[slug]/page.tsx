import NewsDetailPageClient from "./NewsDetailPageClient";

export default function Page({ params }: { params: { slug: string } }) {
  return <NewsDetailPageClient slug={params.slug} />;
}
