"use client";

import { useEffect, useState } from "react";

import { getNewsArticle } from "@/lib/cms-api";
import type { NewsArticle } from "@/types/cms";
import { NewsDetail } from "./NewsDetail";

export default function NewsDetailPageClient({ slug }: { slug: string }) {
  const [article, setArticle] = useState<NewsArticle | null | undefined>(undefined);

  useEffect(() => {
    void getNewsArticle(slug).then(setArticle);
  }, [slug]);

  if (article === undefined) {
    return <div className="min-h-screen flex items-center justify-center text-gray-600">Loading article…</div>;
  }

  if (!article) {
    return <div className="min-h-screen flex items-center justify-center text-gray-600">Article not found</div>;
  }

  return <NewsDetail article={article} />;
}
