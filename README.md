# toraco-corp

toraco株式会社 コーポレートサイト。

## 技術スタック

- **Framework**: Next.js (App Router) + React 19
- **言語**: TypeScript（ESM / `"type": "module"`）
- **スタイリング**: Tailwind CSS v4 + shadcn/ui (new-york) + radix-ui
- **アイコン**: lucide-react
- **テーマ**: next-themes（ライト / ダーク）
- **コンテンツ**: 静的データ（`src/content` に News / Works / Services / 会社情報を集約）
- **お問い合わせ**: Route Handler（`/api/contact`）+ Cloudflare Turnstile + Slack 通知 + Amazon SES 自動返信
- **デプロイ**: Cloudflare Workers（`@opennextjs/cloudflare`）
- **解析**: Google Tag Manager（`GTM-TGFL4CKQ` / 本番のみ）
- **パッケージマネージャ**: pnpm
- **テスト**: Vitest + Testing Library

デザイン仕様は [`docs/DESIGN.md`](./docs/DESIGN.md)、デプロイ仕様は [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md)、解析仕様は [`docs/ANALYTICS.md`](./docs/ANALYTICS.md) を参照。

## セットアップ

Node.js 24（`.node-version` は `24.14.1`）。pnpm は Corepack 経由で利用する。

```bash
corepack enable
pnpm install
```

ローカルの環境変数は `.dev.vars`（サーバ用）と `.env.local`（クライアント公開用）に置く。

```bash
cp .dev.vars.example .dev.vars   # SLACK_WEBHOOK_URL / TURNSTILE_SECRET_KEY / SES 認証情報
cp .env.example .env.local       # NEXT_PUBLIC_TURNSTILE_SITE_KEY
```

## 開発

```bash
pnpm dev            # 開発サーバ（next dev --turbopack）
pnpm lint           # ESLint
pnpm test           # Vitest
pnpm build:dryrun   # 型チェック（tsc --noEmit）
pnpm build          # 本番ビルド（next build）
pnpm preview        # OpenNext でビルドし Workers ランタイムでプレビュー
```

## デプロイ（Cloudflare Workers）

> 旧構成（Cloudflare Pages + `@cloudflare/next-on-pages`）から **Workers + OpenNext** へ移行した。
> 手順・本番移行・ロールバックの詳細は [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md) を参照。

### 初回セットアップ

1. Cloudflare にログイン

   ```bash
   npx wrangler login
   ```

2. 本番シークレットを投入（`.dev.vars` の値はローカル専用）

   ```bash
   npx wrangler secret put SLACK_WEBHOOK_URL
   npx wrangler secret put TURNSTILE_SECRET_KEY
   npx wrangler secret put SES_ACCESS_KEY_ID
   npx wrangler secret put SES_SECRET_ACCESS_KEY
   ```

   非機密の `SES_REGION` / `SES_FROM_ADDRESS` は `wrangler.jsonc` の `vars` で管理する。クライアント公開の `NEXT_PUBLIC_TURNSTILE_SITE_KEY` はビルド環境（CI / ローカル）に渡す。お問い合わせ仕様は [`docs/CONTACT_FORM.md`](./docs/CONTACT_FORM.md) を参照。

3. デプロイ

   ```bash
   pnpm deploy   # opennextjs-cloudflare build && opennextjs-cloudflare deploy
   ```

### カスタムドメイン

`toraco.jp`（apex）/ `www.toraco.jp` を `wrangler.jsonc` の `routes`（`custom_domain`）で Worker に接続する。`www` は受け取った上で `src/middleware.ts` が apex へ 308 リダイレクトする。

旧 Cloudflare Pages からの初回移行手順（Pages カスタムドメイン解放 → `pnpm deploy` → Pages 削除）と検証・ロールバックは [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md) を参照。

### Cloudflare 型の再生成

`wrangler.jsonc` で `vars` やバインディングを変更したら型を更新する（`routes` のみの変更は不要）。`cloudflare-env.d.ts` は secret 等を手動で維持しているため、再生成する場合は既存ファイルを退避してから実行する。

```bash
pnpm cf-typegen   # cloudflare-env.d.ts を再生成
```
