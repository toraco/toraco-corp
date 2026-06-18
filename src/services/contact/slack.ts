import type { ContactInput } from '@/domains/contact';

const UNSET = '（未記入）';

export function buildSlackPayload(input: ContactInput): { text: string } {
  const lines = [
    '*お問い合わせがありました*',
    `*種別:* ${input.type}`,
    `*お名前:* ${input.name}`,
    `*会社名:* ${input.company || UNSET}`,
    `*メール:* ${input.email}`,
    `*電話:* ${input.tel || UNSET}`,
    '*お問い合わせ内容:*',
    input.message,
  ];
  return { text: lines.join('\n') };
}

// Slack Incoming Webhook へ通知する。成功なら true。
export async function notifySlack({
  webhookUrl,
  input,
}: {
  webhookUrl: string;
  input: ContactInput;
}): Promise<boolean> {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(buildSlackPayload(input)),
    });
    return response.ok;
  } catch {
    return false;
  }
}
