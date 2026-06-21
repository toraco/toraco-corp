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

  it('宿泊施設 PMS 事例は匿名で事業名・公開URL を持たない', () => {
    const pms = getWorkBySlug('hospitality-pms');
    expect(pms).toBeDefined();
    expect(pms?.isAnonymous).toBe(true);
    expect(pms?.clientName).toBeUndefined();
    expect(pms?.url).toBeUndefined();
  });

  it('全事例が事業名・固有ドメインを掲載しない', () => {
    const text = works
      .map((work) =>
        [
          work.title,
          work.summary,
          work.clientName,
          work.url,
          work.challenge,
          work.solution,
          ...work.results,
        ].join(' ')
      )
      .join(' ');
    expect(text).not.toMatch(/etoe/i);
    expect(text).not.toMatch(/etoehotel/i);
  });

  it('宿泊施設 PMS 事例は運用監視（エラー検知・AI 一次調査）の取り組みを含む', () => {
    const pms = getWorkBySlug('hospitality-pms');
    const text = [pms?.solution, ...(pms?.results ?? [])].join(' ');
    expect(text).toMatch(/運用監視|一次調査/);
    expect(pms?.serviceSlugs).toContain('monitoring-automation');
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
