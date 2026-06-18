import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { works } from '@/content/works';

import { WorksExcerpt } from './works-excerpt';

describe('WorksExcerpt', () => {
  it('事例3件のタイトルを描画する', () => {
    render(<WorksExcerpt />);
    for (const work of works) {
      expect(screen.getByText(work.title)).toBeInTheDocument();
    }
  });

  it('一覧ページへの導線を持つ', () => {
    render(<WorksExcerpt />);
    expect(screen.getByRole('link', { name: 'すべて見る' })).toHaveAttribute(
      'href',
      '/works'
    );
  });
});
