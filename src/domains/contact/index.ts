// お問い合わせのドメインモデル。

export const CONTACT_TYPES = [
  '開発のご相談',
  'テスト自動化',
  'AI駆動開発',
  '採用・協業',
  'その他',
] as const;

export type ContactType = (typeof CONTACT_TYPES)[number];

export type ContactInput = {
  name: string;
  company?: string;
  email: string;
  tel?: string;
  type: ContactType;
  message: string;
  turnstileToken: string;
};

export type ContactResult =
  | { ok: true; warning?: 'autoreply_failed' }
  | {
      ok: false;
      status: number;
      error: 'validation' | 'turnstile' | 'notify' | 'internal';
      fieldErrors?: Record<string, string>;
    };
