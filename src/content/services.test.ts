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
      'test-automation',
      'ai-driven-development',
      'monitoring-automation',
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

  it('Web高速化はサービスから除外されている', () => {
    expect(getServiceBySlug('web-performance')).toBeUndefined();
  });

  it('テスト自動化は LIFF / LINE ミニアプリを説明文に含まない', () => {
    const testAutomation = getServiceBySlug('test-automation');
    expect(testAutomation?.description).not.toMatch(/LIFF|LINE ミニアプリ/);
  });

  it('テスト自動化は匿名実例（薬局向け / 手動QA 約66%削減）を持つ', () => {
    const testAutomation = getServiceBySlug('test-automation');
    expect(testAutomation?.examples?.length).toBeGreaterThan(0);
    const text = testAutomation?.examples
      ?.map((e) => e.title + e.description)
      .join(' ');
    expect(text).toContain('66%');
    expect(text).toContain('薬局');
  });

  it('AI駆動開発は基盤構築・コンサルティング方針を示す', () => {
    const ai = getServiceBySlug('ai-driven-development');
    const text =
      (ai?.description ?? '') +
      (ai?.features.map((f) => f.title + f.description).join(' ') ?? '');
    expect(text).toContain('基盤');
    expect(text).toContain('コンサル');
  });

  it('運用監視自動化が etoe の導入事例を持つ', () => {
    const monitoring = getServiceBySlug('monitoring-automation');
    expect(monitoring).toBeDefined();
    expect(monitoring?.examples?.length).toBeGreaterThan(0);
    const exampleText =
      monitoring?.examples?.map((e) => e.title).join(' ') ?? '';
    expect(exampleText).toContain('etoe');
    expect(monitoring?.workSlugs).toContain('etoe');
  });

  it('getServiceBySlug は未知 slug で undefined を返す', () => {
    expect(getServiceBySlug('unknown-slug')).toBeUndefined();
  });
});
