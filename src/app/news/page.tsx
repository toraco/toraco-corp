import type { Metadata } from 'next';

import { NewsList } from '@/components/news/news-list';
import { Section, SectionHeading } from '@/components/sections/section';
import { getNewsList } from '@/content/news';

export const metadata: Metadata = {
  title: 'お知らせ',
  description: 'toraco株式会社からのお知らせ一覧です。',
};

export default function NewsPage() {
  return (
    <Section>
      <SectionHeading en="News" ja="お知らせ" />
      <div className="mt-8">
        <NewsList items={getNewsList()} />
      </div>
    </Section>
  );
}
