import { describe, expect, it } from 'vitest';

import { toPlainText } from './markdown';

describe('toPlainText', () => {
  it('リンク・強調記号を除去してプレーン文へ変換する', () => {
    const md = 'これは [Schoo](https://schoo.jp/) の **重要** な内容です。';
    expect(toPlainText(md)).toBe('これは Schoo の 重要 な内容です。');
  });

  it('見出し・箇条書き記号を除去する', () => {
    const plain = toPlainText('# 見出し\n\n- 項目1\n- 項目2');
    expect(plain).not.toMatch(/[#*[\]]/);
    expect(plain).toContain('見出し');
    expect(plain).toContain('項目1');
  });
});
