// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest';

import type { ContactInput } from '@/domains/contact';

import { buildSesPayload, sendAutoReply, type SesConfig } from './ses';

const input: ContactInput = {
  name: '山田太郎',
  email: 'taro@example.com',
  type: '開発のご相談',
  message: 'よろしくお願いします',
  turnstileToken: 'token',
};

const config: SesConfig = {
  accessKeyId: 'AKIAEXAMPLE',
  secretAccessKey: 'secret-key',
  region: 'ap-northeast-1',
  fromAddress: 'noreply@toraco.jp',
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('buildSesPayload', () => {
  it('From / To / 件名 / 本文を持つ', () => {
    const payload = buildSesPayload(input, config);
    expect(payload.FromEmailAddress).toBe('noreply@toraco.jp');
    expect(payload.Destination.ToAddresses).toEqual(['taro@example.com']);
    expect(payload.Content.Simple.Subject.Data).toContain('toraco');
    expect(payload.Content.Simple.Body.Text.Data).toContain('山田太郎 様');
  });

  it('internalBcc 指定時のみ BCC を含む', () => {
    expect(
      'BccAddresses' in buildSesPayload(input, config).Destination
    ).toBe(false);
    const withBcc = buildSesPayload(input, {
      ...config,
      internalBcc: 'info@toraco.jp',
    });
    expect(withBcc.Destination.BccAddresses).toEqual(['info@toraco.jp']);
  });
});

describe('sendAutoReply', () => {
  it('SESv2 エンドポイントへ SigV4 署名付きで送る', async () => {
    const fetchMock = vi.fn(async () => new Response(null, { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    const ok = await sendAutoReply({ input, config });
    expect(ok).toBe(true);

    const [request] = fetchMock.mock.calls[0] as unknown as [Request];
    expect(request.url).toBe(
      'https://email.ap-northeast-1.amazonaws.com/v2/email/outbound-emails'
    );
    const authorization = request.headers.get('authorization') ?? '';
    expect(authorization).toContain('AWS4-HMAC-SHA256');
    expect(request.headers.get('x-amz-date')).toBeTruthy();
  });

  it('SES が非200を返すと false を返す', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response(null, { status: 400 }))
    );
    const ok = await sendAutoReply({ input, config });
    expect(ok).toBe(false);
  });
});
