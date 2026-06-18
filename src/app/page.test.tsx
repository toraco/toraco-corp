import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Page from './page';

describe('トップページ', () => {
  it('主要セクション（Hero / Services / Works / About / News / Contact）を順に描画する', () => {
    render(<Page />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /やりたい/
    );
    expect(
      screen.getByRole('heading', { name: 'サービス' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: '開発事例' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: '会社情報' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'お知らせ' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'お気軽にご相談ください' })
    ).toBeInTheDocument();
  });
});
