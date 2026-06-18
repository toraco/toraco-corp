import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { News } from '@/domains/news';

import { NewsList } from './news-list';

const sampleNews: News[] = [
  {
    slug: 'sample-1',
    title: 'サンプルのお知らせ',
    category: 'お知らせ',
    publishedAt: '2026-01-30',
    body: '本文',
  },
];

describe('NewsList', () => {
  it('記事を日付付きで描画する', () => {
    render(<NewsList items={sampleNews} />);
    expect(screen.getByText('サンプルのお知らせ')).toBeInTheDocument();
    expect(screen.getByText('2026年1月30日')).toBeInTheDocument();
  });

  it('記事が空のとき空状態を表示する', () => {
    render(<NewsList items={[]} />);
    expect(screen.getByText('現在、お知らせはありません。')).toBeInTheDocument();
  });

  it('各記事を内部詳細ページへのリンクで描画する', () => {
    render(<NewsList items={sampleNews} />);
    const link = screen.getByRole('link', { name: /サンプルのお知らせ/ });
    expect(link).toHaveAttribute('href', '/news/sample-1');
    expect(link).not.toHaveAttribute('target');
  });
});
