import { NewsItem } from './NewsItem';
import styles from './NewsList.module.scss';
import { Section } from '@/components/ui/Section';
import type { News } from '@/domains/news';


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
