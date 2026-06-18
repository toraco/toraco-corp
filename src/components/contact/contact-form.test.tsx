import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@marsidev/react-turnstile', () => ({
  Turnstile: ({ onSuccess }: { onSuccess: (token: string) => void }) => (
    <button type="button" onClick={() => onSuccess('test-token')}>
      turnstile-complete
    </button>
  ),
}));

import { ContactForm } from './contact-form';

afterEach(() => {
  vi.unstubAllGlobals();
});

function fillRequiredFields() {
  fireEvent.change(screen.getByLabelText(/お名前/), {
    target: { value: '山田太郎' },
  });
  fireEvent.change(screen.getByLabelText(/メールアドレス/), {
    target: { value: 'taro@example.com' },
  });
  fireEvent.change(screen.getByLabelText(/お問い合わせ種別/), {
    target: { value: '開発のご相談' },
  });
  fireEvent.change(screen.getByLabelText(/お問い合わせ内容/), {
    target: { value: 'よろしくお願いします' },
  });
}

describe('ContactForm', () => {
  it('必須項目・種別5選択肢・送信ボタンを描画する', () => {
    render(<ContactForm turnstileSiteKey="key" />);
    expect(screen.getByLabelText(/お名前/)).toBeInTheDocument();
    expect(screen.getByLabelText(/メールアドレス/)).toBeInTheDocument();
    expect(screen.getByLabelText(/お問い合わせ種別/)).toBeInTheDocument();
    expect(screen.getByLabelText(/お問い合わせ内容/)).toBeInTheDocument();
    for (const type of [
      '開発のご相談',
      'テスト自動化',
      'AI駆動開発',
      '採用・協業',
      'その他',
    ]) {
      expect(screen.getByRole('option', { name: type })).toBeInTheDocument();
    }
    expect(
      screen.getByRole('button', { name: '送信する' })
    ).toBeInTheDocument();
  });

  it('Turnstile 未完了では送信をブロックする', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    render(<ContactForm turnstileSiteKey="key" />);
    fillRequiredFields();
    fireEvent.click(screen.getByRole('button', { name: '送信する' }));
    expect(
      await screen.findByText('認証を完了してください。')
    ).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('送信中はボタンを無効化する', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => new Promise(() => {}))
    );
    render(<ContactForm turnstileSiteKey="key" />);
    fillRequiredFields();
    fireEvent.click(screen.getByText('turnstile-complete'));
    fireEvent.click(screen.getByRole('button', { name: '送信する' }));
    expect(
      await screen.findByRole('button', { name: '送信中…' })
    ).toBeDisabled();
  });

  it('成功時に成功メッセージを表示する', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response(JSON.stringify({ ok: true })))
    );
    render(<ContactForm turnstileSiteKey="key" />);
    fillRequiredFields();
    fireEvent.click(screen.getByText('turnstile-complete'));
    fireEvent.click(screen.getByRole('button', { name: '送信する' }));
    expect(await screen.findByRole('status')).toHaveTextContent(
      'お問い合わせありがとうございます'
    );
  });

  it('検証エラー時にフィールドエラーを表示する', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(
        async () =>
          new Response(
            JSON.stringify({
              ok: false,
              fieldErrors: {
                email: 'メールアドレスの形式が正しくありません',
              },
            }),
            { status: 400 }
          )
      )
    );
    render(<ContactForm turnstileSiteKey="key" />);
    fillRequiredFields();
    fireEvent.click(screen.getByText('turnstile-complete'));
    fireEvent.click(screen.getByRole('button', { name: '送信する' }));
    expect(
      await screen.findByText('メールアドレスの形式が正しくありません')
    ).toBeInTheDocument();
  });
});
