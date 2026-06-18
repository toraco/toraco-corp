import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import type { News } from '@/domains/news';
import { formatDate } from '@/utils/date';

const linkClassName =
  'flex flex-col gap-1 py-4 transition-colors hover:text-brand-blue sm:flex-row sm:items-center sm:gap-4';

export function NewsList({ items }: { items: News[] }) {
  if (items.length === 0) {
    return (
      <p className="text-muted-foreground">現在、お知らせはありません。</p>
    );
  }

  return (
    <ul className="flex flex-col divide-y">
      {items.map((news) => (
        <li key={news.slug}>
          <Link href={`/news/${news.slug}`} className={linkClassName}>
            <time
              dateTime={news.publishedAt}
              className="shrink-0 text-sm tabular-nums text-muted-foreground"
            >
              {formatDate(news.publishedAt)}
            </time>
            <Badge variant="brand" className="w-fit">
              {news.category}
            </Badge>
            <span className="font-medium">{news.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
