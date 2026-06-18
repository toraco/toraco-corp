import { afterEach, describe, expect, it, vi } from 'vitest';

import type { ContactInput } from '@/domains/contact';

import { buildSlackPayload, notifySlack } from './slack';

const input: ContactInput = {
  name: '山田太郎',
  email: 'taro@example.com',
  type: 'テスト自動化',
  message: '自動化したいです',
  turnstileToken: 'token',
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('buildSlackPayload', () => {
  it('種別・名前・メール・本文を含む', () => {
    const { text } = buildSlackPayload(input);
    expect(text).toContain('テスト自動化');
    expect(text).toContain('山田太郎');
    expect(text).toContain('taro@example.com');
    expect(text).toContain('自動化したいです');
  });

  it('会社名・電話が未指定なら未記入と表示する', () => {
    const { text } = buildSlackPayload(input);
    expect(text).toContain('（未記入）');
  });
});

describe('notifySlack', () => {
  it('webhook URL へ JSON を POST し、成功で true を返す', async () => {
    const fetchMock = vi.fn(async () => new Response('ok'));
    vi.stubGlobal('fetch', fetchMock);
    const ok = await notifySlack({
      webhookUrl: 'https://hooks.slack.com/services/x',
      input,
    });
    expect(ok).toBe(true);
    const [url, init] = fetchMock.mock.calls[0] as unknown as [
      string,
      RequestInit,
    ];
    expect(url).toBe('https://hooks.slack.com/services/x');
    expect(init.method).toBe('POST');
  });

  it('非200で false を返す', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response('', { status: 500 }))
    );
    const ok = await notifySlack({ webhookUrl: 'https://hooks', input });
    expect(ok).toBe(false);
  });
});
