import type { ContactResult } from '@/domains/contact';

import { contactSchema } from './schema';
import { sendAutoReply, type SesConfig } from './ses';
import { notifySlack } from './slack';
import { verifyTurnstile } from './turnstile';

export type ContactConfig = {
  turnstileSecret: string;
  slackWebhookUrl: string;
  ses: SesConfig;
  remoteIp?: string;
};

// 入力検証 → Turnstile 検証 → Slack 通知 → SES 自動返信 の順で処理する。
// Slack 通知を成功条件とし、SES 自動返信は best-effort（失敗しても受付は成立）。
export async function handleContact(
  data: unknown,
  config: ContactConfig
): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === 'string' && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return { ok: false, status: 400, error: 'validation', fieldErrors };
  }

  const input = parsed.data;

  const turnstile = await verifyTurnstile({
    token: input.turnstileToken,
    secret: config.turnstileSecret,
    remoteIp: config.remoteIp,
  });
  if (!turnstile.success) {
    return { ok: false, status: 400, error: 'turnstile' };
  }

  const slackOk = await notifySlack({
    webhookUrl: config.slackWebhookUrl,
    input,
  });
  if (!slackOk) {
    return { ok: false, status: 502, error: 'notify' };
  }

  const autoReplyOk = await sendAutoReply({ input, config: config.ses });
  if (!autoReplyOk) {
    return { ok: true, warning: 'autoreply_failed' };
  }

  return { ok: true };
}
