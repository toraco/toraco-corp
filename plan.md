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

## フェーズ B: コンテンツ再設計（TDD・完了）

> 各テストは `src/**/*.test.ts(x)` に配置。Red を確認してから最小実装で Green にする。
> UI は DESIGN.md のトークン・規約に従う。構造的変更（`(構造)`）と振る舞い変更は別コミット。
> 設計の根拠は `docs/CONTENT.md` / `docs/CONTACT_FORM.md` 参照。
> 完了時点: 86 テスト緑 / `pnpm lint` / `build:dryrun` / `build`（17 ルート）パス。

### B-0. 整理（構造的変更 / Tidy First・テスト緑を維持）

- [x] (構造) `microcms-js-sdk` を削除し、`zod` / `aws4fetch` / `@marsidev/react-turnstile` を追加（`pnpm install`）
- [x] (構造) `src/services/microcms/` を削除
- [x] (構造) `src/domains/news/index.ts` を静的 News 用の型へ簡素化
- [x] (構造) `wrangler.jsonc` vars から microCMS を削除し SES vars を追加、`.dev.vars.example` / `cloudflare-env.d.ts` を新 env へ
- [x] (構造) `pnpm lint` / `pnpm test` / `pnpm build:dryrun` が緑

### B-1. コンテンツデータ層（振る舞い）

> 型は `src/domains/<x>`、データは `src/content/<x>.ts`。

- [x] `formatDate` が ISO 文字列を `ja-JP`（例: 2025年1月30日）に整形する（既存テスト維持）
- [x] `works` データが3件あり、各事例が必須項目（slug/title/summary/techTags）を持つ
- [x] 匿名事例（large-scale-platform / d2c-multi-brand）が `isAnonymous: true` で業種名を含まない
- [x] etoe 事例が実名・公開URL（etoehotel.com）を持つ
- [x] `getWorkBySlug` が該当 slug の事例を返し、無ければ undefined
- [x] `services` データが5件（受託開発 / ラボ型開発 / Web高速化 / テスト自動化 / AI駆動開発）
- [x] テスト自動化サービスが匿名実例（手動QA 約66%削減）を持つ
- [x] `company` が確定値（社名 / 設立 2021-04-23 / 資本金 700万円 / 代表 稲垣 貴映 / 所在地）を持つ
- [x] `getNewsList` が publishedAt 降順で静的 News を返す
- [x] `getNewsBySlug` が該当記事を返し、無ければ null

### B-2. UI プリミティブ / アイコン

- [x] `Card` がトークン（border / radius / padding）どおりに描画される
- [x] `Badge` が variant（brand / info 等）で描画される
- [x] `Icon` ラッパーが指定の lucide アイコンを所定サイズ・stroke で描画する
- [x] YouTube ブランドアイコン（inline SVG）が `role` / `aria-label` 付きで描画される
- [x] `Input` / `Textarea` / `Label` / `Select`（shadcn）が描画される

### B-3. レイアウト

- [x] `Header` がロゴとナビ（Services / Works / About / News / Contact）を描画する
- [x] `Header` のモバイルメニュー（Sheet）が開閉する
- [x] `Footer` がコピーライトと SNS リンク（YouTube / X / GitHub / Zenn）を描画する

### B-4. トップ LP セクション

- [x] `Hero` が見出しと CTA を描画し、CTA がブルーのリンク規約に従う
- [x] `ServicesOverview` が5サービスのカードを描画する
- [x] `WorksExcerpt` が事例3件の抜粋カードを描画する
- [x] `AboutExcerpt` が会社概要の要点を描画する
- [x] `NewsList` が News 配列を日付付きで描画する
- [x] `NewsList` が空のとき適切な空状態を表示する
- [x] `ContactCTA` が `/contact` への導線を描画する

### B-5. 下層ページ

- [x] `/works` が事例一覧を描画する
- [x] `/works/[slug]` が事例詳細（課題 / 対応 / 結果 / 技術タグ）を描画する
- [x] `/works/[slug]` が未知 slug で notFound
- [x] `/services` が5サービス詳細を描画し、テスト自動化に匿名実例を含む
- [x] `/about` が会社概要表・代表プロフィール・ミッションを描画する
- [x] `/news` が一覧、`/news/[slug]` が詳細を描画する
- [x] `/contact` がフォームを描画する

### B-6. お問い合わせパイプライン

> アダプタは fetch / `getCloudflareContext` をモックして単体テスト。エラー方針: Slack=主（失敗で502・SES未実行）、SES=best-effort（失敗で200+warning）。

- [x] zod スキーマが必須項目（name / email / type / message）欠落を弾く
- [x] zod スキーマが不正メール形式・列挙外の種別を弾き、任意項目（company / tel）欠落は許容する
- [x] `verifyTurnstile` が siteverify へ正しく POST し、成功/失敗トークンで結果を返す（fetch モック）
- [x] `buildSlackPayload` が種別 / name / email / message を含む（任意項目は未記入表現）
- [x] `notifySlack` が webhook URL へ JSON を POST する（fetch モック）
- [x] `buildSesPayload` が From / To / 件名 / 本文を持ち、BCC は指定時のみ含む
- [x] `sendAutoReply` が SESv2 エンドポイントへ SigV4 署名（`Authorization: AWS4-HMAC-SHA256`）付きで送る（fetch モック）
- [x] `handleContact` が 検証失敗で400（以降未呼び）/ Turnstile失敗で中断 / Slack失敗で502（SES未呼び）/ 全成功で200 / SES失敗で200+warning
- [x] `/api/contact` が 不正JSONで400 / 検証失敗で400 / 正常で200（`getCloudflareContext` モック）
- [x] `ContactForm` が必須項目と種別5選択肢を描画し、送信中はボタン無効・成功/失敗表示・Turnstile 未完了で送信ブロック

### B-7. ページ統合 / メタ

- [x] トップページが Hero / Services / Works / About / News / Contact を順に描画する
- [x] 各ページの `metadata`（title / description / OGP）が設定される
- [x] `sitemap.ts` が全ルートを返し、`robots.ts` を提供する
- [x] トップ CTA が HubSpot ではなく `/contact` を指す

### B-8. ドキュメント / 最終チェック

- [x] (構造) `docs/DESIGN.md` をコミュニティ削除・新サービス / Works / ナビ反映で更新
- [x] (構造) `docs/CONTENT.md`（IA・コンテンツ仕様）を新規作成
- [x] (構造) `docs/CONTACT_FORM.md`（フォーム仕様・パイプライン・env）を新規作成
- [x] (構造) `README.md` を静的 News・新 env / シークレット・Contact 構成で更新
- [x] `pnpm lint` / `pnpm test` / `pnpm build:dryrun` / `pnpm build` が緑

---

## フェーズ C: services コンテンツ改訂（TDD・完了）

> services の提供内容を事業実態へ合わせて改訂。Web高速化を廃し、運用監視自動化を新設。
> テスト自動化の説明を一般化（LIFF 文脈を除去）、AI駆動開発を基盤構築＋コンサルへ転換。
> 構造的変更（アイコン整理・ドキュメント）と振る舞い変更（コンテンツ）を分離。
> 完了時点: 91 テスト緑 / `pnpm lint` / `build:dryrun` / `build` パス。

### C-1. アイコン整理（構造）

- [x] (構造) `Icon` registry に `Activity` / `BellRing` / `Cloud` を追加（運用監視自動化で使用）
- [x] (構造) 未使用化した `Gauge` / `Globe` を registry から削除（Web高速化廃止に伴う）

### C-2. services データ改訂（振る舞い）

- [x] `services` が5件・slug 順 [contract-development / lab-development / test-automation / ai-driven-development / monitoring-automation]（web-performance を除外）
- [x] テスト自動化の説明から「LINE ミニアプリ（LIFF）テスト」を除去（薬局向け匿名実例は維持）
- [x] AI駆動開発を「基盤構築＋コンサルティング」方針へ書き直し（features 3 本を刷新）
- [x] 運用監視自動化を新設し、etoe の実名事例（エラー検知・AI 一次調査自動化）と `workSlugs:['etoe']` を持つ

### C-3. Works 連携（振る舞い）

- [x] etoe 事例に運用監視・AI 一次調査の solution/results を追記し、`serviceSlugs` に monitoring-automation を追加（services と相互リンク）

### C-4. トップ LP / メタ（振る舞い）

- [x] Hero・お問い合わせ CTA のコピーに運用監視自動化を反映
- [x] `/services` の `metadata.description` を新サービス構成へ更新

### C-5. ドキュメント / 最終チェック（構造）

- [x] (構造) `docs/CONTENT.md`（サービス表・事業内容・実名事例方針）を更新
- [x] (構造) `docs/DESIGN.md`（§1 サービス列挙・§9 アイコン対応表）を更新
- [x] (構造) `company` の事業内容を更新（Web高速化を除き運用監視自動化を追加）
- [x] `pnpm lint` / `pnpm test` / `pnpm build:dryrun` / `pnpm build` が緑

---

## フェーズ D: About 改訂（TDD）

> 価値観を会社公式（Wantedly）の Be proud / Be cooperative / Be independent へ刷新し、
> 「Vision / 価値観」セクションとして独立表示。代表者プロフィールを公開情報ベースへ書き直し、
> 顔写真（トリミング済み webp）を追加。構造的変更（型追加・ドキュメント）と振る舞い変更を分離。

### D-1. 価値観（Vision）改訂（振る舞い）

- [x] `/about` が「Vision / 価値観」セクションと3つの価値観（Be proud / Be cooperative / Be independent）を描画する

### D-2. 代表者プロフィール写真（構造 → 振る舞い）

- [x] (構造) `Representative` 型に `photo`（src / alt / width / height）を追加
- [x] `/about` の代表者セクションがプロフィール写真（img・alt に氏名）を描画する

### D-3. 代表者 bio 改訂（振る舞い）

- [x] 代表者 bio が公開情報ベースに更新され、廃止済みの記述（Cloudflare 中心の高速化 / SIer）を含まない

### D-4. ドキュメント / 最終チェック（構造）

- [x] (構造) `docs/CONTENT.md`（価値観・代表者写真）を更新
- [x] (構造) `docs/DESIGN.md`（`public/images/profile.webp`・About 構成）を更新
- [x] `pnpm lint` / `pnpm test` / `pnpm build:dryrun` / `pnpm build` が緑

---

## フェーズ E: トップ/About コンテンツ調整（TDD）

> トップの About を簡素化（価値観非表示・縦並び）し、News を確定リストへ刷新（外部リンク対応）。
> About ページの価値観セクション見出しを `Vision` → `Values` に修正。
> 構造的変更（型追加・ドキュメント）と振る舞い変更（コンテンツ・レイアウト）を分離。

### E-1. News データ層（構造 → 振る舞い）

- [x] (構造) `News` 型に `externalUrl?: string`（外部リンク）を追加
- [x] `getNewsList` が確定5件を publishedAt 降順で返す（EDD2023 / Schoo / オフィス移転を含み、youtube-toragemi を含まない）
- [x] Schoo の記事が `externalUrl: https://schoo.jp/course/7546` を持つ
- [x] `generateStaticParams` / `sitemap` が外部リンク記事（externalUrl 付き）を内部ページとして生成しない
- [x] News 詳細ページが外部リンク記事の slug で notFound

### E-2. NewsList 外部リンク（振る舞い）

- [x] `NewsList` が `externalUrl` を持つ記事を別タブの外部リンク（`target=_blank` / `rel`）で描画する

### E-3. トップ About 簡素化（振る舞い）

- [x] `AboutExcerpt` が価値観（Be proud 等）を表示せず、ミッションと会社概要表を縦並びで描画する

### E-4. About ページ 見出し修正（振る舞い）

- [x] `/about` の価値観セクション見出しが `Values`（旧 `Vision`）で描画される

### E-5. ドキュメント / 最終チェック（構造）

- [x] (構造) `docs/CONTENT.md`（News リスト・外部リンク・トップ About レイアウト・Values 見出し）を更新
- [x] `pnpm lint` / `pnpm test` / `pnpm build:dryrun` / `pnpm build` が緑

---

## フェーズ F: News 改修（トップ見出し調整 + Markdown 記事化・TDD）

> トップ News の見出し調整（EDD2023 短縮・Schoo を外部リンク→内部詳細）と、News 詳細の Markdown 記事化。
> 記事は `src/content/news/<slug>.md`（frontmatter + Markdown 本文）へ移設し、`externalUrl` 機構は完全削除。
> 構造的変更（依存追加・ローダ移設・機構削除・ドキュメント）と振る舞い変更（描画・コンテンツ）を分離。

### F-0. 依存追加（構造）

- [x] (構造) `react-markdown` / `remark-gfm` / `gray-matter` を追加（`pnpm add`）

### F-1. Markdown ローダ基盤へ移設（構造・振る舞い不変）

- [x] (構造) 既存 5 記事を `src/content/news/<slug>.md`（frontmatter + 本文）へ移設し、`news.ts` を fs + gray-matter ローダ（遅延 + メモ化）へ置換
- [x] ローダが frontmatter の `publishedAt` を文字列として読み込む（YAML 日付化を回避）

### F-2. externalUrl 機構の撤去（構造 → Schoo 内部詳細化）

- [x] (構造) `News` 型・一覧 / 詳細 / `sitemap` の分岐・`Icon` の `ExternalLink` を削除し、Schoo を内部詳細ページへ
- [x] Schoo の slug で静的パスを生成し詳細を描画する（`sitemap` にも内部 URL を含む）

### F-3. Markdown 描画コンポーネント（振る舞い）

- [x] `Markdown` が強調（`<strong>`）・箇条書き（`<li>`）を描画し、外部リンクは別タブ（`target="_blank"` / `rel`）・内部リンクは同タブで描画する

### F-4. 詳細ページ Markdown 化 + コンテンツ改訂（振る舞い）

- [x] EDD2023 の見出しを `"Engineer Driven Day 2023" にスポンサーとして参加します` に短縮
- [x] 詳細ページが本文を Markdown として描画する（Schoo 本文に schoo.jp/course/7546 リンクを内包）
- [x] `toPlainText` が Markdown 記法を除去し、`generateMetadata` の description がプレーンテキストになる

### F-5. ドキュメント / 最終チェック（構造）

- [x] (構造) `docs/CONTENT.md` §5（`.md` + frontmatter / Markdown 本文 / 見出し短縮 / Schoo 内部詳細）を更新
- [x] `pnpm lint` / `pnpm test` / `pnpm build:dryrun` / `pnpm build` が緑

---

## デプロイ移行（フェーズ B 完了後・要ユーザー作業/承認）

- [ ] お問い合わせ用シークレット投入（`wrangler secret put`）: `TURNSTILE_SECRET_KEY` / `SLACK_WEBHOOK_URL` / `SES_ACCESS_KEY_ID` / `SES_SECRET_ACCESS_KEY`
- [ ] `wrangler.jsonc` vars（`SES_REGION` / `SES_FROM_ADDRESS`）と、CI/ビルド環境の `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- [ ] Amazon SES: 送信元アドレス検証・DKIM 用 DNS レコード追加・サンドボックス解除
- [ ] Slack: 通知先チャンネルの Incoming Webhook 発行
- [ ] ⚠️ セキュリティ: コミット済みの旧 microCMS API キー（`.dev.vars`）をローテーション
- [ ] Cloudflare Workers へデプロイ（`pnpm deploy`）／カスタムドメイン `toraco.jp` 切替
- [ ] CI（GitHub Actions）でのデプロイ設定（任意）
