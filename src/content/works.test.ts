import { describe, expect, it } from 'vitest';

import { getWorkBySlug, works } from './works';

describe('works コンテンツ', () => {
  it('事例が3件ある', () => {
    expect(works).toHaveLength(3);
  });

  it('各事例が必須項目（slug/title/summary/techTags）を持つ', () => {
    for (const work of works) {
      expect(work.slug).toBeTruthy();
      expect(work.title).toBeTruthy();
      expect(work.summary).toBeTruthy();
      expect(work.techTags.length).toBeGreaterThan(0);
    }
  });

  it('slug は一意である', () => {
    const slugs = works.map((work) => work.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('etoe は実名・公開URL を持つ', () => {
    const etoe = getWorkBySlug('etoe');
    expect(etoe).toBeDefined();
    expect(etoe?.isAnonymous).toBe(false);
    expect(etoe?.clientName).toBe('etoe sauna & hotel');
    expect(etoe?.url).toContain('etoehotel.com');
  });

  it('etoe は運用監視（エラー検知・AI 一次調査）の取り組みを含む', () => {
    const etoe = getWorkBySlug('etoe');
    const text = [etoe?.solution, ...(etoe?.results ?? [])].join(' ');
    expect(text).toMatch(/運用監視|一次調査/);
    expect(etoe?.serviceSlugs).toContain('monitoring-automation');
  });

  it('匿名事例は isAnonymous=true で業種が特定される語を含まない', () => {
    for (const slug of ['large-scale-platform', 'd2c-multi-brand']) {
      const work = getWorkBySlug(slug);
      expect(work?.isAnonymous).toBe(true);
      expect(work?.clientName).toBeUndefined();
      const text = [
        work?.title,
        work?.summary,
        work?.challenge,
        work?.solution,
        ...(work?.results ?? []),
        ...(work?.techTags ?? []),
      ].join(' ');
      expect(text).not.toMatch(/広告|SSP|通信|WiFi|Wi-Fi/i);
    }
  });

  it('getWorkBySlug は未知 slug で undefined を返す', () => {
    expect(getWorkBySlug('unknown-slug')).toBeUndefined();
  });
});
