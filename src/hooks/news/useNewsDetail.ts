import useSWR from 'swr';

import type { News } from '@/domains/news';
import { getNewsDetail } from '@/services/microcms';

export const useNewsDetail = (id: string) => {
  const { data, error, isLoading } = useSWR<News | null>(
    id ? ['/news', id] : null,
    () => getNewsDetail(id)
  );

  return {
    news: data,
    isLoading,
    error,
  };
};
