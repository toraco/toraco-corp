import { afterEach, describe, expect, it, vi } from 'vitest';

import { verifyTurnstile } from './turnstile';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('verifyTurnstile', () => {
  it('成功レスポンスで success:true を返す', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response(JSON.stringify({ success: true })))
    );
    const result = await verifyTurnstile({ token: 't', secret: 's' });
    expect(result.success).toBe(true);
  });

  it('失敗レスポンスで success:false と errorCodes を返す', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(
        async () =>
          new Response(
            JSON.stringify({
              success: false,
              'error-codes': ['invalid-input-response'],
            })
          )
      )
    );
    const result = await verifyTurnstile({ token: 't', secret: 's' });
    expect(result.success).toBe(false);
    expect(result.errorCodes).toContain('invalid-input-response');
  });

  it('siteverify エンドポイントへ secret と response を POST する', async () => {
    const fetchMock = vi.fn(
      async () => new Response(JSON.stringify({ success: true }))
    );
    vi.stubGlobal('fetch', fetchMock);
    await verifyTurnstile({ token: 'my-token', secret: 'my-secret' });

    const [url, init] = fetchMock.mock.calls[0] as unknown as [
      string,
      RequestInit,
    ];
    expect(url).toBe(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify'
    );
    expect(init.method).toBe('POST');
    const body = init.body as URLSearchParams;
    expect(body.get('secret')).toBe('my-secret');
    expect(body.get('response')).toBe('my-token');
  });

  it('非200では success:false を返す', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response('', { status: 500 }))
    );
    const result = await verifyTurnstile({ token: 't', secret: 's' });
    expect(result.success).toBe(false);
  });
});
