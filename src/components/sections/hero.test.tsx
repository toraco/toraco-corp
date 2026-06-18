import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Hero } from './hero';

describe('Hero', () => {
  it('見出しと CTA を描画する', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /やりたい/
    );
    const contact = screen.getByRole('link', { name: 'お問い合わせ' });
    expect(contact).toHaveAttribute('href', '/contact');
    expect(screen.getByRole('link', { name: 'サービスを見る' })).toHaveAttribute(
      'href',
      '/services'
    );
  });
});
