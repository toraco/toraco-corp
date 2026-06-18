import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { getNewsList } from '@/content/news';

import NewsPage from './page';

describe('NewsPage', () => {
  it('お知らせ一覧を描画する', () => {
    render(<NewsPage />);
    const latest = getNewsList()[0];
    expect(screen.getByText(latest.title)).toBeInTheDocument();
  });
});
