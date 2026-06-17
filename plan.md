# plan.md — toraco コーポレートサイト 刷新

TDD（Red → Green → Refactor）と Tidy First（構造的変更と振る舞い変更を分離）で進める。
`go` と言われたら、次の未チェックのテストを 1 つ実装し、それを通す最小限のコードを書く。
毎回すべてのテスト（長時間テストを除く）を実行する。

---

## フェーズ A: 基盤構築（今セッション・完了）

技術スタック移行とツールチェーン整備（主に構造的変更）。コンテンツは最小シェルのみ。

- [x] `docs/DESIGN.md` 定義（現行ブランドを shadcn/Tailwind v4 トークンとして体系化）
- [x] pnpm へ移行（`yarn.lock` 削除、`packageManager` 指定、クリーンインストール）
- [x] 不要依存の削除（classnames / remixicon / sass / next-on-pages / vercel）と残置依存の最新化
- [x] Tailwind CSS v4 + shadcn/ui (new-york) + radix-ui 基盤（`globals.css` / `components.json` / `lib/cn.ts`）
- [x] `@opennextjs/cloudflare` で Cloudflare Workers デプロイ設定（`wrangler.jsonc` / `open-next.config.ts` / `next.config.ts`）
- [x] ESLint flat config / Prettier / tsconfig 更新
- [x] Vitest + Testing Library 基盤（`pnpm test` 稼働）
- [x] next-themes（ライト/ダーク）Provider 導入
- [x] ビルドが通る最小シェル（`layout.tsx` / `page.tsx` / `button` / `ModeToggle`）
- [x] `pnpm lint` / `pnpm test` / `pnpm build:dryrun` パス

---

## フェーズ B: コンテンツ再構築（次セッション・TDD）

> 各テストは `src/**/*.test.ts(x)` に配置。Red を確認してから最小実装で Green にする。
> UI は DESIGN.md のトークン・規約に従う。

### B-1. 共有ユーティリティ / ドメイン

- [ ] `formatDate` が ISO 文字列を `ja-JP`（例: 2025年1月30日）に整形する
- [ ] microCMS の News 型マッパーが API レスポンスを内部モデルに変換する
- [ ] `getNewsList` が microCMS から公開日降順で一覧を取得する（fetch をモック）
- [ ] `getNewsList` が失敗時に空のデフォルトレスポンスを返す
- [ ] OpenNext 環境から microCMS 認証情報を取得するヘルパが env を返す（`getCloudflareContext` をモック）

### B-2. UI プリミティブ / アイコン

- [ ] `Icon` ラッパーが指定の lucide アイコンを所定サイズ・stroke で描画する
- [ ] Discord ブランドアイコン（inline SVG）が `role`/`aria-label` 付きで描画される
- [ ] YouTube ブランドアイコン（inline SVG）が描画される
- [ ] `Card` がトークン（border / radius / padding）どおりに描画される

### B-3. レイアウト

- [ ] `Header` がロゴとナビ（Services / News / About / Contact）を描画する
- [ ] `Header` のモバイルメニュー（Sheet）が開閉する
- [ ] `ModeToggle` がライト/ダークを切り替える
- [ ] `Footer` がコピーライト・SNS リンク（Discord / YouTube）を描画する

### B-4. セクション

- [ ] `Hero` が見出しと CTA を描画し、CTA がブルーのリンク規約に従う
- [ ] `Services`（得意とする開発 / コミュニティ / YouTube）の各カードが描画される
- [ ] `NewsList` が News 配列を日付付きで描画する
- [ ] `NewsList` が空のとき適切な空状態を表示する
- [ ] `About` が会社情報テーブルを描画する
- [ ] `Contact` の CTA が HubSpot フォームへ遷移する

### B-5. ページ統合 / メタ

- [ ] トップページが Hero / Services / News / About / Contact を順に描画する
- [ ] `metadata`（title / description / OGP / icons / manifest）が設定される
- [ ] `site.webmanifest` が toraco の名称・テーマカラーを持つ

---

## デプロイ移行（フェーズ B 完了後・要ユーザー作業/承認）

- [ ] Cloudflare Workers へ初回デプロイ（`pnpm deploy`）
- [ ] `MICROCMS_API_KEY` を Worker secret として投入（`wrangler secret put`）
- [ ] カスタムドメイン `toraco.jp` を Pages から Worker へ再割当（DNS/ルート切替・要調整）
- [ ] CI（GitHub Actions）でのデプロイ設定（任意）
