import { describe, expect, it } from 'vitest';

import sitemap from './sitemap';

describe('sitemap', () => {
  it('主要ルート・事例・お知らせの URL を含む', () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain('https://toraco.jp');
    expect(urls).toContain('https://toraco.jp/contact');
    expect(urls).toContain('https://toraco.jp/works/etoe');
    expect(urls.some((url) => url.includes('/news/'))).toBe(true);
  });
});
