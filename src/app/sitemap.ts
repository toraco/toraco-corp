import type { MetadataRoute } from 'next';

import { getNewsList } from '@/content/news';
import { works } from '@/content/works';

const BASE_URL = 'https://toraco.jp';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['', '/services', '/works', '/about', '/news', '/contact'];

  const staticRoutes = staticPaths.map((path) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const workRoutes = works.map((work) => ({
    url: `${BASE_URL}/works/${work.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const newsRoutes = getNewsList().map((news) => ({
    url: `${BASE_URL}/news/${news.slug}`,
    lastModified: news.publishedAt,
    changeFrequency: 'yearly' as const,
    priority: 0.4,
  }));

  return [...staticRoutes, ...workRoutes, ...newsRoutes];
}
