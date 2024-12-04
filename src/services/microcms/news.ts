import { client } from './client';
import { isConfigValid } from './config';
import type { News } from '@/domains/news';

const DEFAULT_LIST_RESPONSE = {
  contents: [],
  totalCount: 0,
  offset: 0,
  limit: 10,
};

export type NewsListResponse = {
  contents: News[];
  totalCount: number;
  offset: number;
  limit: number;
};

export const getNewsList = async (): Promise<NewsListResponse> => {
  if (!isConfigValid() || !client) {
    console.error('microCMS configuration is missing');
    return DEFAULT_LIST_RESPONSE;
  }

  try {
    const response = await client.getList<News>({
      endpoint: 'news',
      queries: { orders: '-publishedAt' },
    });
    return response;
  } catch (error) {
    console.error('Error fetching news list:', error);
    return DEFAULT_LIST_RESPONSE;
  }
};

export const getNewsDetail = async (
  contentId: string
): Promise<News | null> => {
  if (!isConfigValid() || !client) {
    console.error('microCMS configuration is missing');
    return null;
  }

  try {
    const response = await client.get<News>({
      endpoint: 'news',
      contentId,
    });
    return response;
  } catch (error) {
    console.error('Error fetching news detail:', error);
    return null;
  }
};
