import useSWR from 'swr';

import type { News } from '@/domains/news';
import { getNewsDetail } from '@/services/microcms';

export const useNewsDetail = (id: string) => {
  const { data, error, isLoading } = useSWR<News>(
    id ? `news-detail-${id}` : null,
    () => getNewsDetail(id),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    news: data,
    isLoading,
    error,
  };
};
