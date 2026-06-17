// `pnpm cf-typegen` で再生成する（wrangler.jsonc を編集したら更新すること）。
// getCloudflareContext().env の型はこの CloudflareEnv を参照する。
interface CloudflareEnv {
  ASSETS: Fetcher;
  /** microCMS のサービスドメイン（wrangler.jsonc の vars） */
  MICROCMS_SERVICE_DOMAIN: string;
  /** microCMS の API キー（`wrangler secret put MICROCMS_API_KEY` で投入） */
  MICROCMS_API_KEY: string;
}
