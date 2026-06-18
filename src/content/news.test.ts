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

  it('frontmatter の publishedAt を文字列として読み込む（YAML 日付化を回避）', () => {
    for (const news of getNewsList()) {
      expect(typeof news.publishedAt).toBe('string');
      expect(news.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it('getNewsBySlug は該当記事を返す', () => {
    const news = getNewsBySlug('corporate-site-renewal');
    expect(news).not.toBeNull();
    expect(news?.title).toBeTruthy();
  });

  it('getNewsBySlug は未知 slug で null を返す', () => {
    expect(getNewsBySlug('unknown-slug')).toBeNull();
  });

  it('確定リスト（5件）を返し、EDD2023 / Schoo / オフィス移転を含み youtube-toragemi を含まない', () => {
    const list = getNewsList();
    expect(list).toHaveLength(5);
    const titles = list.map((news) => news.title);
    expect(titles.some((t) => t.includes('Engineer Driven Day 2023'))).toBe(
      true
    );
    expect(titles.some((t) => t.includes('Schoo'))).toBe(true);
    expect(titles.some((t) => t.includes('オフィスを移転'))).toBe(true);
    expect(titles.some((t) => t.includes('とらゼミ'))).toBe(false);
  });

  it('Schoo の記事は内部詳細として取得できる', () => {
    const schoo = getNewsBySlug('schoo-lecture');
    expect(schoo).not.toBeNull();
    expect(schoo?.title).toContain('Schoo');
  });

  it('EDD2023 の見出しは短縮版（主催者プレフィックスを含まない）', () => {
    const edd = getNewsBySlug('edd-2023-sponsor');
    expect(edd?.title).toBe(
      '"Engineer Driven Day 2023" にスポンサーとして参加します'
    );
    expect(edd?.title).not.toContain('エンジニアフレンドリーシティ');
  });
});
