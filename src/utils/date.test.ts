import { describe, expect, it } from 'vitest';

import { formatDate } from './date';

describe('formatDate', () => {
  it('ISO 文字列を日本語の年月日に整形する', () => {
    expect(formatDate('2025-01-30T12:00:00.000Z')).toBe('2025年1月30日');
  });
});
