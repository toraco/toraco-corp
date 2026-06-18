import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Badge } from './badge';

describe('Badge', () => {
  it('テキストを描画する', () => {
    render(<Badge>新着</Badge>);
    expect(screen.getByText('新着')).toBeInTheDocument();
  });

  it('variant に応じたクラスを適用する', () => {
    render(<Badge variant="brand">ブランド</Badge>);
    expect(screen.getByText('ブランド').className).toContain('bg-accent');
  });
});
