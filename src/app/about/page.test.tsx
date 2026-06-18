import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { company } from '@/content/company';

import AboutPage from './page';

describe('AboutPage', () => {
  it('ミッション・会社概要（資本金700万円）・代表者を描画する', () => {
    render(<AboutPage />);
    expect(screen.getByText(company.mission)).toBeInTheDocument();
    expect(screen.getByText('700万円')).toBeInTheDocument();
    expect(screen.getByText(/Inagaki Takaaki/)).toBeInTheDocument();
  });

  it('Vision/価値観 セクションと3つの価値観を描画する', () => {
    render(<AboutPage />);
    expect(screen.getByText('Vision')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '価値観' })).toBeInTheDocument();
    expect(screen.getByText('Be proud')).toBeInTheDocument();
    expect(screen.getByText('Be cooperative')).toBeInTheDocument();
    expect(screen.getByText('Be independent')).toBeInTheDocument();
  });

  it('代表者セクションがプロフィール写真を描画する', () => {
    render(<AboutPage />);
    expect(screen.getByRole('img', { name: /稲垣 貴映/ })).toBeInTheDocument();
  });

  it('代表者 bio が廃止済みの記述（高速化への注力 / SIer 経歴）を含まない', () => {
    render(<AboutPage />);
    expect(screen.queryByText(/高速化/)).toBeNull();
    expect(screen.queryByText(/SIer/)).toBeNull();
  });
});
