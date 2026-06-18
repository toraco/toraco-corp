import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { company } from '@/content/company';

import AboutPage from './page';

describe('AboutPage', () => {
  it('ミッション・会社概要（資本金700万円）・代表者を描画する', () => {
    render(<AboutPage />);
    expect(screen.getByText(company.mission)).toBeInTheDocument();
    expect(screen.getByText('700万円')).toBeInTheDocument();
    expect(screen.getByText(/Inagaki Takaaki/)).toBeInTheDocument();
  });
});
