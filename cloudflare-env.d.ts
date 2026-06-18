// `pnpm cf-typegen` で再生成する（wrangler.jsonc を編集したら更新すること）。
// getCloudflareContext().env の型はこの CloudflareEnv を参照する。
// secret（`wrangler secret put` で投入）は cf-typegen では拾われないため手動で維持する。
interface CloudflareEnv {
  ASSETS: Fetcher;
  /** Amazon SES リージョン（wrangler.jsonc の vars） */
  SES_REGION: string;
  /** Amazon SES 送信元アドレス（wrangler.jsonc の vars） */
  SES_FROM_ADDRESS: string;
  /** Amazon SES 社内コピー宛先（任意・wrangler.jsonc の vars） */
  SES_INTERNAL_BCC?: string;
  /** Amazon SES アクセスキー ID（secret: `wrangler secret put SES_ACCESS_KEY_ID`） */
  SES_ACCESS_KEY_ID: string;
  /** Amazon SES シークレットアクセスキー（secret: `wrangler secret put SES_SECRET_ACCESS_KEY`） */
  SES_SECRET_ACCESS_KEY: string;
  /** Slack Incoming Webhook URL（secret: `wrangler secret put SLACK_WEBHOOK_URL`） */
  SLACK_WEBHOOK_URL: string;
  /** Cloudflare Turnstile シークレットキー（secret: `wrangler secret put TURNSTILE_SECRET_KEY`） */
  TURNSTILE_SECRET_KEY: string;
}
