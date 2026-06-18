import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { BrandIcon } from './brand-icon';

describe('BrandIcon', () => {
  it('YouTube アイコンを role="img" と aria-label 付きで描画する', () => {
    render(<BrandIcon name="youtube" />);
    const icon = screen.getByRole('img', { name: 'YouTube' });
    expect(icon).toBeInTheDocument();
    expect(icon.tagName.toLowerCase()).toBe('svg');
  });

  it('title 指定でアクセシブルな名前を上書きできる', () => {
    render(<BrandIcon name="x" title="X（旧Twitter）" />);
    expect(
      screen.getByRole('img', { name: 'X（旧Twitter）' })
    ).toBeInTheDocument();
  });
});
