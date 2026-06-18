import Link from 'next/link';

import { NewsList } from '@/components/news/news-list';
import { Button } from '@/components/ui/button';
import { getNewsList } from '@/content/news';

import { Section, SectionHeading } from './section';

export function NewsPreview() {
  const items = getNewsList().slice(0, 3);

  return (
    <Section id="news" className="bg-muted/30">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading en="News" ja="お知らせ" />
        <Button asChild variant="link">
          <Link href="/news">すべて見る</Link>
        </Button>
      </div>
      <div className="mt-6">
        <NewsList items={items} />
      </div>
    </Section>
  );
}
