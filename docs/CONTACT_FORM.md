# CONTACT_FORM.md — お問い合わせフォーム仕様

`/contact` のフォームと、送信を処理する Route Handler `/api/contact` の仕様。実装詳細は扱わない。

## 1. 概要

フォーム送信時に、サーバー側で以下を行う。

1. 入力値を検証する（zod）
2. Cloudflare Turnstile のトークンを検証する
3. Slack の Incoming Webhook へ通知する
4. 送信者へ自動返信メールを送る（Amazon SES）
5. 結果を JSON で返す

## 2. 入力項目

| 項目 | 必須 | 備考 |
| --- | --- | --- |
| お名前 | ○ | |
| 会社名 | | 任意 |
| メールアドレス | ○ | 形式チェックあり |
| 電話番号 | | 任意 |
| お問い合わせ種別 | ○ | 下記の選択肢から 1 つ |
| お問い合わせ内容 | ○ | |

お問い合わせ種別: 開発のご相談 / テスト自動化 / AI駆動開発 / 採用・協業 / その他

## 3. 処理パイプラインとエラー方針

| 段階 | 失敗時の応答 | 後続 |
| --- | --- | --- |
| 入力検証 | 400（フィールド別エラー） | 中断 |
| Turnstile 検証 | 400 | 中断 |
| Slack 通知 | 502 | SES を実行しない |
| SES 自動返信 | 200（warning 付き） | best-effort（受付は成立） |

- **Slack 通知を成功条件**とする（社内が受信できることを最優先）。
- **SES 自動返信は best-effort**。失敗してもユーザーには成功として応答し、warning を返す。
- スパム対策として Cloudflare Turnstile を用いる。

## 4. 環境変数

| 変数名 | 区分 | 用途 |
| --- | --- | --- |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | 公開（ビルド時インライン） | Turnstile ウィジェットのサイトキー |
| `TURNSTILE_SECRET_KEY` | secret | Turnstile のサーバ側検証 |
| `SLACK_WEBHOOK_URL` | secret | Slack 通知先の Incoming Webhook |
| `SES_ACCESS_KEY_ID` | secret | Amazon SES 認証情報 |
| `SES_SECRET_ACCESS_KEY` | secret | Amazon SES 認証情報 |
| `SES_REGION` | vars | SES リージョン |
| `SES_FROM_ADDRESS` | vars | 自動返信の送信元（検証済みアドレス） |
| `SES_INTERNAL_BCC` | vars（任意） | 社内コピー宛先 |

- secret は `wrangler secret put <NAME>` で投入する。
- vars は `wrangler.jsonc` の `vars` で管理する。
- 公開キーはビルド環境（CI / ローカルの `.env.local`）に渡す。

## 5. デプロイ時の準備

- **Amazon SES**: 送信元アドレスの検証、DKIM 用 DNS レコードの追加、サンドボックス解除。
- **Slack**: 通知先チャンネルの Incoming Webhook を発行。
- **Cloudflare Turnstile**: サイトキー / シークレットキーを発行。
