import { Section } from '@/components/ui/Section';
import { Typography } from '@/components/ui/Typography';
import type { News } from '@/domains/news';

import { NewsItem } from './NewsItem';
import styles from './NewsList.module.scss';

type NewsListProps = {
  news: News[];
};

export const NewsList = ({ news }: NewsListProps) => {
  return (
    <Section id="news" title="News">
      <div className={styles.container}>
        {news.map((item) => (
          <NewsItem key={item.id} news={item} />
        ))}
      </div>
    </Section>
  );
};
