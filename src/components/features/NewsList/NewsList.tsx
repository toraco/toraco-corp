import type { News } from '@/domains/news';

import { NewsItem } from './NewsItem';
import styles from './NewsList.module.scss';

type NewsListProps = {
  news: News[];
};

export const NewsList = ({ news }: NewsListProps) => {
  return (
    <div className={styles.container}>
      {news.map((item) => (
        <NewsItem key={item.id} news={item} />
      ))}
    </div>
  );
};
