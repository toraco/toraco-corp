const SITEVERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export type TurnstileResult = {
  success: boolean;
  errorCodes?: string[];
};

type SiteverifyResponse = {
  success: boolean;
  'error-codes'?: string[];
};

// Cloudflare Turnstile のトークンをサーバ側で検証する。
export async function verifyTurnstile({
  token,
  secret,
  remoteIp,
}: {
  token: string;
  secret: string;
  remoteIp?: string;
}): Promise<TurnstileResult> {
  try {
    const body = new URLSearchParams();
    body.set('secret', secret);
    body.set('response', token);
    if (remoteIp) body.set('remoteip', remoteIp);

    const response = await fetch(SITEVERIFY_URL, { method: 'POST', body });
    if (!response.ok) {
      return { success: false, errorCodes: ['http-error'] };
    }

    const data = (await response.json()) as SiteverifyResponse;
    return { success: data.success, errorCodes: data['error-codes'] };
  } catch {
    return { success: false, errorCodes: ['exception'] };
  }
}
