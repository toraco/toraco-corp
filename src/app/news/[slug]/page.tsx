import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Markdown } from '@/components/news/markdown';
import { Section } from '@/components/sections/section';
import { Badge } from '@/components/ui/badge';
import { getNewsBySlug, getNewsList } from '@/content/news';
import { formatDate } from '@/utils/date';
import { toPlainText } from '@/utils/markdown';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getNewsList().map((news) => ({ slug: news.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const news = getNewsBySlug(slug);
  if (!news) return {};
  return { title: news.title, description: toPlainText(news.body).slice(0, 80) };
}

export default async function NewsDetailPage({ params }: Params) {
  const { slug } = await params;
  const news = getNewsBySlug(slug);
  if (!news) notFound();

  return (
    <Section>
      <article className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <time
            dateTime={news.publishedAt}
            className="text-sm tabular-nums text-muted-foreground"
          >
            {formatDate(news.publishedAt)}
          </time>
          <Badge variant="brand">{news.category}</Badge>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-balance">
          {news.title}
        </h1>
        <Markdown>{news.body}</Markdown>
        <Link href="/news" className="text-brand-blue hover:underline">
          ← お知らせ一覧へ
        </Link>
      </article>
    </Section>
  );
}
