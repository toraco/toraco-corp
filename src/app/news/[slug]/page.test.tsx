import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import NewsDetailPage, {
  generateMetadata,
  generateStaticParams,
} from './page';

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

  it('本文を Markdown として描画する（外部リンクが要素化される）', async () => {
    render(
      await NewsDetailPage({
        params: Promise.resolve({ slug: 'schoo-lecture' }),
      })
    );
    // 生テキストではなく Markdown 由来の <a>（外部リンクは別タブ）が生成される。
    const courseLink = screen
      .getAllByRole('link')
      .find(
        (link) =>
          link.getAttribute('href') === 'https://schoo.jp/course/7546'
      );
    expect(courseLink).toBeDefined();
    expect(courseLink).toHaveAttribute('target', '_blank');
    expect(courseLink).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('generateMetadata の description は Markdown 記号を含まない', async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ slug: 'schoo-lecture' }),
    });
    expect(meta.description).toBeTruthy();
    expect(meta.description).not.toMatch(/[*[\]]/);
  });

  it('未知の slug では notFound を呼ぶ（例外を投げる）', async () => {
    await expect(
      NewsDetailPage({ params: Promise.resolve({ slug: 'unknown-slug' }) })
    ).rejects.toThrow();
  });

  it('Schoo の slug で静的パスを生成し詳細を描画する', async () => {
    const slugs = generateStaticParams().map((param) => param.slug);
    expect(slugs).toContain('schoo-lecture');
    render(
      await NewsDetailPage({
        params: Promise.resolve({ slug: 'schoo-lecture' }),
      })
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Schoo'
    );
  });
});
