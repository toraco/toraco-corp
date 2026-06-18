import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Markdown } from './markdown';

describe('Markdown', () => {
  it('強調（**...**）を <strong> として描画する', () => {
    render(<Markdown>{'これは **重要** な内容です。'}</Markdown>);
    expect(screen.getByText('重要').tagName).toBe('STRONG');
  });

  it('箇条書きを <li> として描画する', () => {
    render(<Markdown>{'- 一つ目\n- 二つ目'}</Markdown>);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('外部リンクは別タブ（target=_blank / rel）で描画する', () => {
    render(<Markdown>{'[Schoo の講座](https://schoo.jp/course/7546)'}</Markdown>);
    const link = screen.getByRole('link', { name: 'Schoo の講座' });
    expect(link).toHaveAttribute('href', 'https://schoo.jp/course/7546');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('内部リンクは同タブ（target なし）で描画する', () => {
    render(<Markdown>{'[お知らせ一覧](/news)'}</Markdown>);
    const link = screen.getByRole('link', { name: 'お知らせ一覧' });
    expect(link).toHaveAttribute('href', '/news');
    expect(link).not.toHaveAttribute('target');
  });
});
