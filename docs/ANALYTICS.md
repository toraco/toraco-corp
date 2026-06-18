# ANALYTICS.md — 解析（GTM / GA4）仕様

サイトの計測は **Google Tag Manager（GTM）** を入口とし、Google Analytics 4（GA4）等の個別タグは GTM 内で構成する。

## 1. 構成

| 項目 | 内容 |
| --- | --- |
| GTM コンテナ ID | `GTM-TGFL4CKQ`（`src/content/site.ts` の `gtmId`） |
| 読み込み | `@next/third-parties/google` の `GoogleTagManager`（`src/components/analytics/analytics.tsx`） |
| 組込位置 | ルートレイアウト `src/app/layout.tsx` |
| 発火条件 | **本番ビルドのみ**（`process.env.NODE_ENV === 'production'`） |
| GA4 | GTM コンテナ内で「GA4 設定」タグとして構成（コード変更不要） |

- GTM コンテナ ID は公開値（HTML に露出する）ため secret 化しない。
- 開発（`next dev`）・テストでは読み込まれない。`pnpm preview` / 本番では読み込まれる。

## 2. Google Search Console

- `toraco.jp` は DNS TXT（`google-site-verification=...`）で検証済み。
- DNS は配信基盤の移行で変わらないため、検証は**維持される**（追加作業なし）。
- GTM 経由で GA4 を導入後、GA4 と GSC を連携させると Search Console レポートが GA4 で参照できる（任意）。

## 3. GTM 内で GA4 を設定する手順

> コード側は GTM コンテナの読み込みのみ。以下は GTM ダッシュボードでの作業。

1. **GA4 プロパティを用意**: Google Analytics で対象プロパティを作成し、**測定 ID（`G-XXXXXXXXXX`）** を控える。
2. **GTM でタグを作成**: GTM（コンテナ `GTM-TGFL4CKQ`）→「タグ」→「新規」。
3. **タグタイプ**:「Google アナリティクス: GA4 設定」を選択し、**測定 ID** を入力。
4. **トリガー**:「Initialization - All Pages」（無ければ「All Pages」）を割り当て。
5. **保存**。
6. **プレビュー**: GTM の「プレビュー」（Tag Assistant）で `https://toraco.jp` を開き、GA4 設定タグの発火を確認。
7. **公開**: GTM の「公開（Submit）」でコンテナを公開。
8. **計測確認**: GA4 の「リアルタイム」で自分のアクセスが計上されることを確認。

## 4. 変更時の注意

- 計測タグの追加・変更は原則 **GTM 側**で行い、コード変更を伴わない。
- コンテナ ID を変更する場合のみ `src/content/site.ts` の `gtmId` を更新する。
