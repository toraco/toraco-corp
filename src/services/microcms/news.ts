import { createClient } from 'microcms-js-sdk';
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

export const getNewsList = async ({
  serviceDomain,
  apiKey,
}: {
  serviceDomain: string;
  apiKey: string;
}): Promise<NewsListResponse> => {
  const client = createClient({ serviceDomain, apiKey });
  if (!client) {
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

export const getNewsDetail = async ({
  contentId,
  serviceDomain,
  apiKey,
}: {
  contentId: string;
  serviceDomain: string;
  apiKey: string;
}): Promise<News | null> => {
  const client = createClient({ serviceDomain, apiKey });
  if (!client) {
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
