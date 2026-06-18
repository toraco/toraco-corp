// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

import { handleContact } from '@/services/contact';

import { POST } from './route';

vi.mock('@opennextjs/cloudflare', () => ({
  getCloudflareContext: vi.fn(async () => ({
    env: {
      TURNSTILE_SECRET_KEY: 'secret',
      SLACK_WEBHOOK_URL: 'https://hooks.slack.com/services/x',
      SES_ACCESS_KEY_ID: 'AK',
      SES_SECRET_ACCESS_KEY: 'SK',
      SES_REGION: 'ap-northeast-1',
      SES_FROM_ADDRESS: 'noreply@toraco.jp',
    },
  })),
}));

vi.mock('@/services/contact', () => ({ handleContact: vi.fn() }));

function makeRequest(body: string) {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body,
  });
}

describe('POST /api/contact', () => {
  it('不正な JSON は 400 を返す', async () => {
    const response = await POST(makeRequest('not json'));
    expect(response.status).toBe(400);
    const data = (await response.json()) as { error: string };
    expect(data.error).toBe('invalid_json');
  });

  it('検証失敗時は handleContact の status をそのまま返す', async () => {
    vi.mocked(handleContact).mockResolvedValue({
      ok: false,
      status: 400,
      error: 'validation',
      fieldErrors: { name: 'お名前を入力してください' },
    });
    const response = await POST(makeRequest(JSON.stringify({})));
    expect(response.status).toBe(400);
    const data = (await response.json()) as {
      fieldErrors: { name: string };
    };
    expect(data.fieldErrors.name).toBe('お名前を入力してください');
  });

  it('成功時は 200 を返す', async () => {
    vi.mocked(handleContact).mockResolvedValue({ ok: true });
    const response = await POST(makeRequest(JSON.stringify({ name: 'a' })));
    expect(response.status).toBe(200);
    const data = (await response.json()) as { ok: boolean };
    expect(data.ok).toBe(true);
  });
});
