import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Footer } from './footer';

describe('Footer', () => {
  it('会社名とコピーライトを描画する', () => {
    render(<Footer />);
    expect(screen.getByText('toraco株式会社')).toBeInTheDocument();
    expect(screen.getByText(/©/)).toBeInTheDocument();
  });

  it('SNS リンク（YouTube / X / GitHub / Zenn）を描画する', () => {
    render(<Footer />);
    for (const label of ['YouTube', 'X', 'GitHub', 'Zenn']) {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument();
    }
  });
});
