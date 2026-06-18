import { describe, expect, it, vi } from 'vitest';

import { handleContact, type ContactConfig } from './handle-contact';
import { sendAutoReply } from './ses';
import { notifySlack } from './slack';
import { verifyTurnstile } from './turnstile';

vi.mock('./turnstile', () => ({ verifyTurnstile: vi.fn() }));
vi.mock('./slack', () => ({ notifySlack: vi.fn() }));
vi.mock('./ses', () => ({ sendAutoReply: vi.fn() }));

const config: ContactConfig = {
  turnstileSecret: 'secret',
  slackWebhookUrl: 'https://hooks.slack.com/services/x',
  ses: {
    accessKeyId: 'AK',
    secretAccessKey: 'SK',
    region: 'ap-northeast-1',
    fromAddress: 'noreply@toraco.jp',
  },
};

const validData = {
  name: '山田太郎',
  email: 'taro@example.com',
  type: '開発のご相談',
  message: 'よろしくお願いします',
  turnstileToken: 'token',
};

describe('handleContact', () => {
  it('検証失敗で400を返し、Turnstile/Slack を呼ばない', async () => {
    const result = await handleContact({ ...validData, name: '' }, config);
    expect(result).toMatchObject({ ok: false, status: 400, error: 'validation' });
    expect(verifyTurnstile).not.toHaveBeenCalled();
    expect(notifySlack).not.toHaveBeenCalled();
  });

  it('Turnstile 失敗で400を返し、Slack/SES を呼ばない', async () => {
    vi.mocked(verifyTurnstile).mockResolvedValue({ success: false });
    const result = await handleContact(validData, config);
    expect(result).toMatchObject({ ok: false, status: 400, error: 'turnstile' });
    expect(notifySlack).not.toHaveBeenCalled();
    expect(sendAutoReply).not.toHaveBeenCalled();
  });

  it('Slack 失敗で502を返し、SES を呼ばない', async () => {
    vi.mocked(verifyTurnstile).mockResolvedValue({ success: true });
    vi.mocked(notifySlack).mockResolvedValue(false);
    const result = await handleContact(validData, config);
    expect(result).toMatchObject({ ok: false, status: 502, error: 'notify' });
    expect(sendAutoReply).not.toHaveBeenCalled();
  });

  it('全成功で ok:true を返す', async () => {
    vi.mocked(verifyTurnstile).mockResolvedValue({ success: true });
    vi.mocked(notifySlack).mockResolvedValue(true);
    vi.mocked(sendAutoReply).mockResolvedValue(true);
    const result = await handleContact(validData, config);
    expect(result).toEqual({ ok: true });
  });

  it('SES 失敗でも ok:true + warning を返す（best-effort）', async () => {
    vi.mocked(verifyTurnstile).mockResolvedValue({ success: true });
    vi.mocked(notifySlack).mockResolvedValue(true);
    vi.mocked(sendAutoReply).mockResolvedValue(false);
    const result = await handleContact(validData, config);
    expect(result).toEqual({ ok: true, warning: 'autoreply_failed' });
  });
});
