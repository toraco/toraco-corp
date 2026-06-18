import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { services } from '@/content/services';

import ServicesPage from './page';

describe('ServicesPage', () => {
  it('5つのサービスを描画する', () => {
    render(<ServicesPage />);
    for (const service of services) {
      expect(
        screen.getByRole('heading', { level: 2, name: service.name })
      ).toBeInTheDocument();
    }
  });

  it('テスト自動化の匿名実例（約66%削減）を描画する', () => {
    render(<ServicesPage />);
    expect(screen.getByText(/66%/)).toBeInTheDocument();
  });
});
