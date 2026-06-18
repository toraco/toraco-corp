import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import WorkDetailPage from './page';

describe('WorkDetailPage', () => {
  it('etoe 事例の詳細（タイトル・課題・公開URL）を描画する', async () => {
    render(await WorkDetailPage({ params: Promise.resolve({ slug: 'etoe' }) }));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('etoe');
    expect(screen.getByText('課題')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'https://etoehotel.com' })
    ).toHaveAttribute('href', 'https://etoehotel.com');
  });

  it('未知の slug では notFound を呼ぶ（例外を投げる）', async () => {
    await expect(
      WorkDetailPage({ params: Promise.resolve({ slug: 'unknown-slug' }) })
    ).rejects.toThrow();
  });
});
