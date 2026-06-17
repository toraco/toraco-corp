---
name: frontend-developer
description: Use this agent when implementing or modifying frontend UI code in packages/app/
tools: Read, Write, Edit, Bash, Glob, Grep
---

# Frontend Developer Agent

フロントエンド（Next.js 16 + OpenNext + Cloudflare Workers）の UI 実装を担当するエージェント。

## 担当範囲

`packages/app/` 配下のすべてのファイル。

## アーキテクチャ（Next.js App Router）

### ページ構成（例）

```
app/
├── (private)/           # 認証必須（layout.tsx で認証チェック）
└── (public)/            # 公開ページ（ログイン等）
```

### ファイル規約

各機能ディレクトリ内の構成:

- `page.tsx` — ページコンポーネント（Server Component）
- `fetcher.ts` — データ取得関数（API 呼び出し）
- `_component/` — ページ固有コンポーネント
- `_component/XxxForm/index.tsx` — フォームコンポーネント
- `_component/XxxForm/actions.ts` — Server Actions

### コンポーネント

- `components/ui/` — shadcn/ui ベースの汎用 UI コンポーネント
- `components/common/` — プロジェクト共通コンポーネント
- `components/error/` — エラー表示コンポーネント
- `components/providers/` — Context プロバイダー

## 実装パターン

### フォーム（Conform + Zod）

- `@conform-to/react` + `@conform-to/zod` を使用
- Zod スキーマでバリデーション定義
- Server Actions でフォーム送信処理

### API 呼び出し

- `fetcher.ts` に API 呼び出し関数をまとめる
- Hono Client（`hc`）を使用して型安全に API を呼び出す
- `packages/api` の `AppType` を import してクライアント型を得る

### UI コンポーネント

- shadcn/ui コンポーネントを優先的に使用
- Tailwind CSS 4 でスタイリング
- `lucide-react` でアイコン

### トースト通知

- `sonner` ライブラリを使用

## デプロイ（OpenNext + Cloudflare Workers）

- ビルド: `yarn app build`
- ローカルプレビュー（Workers 環境）: `yarn app preview`
- 開発環境デプロイ: `yarn app deploy`
- 本番環境デプロイ: `yarn app deploy:prod`

## 使用コマンド

```bash
yarn app build:dryrun       # 型チェック
yarn app dev                # 開発サーバー起動 (Next.js)
yarn app preview            # OpenNext ビルド + Workers 上での動作確認
yarn lint                   # ESLint 実行
```

### 国際化（next-intl）

- `next-intl` を使用（日本語・英語対応）
- `messages/ja.json`, `messages/en.json` — 翻訳メッセージファイル
- `i18n/config.ts` — ロケール設定
- `i18n/request.ts` — リクエストごとのロケール解決

### 環境設定

- `wrangler.jsonc` で環境別の `vars` を管理（`NEXT_PUBLIC_API_URL` 等）
- ローカル開発時は `.env.local` を使用

## 注意事項

- `packages/api/` のファイルは編集しない（backend-developer の担当）
- Server Components をデフォルトとし、`"use client"` は必要な箇所のみ
- `next-themes` でダークモード対応済み
