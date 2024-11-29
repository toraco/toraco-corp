import Image from 'next/image';

import { Typography } from '@/components/ui/Typography';
import type { News } from '@/domains/news';
import { formatDate } from '@/utils/date';

import styles from './NewsList.module.scss';

type NewsItemProps = {
  news: News;
};

export const NewsItem = ({ news }: NewsItemProps) => {
  return (
    <article className={styles.newsItem}>
      <div className={styles.imageWrapper}>
        {news.thumbnail && (
          <Image
            src={news.thumbnail.url}
            alt={news.title}
            fill
            unoptimized
            className={styles.thumbnail}
            priority={true}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
      </div>
      <div className={styles.content}>
        <Typography variant="h2" className={styles.title}>
          {news.title}
        </Typography>
        <div className={styles.meta}>
          <Typography variant="span" className={styles.category}>
            <i className="ri-folder-line" /> {news.category.name}
          </Typography>
          <Typography variant="span" className={styles.date}>
            <i className="ri-time-line" /> {formatDate(news.published_at)}
          </Typography>
        </div>
      </div>
    </article>
  );
};
