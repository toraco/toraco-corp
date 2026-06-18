import { describe, expect, it } from 'vitest';

import { company } from './company';

describe('company コンテンツ', () => {
  it('社名・英語表記を持つ', () => {
    expect(company.name).toBe('toraco株式会社');
    expect(company.nameEn).toBe('toraco, Inc.');
  });

  it('会社概要に確定値（設立・資本金700万円・代表）を含む', () => {
    const get = (label: string) =>
      company.profile.find((row) => row.label === label)?.value;
    expect(get('設立')).toBe('2021年4月23日');
    expect(get('資本金')).toBe('700万円');
    expect(get('代表者')).toContain('稲垣 貴映');
  });

  it('従業員数は非掲載（会社概要に含めない）', () => {
    const labels = company.profile.map((row) => row.label);
    expect(labels).not.toContain('従業員数');
  });

  it('代表者のローマ字表記は Inagaki Takaaki', () => {
    expect(company.representative.nameEn).toBe('Inagaki Takaaki');
  });

  it('価値観を3つ持つ', () => {
    expect(company.values).toHaveLength(3);
  });
});
