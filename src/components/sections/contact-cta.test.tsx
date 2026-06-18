import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ContactCTA } from './contact-cta';

describe('ContactCTA', () => {
  it('お問い合わせページへの導線を描画する', () => {
    render(<ContactCTA />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'お問い合わせ' })).toHaveAttribute(
      'href',
      '/contact'
    );
  });
});
