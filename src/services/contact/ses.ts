import { AwsClient } from 'aws4fetch';

import type { ContactInput } from '@/domains/contact';

export type SesConfig = {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  fromAddress: string;
  internalBcc?: string;
};

const UNSET = '（未記入）';

export function buildAutoReplyText(input: ContactInput): string {
  return [
    `${input.name} 様`,
    '',
    'この度は toraco株式会社へお問い合わせいただき、誠にありがとうございます。',
    '以下の内容で受け付けいたしました。担当者より追ってご連絡いたします。',
    '',
    '──────────',
    `種別: ${input.type}`,
    `お名前: ${input.name}`,
    `会社名: ${input.company || UNSET}`,
    `メール: ${input.email}`,
    `電話: ${input.tel || UNSET}`,
    'お問い合わせ内容:',
    input.message,
    '──────────',
    '',
    'toraco株式会社',
    'https://toraco.jp',
  ].join('\n');
}

export function buildSesPayload(input: ContactInput, config: SesConfig) {
  return {
    FromEmailAddress: config.fromAddress,
    Destination: {
      ToAddresses: [input.email],
      ...(config.internalBcc ? { BccAddresses: [config.internalBcc] } : {}),
    },
    Content: {
      Simple: {
        Subject: {
          Data: '【toraco株式会社】お問い合わせありがとうございます',
          Charset: 'UTF-8',
        },
        Body: {
          Text: {
            Data: buildAutoReplyText(input),
            Charset: 'UTF-8',
          },
        },
      },
    },
  };
}

// Amazon SES v2 の HTTPS API を aws4fetch で SigV4 署名して呼び出す。成功なら true。
export async function sendAutoReply({
  input,
  config,
}: {
  input: ContactInput;
  config: SesConfig;
}): Promise<boolean> {
  try {
    const client = new AwsClient({
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
      region: config.region,
      service: 'ses',
    });
    const url = `https://email.${config.region}.amazonaws.com/v2/email/outbound-emails`;
    const response = await client.fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(buildSesPayload(input, config)),
    });
    return response.ok;
  } catch {
    return false;
  }
}
