import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { company } from '@/content/company';

import { AboutExcerpt } from './about-excerpt';

describe('AboutExcerpt', () => {
  it('ミッションと会社概要への導線を描画する', () => {
    render(<AboutExcerpt />);
    expect(screen.getByText(company.mission)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: '会社概要を見る' })
    ).toHaveAttribute('href', '/about');
  });
});
