import type { News } from '@/domains/news';

// 記事は `src/content/news/<slug>.md`（frontmatter + Markdown 本文）で管理し、
// ビルド時に `scripts/generate-news-data.mjs` が JSON へ変換する。
// Cloudflare Workers には src の .md が無く実行時 fs が使えないため、
// 生成済み JSON をバンドルへインライン化して取り回す。
import newsData from './news.generated.json';

const allNews = newsData as News[];

/** 公開日（publishedAt）の降順で一覧を返す */
export const getNewsList = (): News[] =>
  [...allNews].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

/** slug に一致する記事を返す。無ければ null */
export const getNewsBySlug = (slug: string): News | null =>
  allNews.find((news) => news.slug === slug) ?? null;
