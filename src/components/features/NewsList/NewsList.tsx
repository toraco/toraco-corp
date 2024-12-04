import styles from './NewsList.module.scss';
import { NewsItem } from '.';
import { Section } from '@/components/ui/Section';
import type { News } from '@/domains/news';

type NewsListProps = {
  news: News[];
};

const NewsList = ({ news }: NewsListProps) => {
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

export default NewsList;
