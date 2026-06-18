import { describe, expect, it } from 'vitest';

import { getServiceBySlug, services } from './services';

describe('services コンテンツ', () => {
  it('サービスが5件ある', () => {
    expect(services).toHaveLength(5);
  });

  it('想定する5つのサービスを含む', () => {
    const slugs = services.map((service) => service.slug);
    expect(slugs).toEqual([
      'contract-development',
      'lab-development',
      'web-performance',
      'test-automation',
      'ai-driven-development',
    ]);
  });

  it('各サービスが必須項目（name/tagline/description/icon/features）を持つ', () => {
    for (const service of services) {
      expect(service.name).toBeTruthy();
      expect(service.tagline).toBeTruthy();
      expect(service.description).toBeTruthy();
      expect(service.icon).toBeTruthy();
      expect(service.features.length).toBeGreaterThan(0);
    }
  });

  it('テスト自動化は匿名実例（手動QA 約66%削減）を持つ', () => {
    const testAutomation = getServiceBySlug('test-automation');
    expect(testAutomation?.examples?.length).toBeGreaterThan(0);
    const text = testAutomation?.examples?.map((e) => e.description).join(' ');
    expect(text).toContain('66%');
  });

  it('getServiceBySlug は未知 slug で undefined を返す', () => {
    expect(getServiceBySlug('unknown-slug')).toBeUndefined();
  });
});
