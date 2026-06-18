import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { services } from '@/content/services';

import { ServicesOverview } from './services-overview';

describe('ServicesOverview', () => {
  it('5つのサービスを描画する', () => {
    render(<ServicesOverview />);
    for (const service of services) {
      expect(screen.getByText(service.name)).toBeInTheDocument();
    }
  });
});
