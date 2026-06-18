import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Input } from './input';
import { Label } from './label';
import { Textarea } from './textarea';

describe('フォームプリミティブ', () => {
  it('Label / Input / Textarea が描画され、ラベルと関連付く', () => {
    render(
      <div>
        <Label htmlFor="name">お名前</Label>
        <Input id="name" />
        <Textarea aria-label="本文" />
      </div>
    );

    expect(screen.getByText('お名前')).toBeInTheDocument();
    expect(document.getElementById('name')?.tagName.toLowerCase()).toBe('input');
    expect(screen.getByLabelText('本文')).toBeInTheDocument();
  });
});
