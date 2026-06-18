import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Header } from './header';

describe('Header', () => {
  it('ロゴとナビ（Services/Works/About/News/Contact）を描画する', () => {
    render(<Header />);
    for (const label of ['Services', 'Works', 'About', 'News', 'Contact']) {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument();
    }
  });

  it('モバイルメニューを開くとナビが表示される', async () => {
    render(<Header />);
    fireEvent.click(screen.getByRole('button', { name: 'メニューを開く' }));
    expect(await screen.findByText('メニュー')).toBeInTheDocument();
  });
});
