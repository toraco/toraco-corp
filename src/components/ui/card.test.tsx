import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Card, CardContent, CardTitle } from './card';

describe('Card', () => {
  it('子要素を描画し、トークン（border / rounded / padding）を適用する', () => {
    render(
      <Card data-testid="card">
        <CardTitle>タイトル</CardTitle>
        <CardContent>本文</CardContent>
      </Card>
    );

    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();
    expect(card.className).toContain('border');
    expect(card.className).toContain('rounded-xl');
    expect(card.className).toContain('p-6');
    expect(screen.getByText('タイトル')).toBeInTheDocument();
    expect(screen.getByText('本文')).toBeInTheDocument();
  });
});
