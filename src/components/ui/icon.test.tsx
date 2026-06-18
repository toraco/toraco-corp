import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Icon } from './icon';

describe('Icon', () => {
  it('指定した lucide アイコンを svg として描画する', () => {
    const { container } = render(<Icon name="Code2" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('未知のアイコン名では何も描画しない', () => {
    const { container } = render(<Icon name="NotARealIcon" />);
    expect(container.querySelector('svg')).toBeNull();
  });
});
