# toraco-corp

toraco株式会社 コーポレートサイト。

## 技術スタック

- **Framework**: Next.js (App Router) + React 19
- **言語**: TypeScript（ESM / `"type": "module"`）
- **スタイリング**: Tailwind CSS v4 + shadcn/ui (new-york) + radix-ui
- **アイコン**: lucide-react
- **テーマ**: next-themes（ライト / ダーク）
- **CMS**: microCMS（News）
- **デプロイ**: Cloudflare Workers（`@opennextjs/cloudflare`）
- **パッケージマネージャ**: pnpm
- **テスト**: Vitest + Testing Library

デザイン仕様は [`docs/DESIGN.md`](./docs/DESIGN.md) を参照。

## セットアップ

Node.js 24（`.node-version` は `24.14.1`）。pnpm は Corepack 経由で利用する。

```bash
corepack enable
pnpm install
```

ローカルの環境変数は `.dev.vars` に置く（`.dev.vars.example` をコピー）。

```bash
cp .dev.vars.example .dev.vars
# MICROCMS_API_KEY を設定する
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

### 初回セットアップ

1. Cloudflare にログイン

   ```bash
   npx wrangler login
   ```

2. 本番シークレットを投入（`.dev.vars` の値はローカル専用）

   ```bash
   npx wrangler secret put MICROCMS_API_KEY
   ```

   `MICROCMS_SERVICE_DOMAIN` は `wrangler.jsonc` の `vars` で管理している。

3. デプロイ

   ```bash
   pnpm deploy   # opennextjs-cloudflare build && opennextjs-cloudflare deploy
   ```

### カスタムドメイン `toraco.jp` の移行（要調整）

`toraco.jp` は現在 Cloudflare Pages に紐づいている。Worker（`wrangler.jsonc` の `routes` で `custom_domain`）へ切り替えるには、**先に Pages 側のカスタムドメイン割当を解除**してから Worker をデプロイする必要がある。切替時に短時間のダウンが発生し得るため、メンテナンス時間を確保して実施すること。

### Cloudflare 型の再生成

`wrangler.jsonc` を編集したら型を更新する。

```bash
pnpm cf-typegen   # cloudflare-env.d.ts を再生成
```
