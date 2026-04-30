// app/news/[slug]/page.tsx (Server Component)
import { news } from "@/data/dummy";
import { NewsDetail } from "./NewsDetail";

export async function generateStaticParams() {
  return news.map((article) => ({
    slug: article.slug,
  }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const article = news.find(item => item.slug === params.slug);

  if (!article) {
    return <div>Article not found</div>;
  }

  return <NewsDetail article={article} />;
}