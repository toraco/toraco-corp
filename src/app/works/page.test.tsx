import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { works } from '@/content/works';

import WorksPage from './page';

describe('WorksPage', () => {
  it('事例3件のタイトルを描画する', () => {
    render(<WorksPage />);
    for (const work of works) {
      expect(screen.getByText(work.title)).toBeInTheDocument();
    }
  });
});
