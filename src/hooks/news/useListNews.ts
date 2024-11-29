import useSWR from 'swr';

import type { News } from '@/domains/news';
import { getNewsList } from '@/services/microcms';

export type NewsListResponse = {
  contents: News[];
  totalCount: number;
  offset: number;
  limit: number;
};

export const useListNews = () => {
  const { data, error, isLoading } = useSWR<NewsListResponse>(
    'news-list',
    getNewsList,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    news: data?.contents ?? [],
    totalCount: data?.totalCount ?? 0,
    isLoading,
    error,
  };
};
