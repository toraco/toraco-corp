import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import WorkDetailPage from './page';

describe('WorkDetailPage', () => {
  it('匿名事例の詳細（タイトル・課題・非公開バッジ）を描画する', async () => {
    render(
      await WorkDetailPage({
        params: Promise.resolve({ slug: 'hospitality-pms' }),
      })
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      '宿泊施設向け 予約・施設管理プラットフォーム'
    );
    expect(screen.getByText('課題')).toBeInTheDocument();
    expect(screen.getByText('非公開事例')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /https?:\/\// })).toBeNull();
  });

  it('未知の slug では notFound を呼ぶ（例外を投げる）', async () => {
    await expect(
      WorkDetailPage({ params: Promise.resolve({ slug: 'unknown-slug' }) })
    ).rejects.toThrow();
  });
});
