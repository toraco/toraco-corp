# plan.md — toraco コーポレートサイト 刷新

TDD（Red → Green → Refactor）と Tidy First（構造的変更と振る舞い変更を分離）で進める。
`go` と言われたら、次の未チェックのテストを 1 つ実装し、それを通す最小限のコードを書く。
毎回すべてのテスト（長時間テストを除く）を実行する。

---

## フェーズ A: 基盤構築（完了）

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

## フェーズ B: コンテンツ再設計（TDD）

> 各テストは `src/**/*.test.ts(x)` に配置。Red を確認してから最小実装で Green にする。
> UI は DESIGN.md のトークン・規約に従う。構造的変更（`(構造)`）と振る舞い変更は別コミット。
> 設計の根拠は承認済みプラン（`docs/CONTENT.md` / `docs/CONTACT_FORM.md` に展開予定）参照。

### B-0. 整理（構造的変更 / Tidy First・テスト緑を維持）

- [ ] (構造) `microcms-js-sdk` を削除し、`zod` / `aws4fetch` / `@marsidev/react-turnstile` を追加（`pnpm install`）
- [ ] (構造) `src/services/microcms/` を削除
- [ ] (構造) `src/domains/news/index.ts` を静的 News 用の型へ簡素化
- [ ] (構造) `wrangler.jsonc` vars から microCMS を削除し SES vars を追加、`.dev.vars.example` / `cloudflare-env.d.ts` を新 env へ
- [ ] (構造) `pnpm lint` / `pnpm test` / `pnpm build:dryrun` が緑

### B-1. コンテンツデータ層（振る舞い）

> 型は `src/domains/<x>`、データは `src/content/<x>.ts`。

- [ ] `formatDate` が ISO 文字列を `ja-JP`（例: 2025年1月30日）に整形する（既存テスト維持）
- [ ] `works` データが3件あり、各事例が必須項目（slug/title/summary/techTags）を持つ
- [ ] 匿名事例（large-scale-platform / d2c-multi-brand）が `isAnonymous: true` で業種名を含まない
- [ ] etoe 事例が実名・公開URL（etoehotel.com）を持つ
- [ ] `getWorkBySlug` が該当 slug の事例を返し、無ければ undefined
- [ ] `services` データが5件（受託開発 / ラボ型開発 / Web高速化 / テスト自動化 / AI駆動開発）
- [ ] テスト自動化サービスが匿名実例（手動QA 約66%削減）を持つ
- [ ] `company` が確定値（社名 / 設立 2021-04-23 / 資本金 700万円 / 代表 稲垣 貴映 / 所在地）を持つ
- [ ] `getNewsList` が publishedAt 降順で静的 News を返す
- [ ] `getNewsBySlug` が該当記事を返し、無ければ null

### B-2. UI プリミティブ / アイコン

- [ ] `Card` がトークン（border / radius / padding）どおりに描画される
- [ ] `Badge` が variant（brand / info 等）で描画される
- [ ] `Icon` ラッパーが指定の lucide アイコンを所定サイズ・stroke で描画する
- [ ] YouTube ブランドアイコン（inline SVG）が `role` / `aria-label` 付きで描画される
- [ ] `Input` / `Textarea` / `Label` / `Select`（shadcn）が描画される

### B-3. レイアウト

- [ ] `Header` がロゴとナビ（Services / Works / About / News / Contact）を描画する
- [ ] `Header` のモバイルメニュー（Sheet）が開閉する
- [ ] `Footer` がコピーライトと SNS リンク（YouTube / X / GitHub / Zenn）を描画する

### B-4. トップ LP セクション

- [ ] `Hero` が見出しと CTA を描画し、CTA がブルーのリンク規約に従う
- [ ] `ServicesOverview` が5サービスのカードを描画する
- [ ] `WorksExcerpt` が事例3件の抜粋カードを描画する
- [ ] `AboutExcerpt` が会社概要の要点を描画する
- [ ] `NewsList` が News 配列を日付付きで描画する
- [ ] `NewsList` が空のとき適切な空状態を表示する
- [ ] `ContactCTA` が `/contact` への導線を描画する

### B-5. 下層ページ

- [ ] `/works` が事例一覧を描画する
- [ ] `/works/[slug]` が事例詳細（課題 / 対応 / 結果 / 技術タグ）を描画する
- [ ] `/works/[slug]` が未知 slug で notFound
- [ ] `/services` が5サービス詳細を描画し、テスト自動化に匿名実例を含む
- [ ] `/about` が会社概要表・代表プロフィール・ミッションを描画する
- [ ] `/news` が一覧、`/news/[slug]` が詳細を描画する
- [ ] `/contact` がフォームを描画する

### B-6. お問い合わせパイプライン

> アダプタは fetch / `getCloudflareContext` をモックして単体テスト。エラー方針: Slack=主（失敗で502・SES未実行）、SES=best-effort（失敗で200+warning）。

- [ ] zod スキーマが必須項目（name / email / type / message）欠落を弾く
- [ ] zod スキーマが不正メール形式・列挙外の種別を弾き、任意項目（company / tel）欠落は許容する
- [ ] `verifyTurnstile` が siteverify へ正しく POST し、成功/失敗トークンで結果を返す（fetch モック）
- [ ] `buildSlackPayload` が種別 / name / email / message を含む（任意項目は未記入表現）
- [ ] `notifySlack` が webhook URL へ JSON を POST する（fetch モック）
- [ ] `buildSesPayload` が From / To / 件名 / 本文を持ち、BCC は指定時のみ含む
- [ ] `sendAutoReply` が SESv2 エンドポイントへ SigV4 署名（`Authorization: AWS4-HMAC-SHA256`）付きで送る（fetch モック）
- [ ] `handleContact` が 検証失敗で400（以降未呼び）/ Turnstile失敗で中断 / Slack失敗で502（SES未呼び）/ 全成功で200 / SES失敗で200+warning
- [ ] `/api/contact` が 不正JSONで400 / 検証失敗で400 / 正常で200（`getCloudflareContext` モック）
- [ ] `ContactForm` が必須項目と種別5選択肢を描画し、送信中はボタン無効・成功/失敗表示・Turnstile 未完了で送信ブロック

### B-7. ページ統合 / メタ

- [ ] トップページが Hero / Services / Works / About / News / Contact を順に描画する
- [ ] 各ページの `metadata`（title / description / OGP）が設定される
- [ ] `sitemap.ts` が全ルートを返し、`robots.ts` を提供する
- [ ] トップ CTA が HubSpot ではなく `/contact` を指す

### B-8. ドキュメント / 最終チェック

- [ ] (構造) `docs/DESIGN.md` をコミュニティ削除・新サービス / Works / ナビ反映で更新
- [ ] (構造) `docs/CONTENT.md`（IA・コンテンツ仕様）を新規作成
- [ ] (構造) `docs/CONTACT_FORM.md`（フォーム仕様・パイプライン・env）を新規作成
- [ ] (構造) `README.md` を静的 News・新 env / シークレット・Contact 構成で更新
- [ ] `pnpm lint` / `pnpm test` / `pnpm build:dryrun` / `pnpm build` が緑

---

## デプロイ移行（フェーズ B 完了後・要ユーザー作業/承認）

- [ ] お問い合わせ用シークレット投入（`wrangler secret put`）: `TURNSTILE_SECRET_KEY` / `SLACK_WEBHOOK_URL` / `SES_ACCESS_KEY_ID` / `SES_SECRET_ACCESS_KEY`
- [ ] `wrangler.jsonc` vars（`SES_REGION` / `SES_FROM_ADDRESS`）と、CI/ビルド環境の `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- [ ] Amazon SES: 送信元アドレス検証・DKIM 用 DNS レコード追加・サンドボックス解除
- [ ] Slack: 通知先チャンネルの Incoming Webhook 発行
- [ ] ⚠️ セキュリティ: コミット済みの旧 microCMS API キー（`.dev.vars`）をローテーション
- [ ] Cloudflare Workers へデプロイ（`pnpm deploy`）／カスタムドメイン `toraco.jp` 切替
- [ ] CI（GitHub Actions）でのデプロイ設定（任意）
