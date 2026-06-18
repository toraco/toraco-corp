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

  it('価値観（Be proud 等）は表示せず、会社概要表を描画する', () => {
    render(<AboutExcerpt />);
    company.values.forEach((value) => {
      expect(screen.queryByText(value.title)).toBeNull();
    });
    const settledRow = company.profile.find((row) => row.label === '設立');
    expect(screen.getByText(settledRow!.value)).toBeInTheDocument();
  });
});
