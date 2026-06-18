import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import NewsDetailPage from './page';

describe('NewsDetailPage', () => {
  it('記事詳細を描画する', async () => {
    render(
      await NewsDetailPage({
        params: Promise.resolve({ slug: 'corporate-site-renewal' }),
      })
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'コーポレートサイトをリニューアルしました'
    );
  });

  it('未知の slug では notFound を呼ぶ（例外を投げる）', async () => {
    await expect(
      NewsDetailPage({ params: Promise.resolve({ slug: 'unknown-slug' }) })
    ).rejects.toThrow();
  });
});
