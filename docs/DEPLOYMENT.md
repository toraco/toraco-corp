# DEPLOYMENT.md — デプロイ / 本番移行仕様

本サイトの本番デプロイ先と、旧 Cloudflare Pages から Cloudflare Workers への移行手順。

## 1. 構成

| 項目 | 内容 |
| --- | --- |
| 配信基盤 | Cloudflare Workers（`@opennextjs/cloudflare`） |
| Worker 名 | `toraco-corp`（`wrangler.jsonc` の `name`） |
| 本番ドメイン | `toraco.jp`（apex） |
| www | `www.toraco.jp` → apex へ 308 リダイレクト |
| デプロイ | `pnpm deploy`（`opennextjs-cloudflare build && deploy`） |

- `toraco.jp` / `www.toraco.jp` は `wrangler.jsonc` の `routes` に `custom_domain` として定義する。
- 旧構成（Cloudflare Pages + `@cloudflare/next-on-pages`）は廃止。`wrangler.toml` は削除済み。

## 2. www → apex リダイレクト

- `www.toraco.jp` も Worker のカスタムドメインとして受け取り、`src/middleware.ts` が apex（`https://toraco.jp`）へ **308** リダイレクトする（パス・クエリ維持）。
- canonical は apex に統一する（`metadataBase` も `https://toraco.jp`）。
- ゾーンのリダイレクトルールは使用しない（運用トークンに zone 書込権限が無いため、リダイレクトはアプリ層で実装）。

## 3. シークレットと環境変数

- secret（`wrangler secret put <NAME>`）: `SLACK_WEBHOOK_URL` / `TURNSTILE_SECRET_KEY` / `SES_ACCESS_KEY_ID` / `SES_SECRET_ACCESS_KEY`。
- vars（`wrangler.jsonc`）: `SES_REGION` / `SES_FROM_ADDRESS`。
- 公開値（ビルド時インライン）: `NEXT_PUBLIC_TURNSTILE_SITE_KEY`（CI / ローカルの `.env.local`）。
- 詳細は [`CONTACT_FORM.md`](./CONTACT_FORM.md) を参照。

## 4. 通常デプロイ

```bash
pnpm deploy   # opennextjs-cloudflare build && deploy
```

`routes` の `custom_domain` により `toraco.jp` / `www.toraco.jp` が Worker に接続される。

## 5. 初回移行（Pages → Workers）

> `toraco.jp` / `www.toraco.jp` が Cloudflare Pages プロジェクト `toraco-corp` に紐づいている状態から Worker へ切り替える手順。**本番に短時間のダウンが発生し得るため、メンテナンス枠で実施する。**

1. Pages のカスタムドメイン `toraco.jp` / `www.toraco.jp` を解放する（Cloudflare ダッシュボード: Pages > toraco-corp > Custom domains、または pages:write トークンで API 削除）。
   - プロジェクトは残しておくと、切替失敗時にドメインを Pages へ戻して即時復旧できる。
2. `pnpm deploy` を実行し Worker にカスタムドメインを接続する。
3. 検証（§6）が通ったら、Pages プロジェクトを削除する。

```bash
wrangler pages project delete toraco-corp
```

- プロジェクト削除により `*.pages.dev` と GitHub 自動デプロイ連携も解除される。

## 6. 検証

| 確認項目 | 期待結果 |
| --- | --- |
| `curl -I https://toraco.jp` | 200 / 新サイト |
| HTML に `GTM-TGFL4CKQ` | 含む（本番ビルドのみ） |
| `curl -I https://www.toraco.jp` | 308 → `location: https://toraco.jp/...` |
| 主要ルート | `/services` `/works` `/works/<slug>` `/about` `/news` `/news/<slug>` `/contact` `/sitemap.xml` `/robots.txt` が 200 |
| お問い合わせ送信 | Turnstile → Slack 通知 → SES 自動返信が成立 |
| `dig +short TXT toraco.jp` | Google Search Console の検証 TXT が維持 |

## 7. ロールバック

- Worker 不調: `wrangler rollback`（直前バージョンへ）。
- 切替全体の失敗（Pages 未削除時）: ダッシュボードで `toraco.jp` / `www.toraco.jp` を Pages に再割当し旧サイトへ復旧。

## 8. Google Search Console / 解析

- GSC は DNS TXT で検証済みのため、Pages→Workers 移行（DNS 不変）で**そのまま維持**される。
- 解析タグ（GTM / GA4）は [`ANALYTICS.md`](./ANALYTICS.md) を参照。
