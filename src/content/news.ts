import fs from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';

import type { News, NewsCategory } from '@/domains/news';

// 静的 News。記事は `src/content/news/<slug>.md`（frontmatter + Markdown 本文）で管理する。
// 全 News ルートは静的生成のため、fs 読込・frontmatter parse はビルド時/テスト時のみ実行される。
const NEWS_DIR = path.join(process.cwd(), 'src/content/news');

// frontmatter の生データ（gray-matter は any を返すため、ローカルに型付けして取り回す）。
type NewsFrontmatter = {
  title: string;
  category: NewsCategory;
  publishedAt: string;
};

let cache: News[] | null = null;

/** `src/content/news` 配下の `.md` を読み、News 配列を構築する（メモ化）。 */
function loadNews(): News[] {
  if (cache) return cache;

  cache = fs
    .readdirSync(NEWS_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(NEWS_DIR, file), 'utf-8');
      const { data, content } = matter(raw);
      const fm = data as NewsFrontmatter;

      return {
        slug,
        title: String(fm.title),
        category: fm.category,
        // YAML が日付を Date 化しても文字列へ正規化する。
        publishedAt: String(fm.publishedAt),
        body: content.trim(),
      } satisfies News;
    });

  return cache;
}

/** 公開日（publishedAt）の降順で一覧を返す */
export const getNewsList = (): News[] =>
  [...loadNews()].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

/** slug に一致する記事を返す。無ければ null */
export const getNewsBySlug = (slug: string): News | null =>
  loadNews().find((news) => news.slug === slug) ?? null;
