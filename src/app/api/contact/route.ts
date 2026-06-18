import { getCloudflareContext } from '@opennextjs/cloudflare';
import { NextResponse } from 'next/server';

import { handleContact } from '@/services/contact';

export async function POST(request: Request) {
  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'invalid_json' },
      { status: 400 }
    );
  }

  const { env } = await getCloudflareContext({ async: true });
  const result = await handleContact(data, {
    turnstileSecret: env.TURNSTILE_SECRET_KEY,
    slackWebhookUrl: env.SLACK_WEBHOOK_URL,
    ses: {
      accessKeyId: env.SES_ACCESS_KEY_ID,
      secretAccessKey: env.SES_SECRET_ACCESS_KEY,
      region: env.SES_REGION,
      fromAddress: env.SES_FROM_ADDRESS,
      internalBcc: env.SES_INTERNAL_BCC,
    },
    remoteIp: request.headers.get('cf-connecting-ip') ?? undefined,
  });

  const status = result.ok ? 200 : result.status;
  return NextResponse.json(result, { status });
}
