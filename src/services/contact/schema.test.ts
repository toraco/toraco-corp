import { describe, expect, it } from 'vitest';

import { contactSchema } from './schema';

const base = {
  name: '山田太郎',
  email: 'taro@example.com',
  type: '開発のご相談',
  message: 'よろしくお願いします',
  turnstileToken: 'token',
};

describe('contactSchema', () => {
  it('必須項目が揃っていれば受理する', () => {
    expect(contactSchema.safeParse(base).success).toBe(true);
  });

  it('お名前が空だと拒否する', () => {
    expect(contactSchema.safeParse({ ...base, name: '' }).success).toBe(false);
  });

  it('不正なメール形式を拒否する', () => {
    expect(contactSchema.safeParse({ ...base, email: 'invalid' }).success).toBe(
      false
    );
  });

  it('列挙外の種別を拒否する', () => {
    expect(
      contactSchema.safeParse({ ...base, type: '存在しない種別' }).success
    ).toBe(false);
  });

  it('会社名・電話は任意（無くても受理）', () => {
    const result = contactSchema.safeParse(base);
    expect(result.success).toBe(true);
  });

  it('本文が空だと拒否する', () => {
    expect(contactSchema.safeParse({ ...base, message: '' }).success).toBe(
      false
    );
  });

  it('turnstileToken が無いと拒否する', () => {
    expect(
      contactSchema.safeParse({ ...base, turnstileToken: '' }).success
    ).toBe(false);
  });
});
