import { describe, expect, it } from 'vitest';

import { getNewsBySlug, getNewsList } from './news';

describe('news コンテンツ', () => {
  it('publishedAt の降順で一覧を返す', () => {
    const list = getNewsList();
    const dates = list.map((news) => news.publishedAt);
    const sorted = [...dates].sort((a, b) => (a < b ? 1 : -1));
    expect(dates).toEqual(sorted);
    expect(list.length).toBeGreaterThan(0);
  });

  it('getNewsBySlug は該当記事を返す', () => {
    const news = getNewsBySlug('corporate-site-renewal');
    expect(news).not.toBeNull();
    expect(news?.title).toBeTruthy();
  });

  it('getNewsBySlug は未知 slug で null を返す', () => {
    expect(getNewsBySlug('unknown-slug')).toBeNull();
  });
});
