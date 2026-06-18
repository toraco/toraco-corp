# DESIGN.md — toraco株式会社 コーポレートサイト

> AI エージェントが一貫した UI を生成するためのデザイン仕様書。
> [awesome-design-md-jp](https://github.com/kzhrknt/awesome-design-md-jp) フォーマット準拠。
> 既存ブランド（ゴールド `#FACE03` / ブルー `#004AAD` / インク `#222222`）を shadcn/ui + Tailwind CSS v4 のトークンとして体系化したもの。

---

## 1. Visual Theme & Atmosphere

「"やりたい" という原動力をテクノロジーで実現する」をミッションに掲げる開発会社のコーポレートサイト。受託開発・ラボ型開発に加え、テスト自動化・AI駆動開発・運用監視自動化を提供し、開発事例（Works）を掲載する。YouTube「とらゼミ」での技術発信も行う。技術的な信頼感と、挑戦を後押しする前向きさを両立させる。

| 属性                | 値                                                                  |
| ------------------- | ------------------------------------------------------------------- |
| Design Philosophy   | Confident Craft — 技術的な誠実さと、挑戦を後押しする明るさ          |
| Keywords            | Energetic, Trustworthy, Clean, Tech-forward                         |
| Information Density | 低〜中密度（マーケティング LP。余白を活かしたセクション構成）       |
| Personality         | 前向き・誠実・モダン・親しみやすい                                  |

**ビジュアルの特徴:**

- シグネチャーのゴールド（`#FACE03`）をアクセント／CTA に、ブルー（`#004AAD`）をリンク・アクションに使う 2 色構成。ベースはインク（`#222222`）と白
- 装飾過多なグラデーション・影は避け、フラットでクリーンな面構成。アクセントとして広い余白とゴールドのワンポイント
- ライト／ダーク両対応。ダークは深いニュートラル（`#171716`）背景でゴールドを際立たせる

**レイアウト方針: モバイルファースト + センタリングコンテナ**

- 基準幅 360px から設計し、`sm` / `md` / `lg` で拡張する
- 管理画面と異なり、コンテンツは中央寄せの最大幅コンテナ（`max-w-screen-lg` ≒ 1024px、必要に応じ `xl` まで）に収める
- ヒーローや背景帯はフル幅、本文・カード群はコンテナ内に配置する

---

## 2. Color Palette & Roles

### Brand

| Token         | HEX       | Usage                                              |
| ------------- | --------- | -------------------------------------------------- |
| Brand Gold    | `#FACE03` | シグネチャー。CTA ボタン背景、アクセント、ハイライト |
| Brand Blue    | `#004AAD` | リンク、アクション、フォーカスリング、図表          |
| Ink           | `#222222` | 本文テキスト、ロゴ、ゴールド上のテキスト            |

> **アクセシビリティ最重要注記**: ゴールド `#FACE03` は白背景でのコントラストが極端に低い（約 1.3:1）。
>
> - **ゴールドは「背景」として使い、その上のテキストは必ずインク `#222222`（ダーク文字）にする**。白文字を載せない。
> - **本文中のリンク・テキストリンクにはゴールドを使わない**。リンク／アクション色はブルー `#004AAD`（白背景で約 8:1、AA 準拠）を用いる。
> - ゴールドを線・アイコン・小さな文字に使う場合は、視認性確保のため Gold 700 (`#8A6A00`) 以上の濃色を使う。

### Gold Scale

| Stop    | HEX           | Usage                                          |
| ------- | ------------- | ---------------------------------------------- |
| 50      | `#FFFCEB`     | セクション背景、ホバー背景、accent              |
| 100     | `#FFF6C2`     | 軽いハイライト、選択状態                        |
| 200     | `#FFEC85`     | バッジ、プログレストラック                      |
| 300     | `#FFE14D`     | ダークモードのアクセントテキスト                |
| **400** | **`#FACE03`** | **ブランドゴールド（CTA 背景、アクセント）**     |
| 500     | `#E0B800`     | ホバー時のゴールド                              |
| 600     | `#B88F00`     | サブアクセント                                  |
| 700     | `#8A6A00`     | ゴールド系テキスト・アイコン（白背景で視認可）  |
| 800     | `#5C4600`     | accent-foreground、濃いゴールド見出し           |
| 900     | `#3D2F00`     | 最も暗いゴールド                                |

### Blue Scale

| Stop    | HEX           | Usage                                  |
| ------- | ------------- | -------------------------------------- |
| 50      | `#E8F0FB`     | ブルー系の薄い背景                      |
| 100     | `#C7DCF5`     | 軽いハイライト                          |
| 200     | `#8FB8EB`     | ボーダー、ダークモードの薄ブルー        |
| 400     | `#2E6FD0`     | ホバー、図表                            |
| **600** | **`#004AAD`** | **リンク、アクション、ring（ライト）**  |
| 700     | `#003A87`     | ホバー時のブルー、濃い見出し            |
| 800     | `#002C66`     | 最も暗いブルー                          |
| Light   | `#5B9BFF`     | ダークモードのリンク／ring／info        |

### Neutral

| Stop | HEX       | Usage                                            |
| ---- | --------- | ------------------------------------------------ |
| 50   | `#F7F7F6` | 背景、muted、secondary                           |
| 100  | `#ECECEA` | ライトモード border / input                      |
| 200  | `#DCDCD9` | ボーダー、ディバイダー                           |
| 400  | `#A3A3A0` | プレースホルダ、ダークモード secondary text      |
| 500  | `#737370` | セカンダリテキスト（ライト）                     |
| 600  | `#525250` | アイコン、補助テキスト                           |
| 800  | `#2E2E2C` | ダークモード secondary / muted / input           |
| 900  | `#222222` | プライマリテキスト（ライト）、ダークモード card   |
| 950  | `#171716` | ダークモード background                          |

### Semantic

| Name    | Light     | Dark      | Usage                          |
| ------- | --------- | --------- | ------------------------------ |
| Success | `#2E7D32` | `#66BB6A` | 完了、成功                     |
| Danger  | `#DC2626` | `#EF4444` | エラー、destructive            |
| Warning | `#B45309` | `#F59E0B` | 注意（ブランドゴールドと区別） |
| Info    | `#004AAD` | `#5B9BFF` | 情報、ヘルプ                   |

> Warning にはゴールドではなく **オレンジ寄りのアンバー** を使う。ブランドゴールドと意味的・視覚的に混同させないため。

### Light Mode Token Map (`:root`)

| CSS Variable             | Value     | Tailwind Class                |
| ------------------------ | --------- | ----------------------------- |
| `--background`           | `#FFFFFF` | `bg-background`               |
| `--foreground`           | `#222222` | `text-foreground`             |
| `--card`                 | `#FFFFFF` | `bg-card`                     |
| `--card-foreground`      | `#222222` | `text-card-foreground`        |
| `--popover`              | `#FFFFFF` | `bg-popover`                  |
| `--popover-foreground`   | `#222222` | `text-popover-foreground`     |
| `--primary`              | `#FACE03` | `bg-primary`                  |
| `--primary-foreground`   | `#222222` | `text-primary-foreground`     |
| `--secondary`            | `#F7F7F6` | `bg-secondary`                |
| `--secondary-foreground` | `#222222` | `text-secondary-foreground`   |
| `--muted`                | `#F7F7F6` | `bg-muted`                    |
| `--muted-foreground`     | `#737370` | `text-muted-foreground`       |
| `--accent`               | `#FFFCEB` | `bg-accent`                   |
| `--accent-foreground`    | `#5C4600` | `text-accent-foreground`      |
| `--destructive`          | `#DC2626` | `bg-destructive`              |
| `--success`              | `#2E7D32` | `text-success` / `bg-success` |
| `--warning`              | `#B45309` | `text-warning` / `bg-warning` |
| `--info`                 | `#004AAD` | `text-info` / `bg-info`       |
| `--border`               | `#ECECEA` | `border-border`               |
| `--input`                | `#ECECEA` | `border-input`                |
| `--ring`                 | `#004AAD` | `ring-ring`                   |
| `--brand-gold`           | `#FACE03` | `bg-brand-gold`               |
| `--brand-blue`           | `#004AAD` | `text-brand-blue`             |

### Dark Mode Token Map (`.dark`)

| CSS Variable             | Value     |
| ------------------------ | --------- |
| `--background`           | `#171716` |
| `--foreground`           | `#F7F7F6` |
| `--card`                 | `#222222` |
| `--card-foreground`      | `#F7F7F6` |
| `--popover`              | `#222222` |
| `--popover-foreground`   | `#F7F7F6` |
| `--primary`              | `#FACE03` |
| `--primary-foreground`   | `#222222` |
| `--secondary`            | `#2E2E2C` |
| `--secondary-foreground` | `#F7F7F6` |
| `--muted`                | `#2E2E2C` |
| `--muted-foreground`     | `#A3A3A0` |
| `--accent`               | `#3A3320` |
| `--accent-foreground`    | `#FFE14D` |
| `--destructive`          | `#EF4444` |
| `--success`              | `#66BB6A` |
| `--warning`              | `#F59E0B` |
| `--info`                 | `#5B9BFF` |
| `--border`               | `#3D3D3B` |
| `--input`                | `#2E2E2C` |
| `--ring`                 | `#5B9BFF` |
| `--brand-gold`           | `#FACE03` |
| `--brand-blue`           | `#5B9BFF` |

### Chart Colors

| Token       | Light     | Dark      |
| ----------- | --------- | --------- |
| `--chart-1` | `#FACE03` | `#FACE03` |
| `--chart-2` | `#004AAD` | `#5B9BFF` |
| `--chart-3` | `#B88F00` | `#FFE14D` |
| `--chart-4` | `#2E6FD0` | `#2E6FD0` |
| `--chart-5` | `#737370` | `#A3A3A0` |

> 実際の値定義は `src/app/globals.css` の `:root` / `.dark` を単一の真実とする。本表と差異が出た場合は globals.css を優先し、本書を更新すること。

---

## 3. Typography Rules

### Font Families

```css
/* globals.css */
--font-sans:
  var(--font-inter), var(--font-noto-sans-jp), ui-sans-serif, system-ui,
  sans-serif;
```

| Role            | Font         | Fallback                                 | Weights       |
| --------------- | ------------ | ---------------------------------------- | ------------- |
| UI (EN/Numbers) | Inter        | system-ui, -apple-system, sans-serif     | 400, 500, 600, 700 |
| Japanese        | Noto Sans JP | "Hiragino Sans", "Yu Gothic", sans-serif | 400, 500, 700 |

**フォント読み込み:** `next/font/google` 経由で Inter (`--font-inter`) と Noto Sans JP (`--font-noto-sans-jp`) を読み込み、`layout.tsx` で CSS 変数として注入する。追加の font import は不要。

### Type Scale（マーケティング LP 向け）

| Token   | Size      | Weight | Line Height | Usage                       |
| ------- | --------- | ------ | ----------- | --------------------------- |
| Display | 48px      | 700    | 1.1         | ヒーロー見出し（`lg` 以上） |
| Hero    | 32px      | 700    | 1.2         | ヒーロー見出し（モバイル）  |
| H1      | 28px      | 700    | 1.25        | セクション見出し            |
| H2      | 22px      | 600    | 1.35        | サブ見出し                  |
| H3      | 18px      | 600    | 1.45        | カード見出し                |
| Body    | 16px      | 400    | 1.7         | 本文                        |
| Small   | 14px      | 400    | 1.6         | 補助テキスト・キャプション  |

> マーケティング LP のため本文は 16px を基準にする（管理画面の 14px より一段大きい）。

### Text Colors

| Role           | Light               | Dark                |
| -------------- | ------------------- | ------------------- |
| Primary Text   | Ink `#222222`       | Neutral 50 `#F7F7F6` |
| Secondary Text | Neutral 500 `#737370` | Neutral 400 `#A3A3A0` |
| Link / Action  | Blue 600 `#004AAD`  | Blue Light `#5B9BFF` |
| Placeholder    | Neutral 400 `#A3A3A0` | Neutral 500 `#737370` |

### Japanese Typography Rules

```css
word-break: break-all;
overflow-wrap: anywhere;
line-break: strict;
font-feature-settings: 'palt'; /* 見出しのプロポーショナル詰め */
text-wrap: balance;            /* 見出しの孤立助詞防止 */
```

- 日本語本文は `line-height >= 1.7` を基準にする
- 見出しは `letter-spacing: -0.02em` で引き締め可。本文は `0`
- 純粋な `#000000` はテキストに使わない（インク `#222222` を使う）

---

## 4. Component Stylings

> shadcn/ui (new-york) を基盤とする。新規コンポーネントを作る前に既存の `src/components/ui/` を確認すること。

### Buttons

| Variant     | Background          | Text                | Border        | Radius | Height |
| ----------- | ------------------- | ------------------- | ------------- | ------ | ------ |
| Primary     | Gold `#FACE03`      | Ink `#222222`       | none          | 8px    | 40px   |
| Secondary   | Neutral 50 `#F7F7F6`| Ink `#222222`       | Border 1px    | 8px    | 40px   |
| Outline/Link| transparent         | Blue `#004AAD`      | Blue 1px / none | 8px  | 40px   |
| Destructive | Danger `#DC2626`    | White `#FFFFFF`     | none          | 8px    | 40px   |
| Ghost       | transparent         | Ink `#222222`       | none          | 8px    | 40px   |

> **Primary はゴールド背景 + インク文字**（白文字にしない）。CTA はゴールド、テキストリンク・補助アクションはブルー。
> **タップ領域**: モバイルではボタンを `min-h-11`（44px）以上で確保する。

### Links

- インライン／本文リンクは **ブルー `#004AAD`**（ダーク: `#5B9BFF`）。`underline` か `hover:underline`
- ナビゲーションリンクは `text-foreground` + `hover:text-brand-blue`

### Cards

| Property      | Light                    | Dark                     |
| ------------- | ------------------------ | ------------------------ |
| Background    | `#FFFFFF`                | Neutral 900 `#222222`    |
| Border        | Neutral 100 `#ECECEA` 1px| Neutral 700 `#3D3D3B` 1px|
| Border Radius | 12px                     | 12px                     |
| Padding       | 24px                     | 24px                     |

### Badges / Status

| Status  | Background Light | Text Light | Background Dark | Text Dark |
| ------- | ---------------- | ---------- | --------------- | --------- |
| Brand   | `#FFFCEB`        | `#5C4600`  | `#3A3320`       | `#FFE14D` |
| Info    | `#E8F0FB`        | `#003A87`  | `#1E3A5F`       | `#5B9BFF` |
| Danger  | `#FDE8E8`        | `#B91C1C`  | `#5F1A1A`       | `#F87171` |
| Warning | `#FEF0E2`        | `#9A4A0A`  | `#4A3008`       | `#F59E0B` |
| Success | `#E8F5E9`        | `#2E7D32`  | `#1A3D0E`       | `#66BB6A` |

### Icons

| Property        | Value                                                  |
| --------------- | ------------------------------------------------------ |
| Library         | **Lucide Icons (`lucide-react`)**                      |
| Stroke Width    | 1.75px（既定）/ 1.5px（大サイズ）                      |
| Line Cap / Join | Round / Round                                          |
| Navigation Size | 20px                                                   |
| Action / Feature Size | 24px                                             |
| Inline Size     | 16px                                                   |
| Color           | Neutral 600 `#525250` / Brand Blue / Gold 700（文脈依存）|

#### Brand Icons（lucide にないもの）

YouTube・X・GitHub・Zenn などのブランドマークは lucide に含まれないため、**inline SVG（[simple-icons](https://simpleicons.org/) 由来のパス）** をラップした専用コンポーネント（`BrandIcon`）で対応する。

#### Icon Migration Map（remixicon → lucide）

旧サイトで使用していた remixicon を以下のとおり lucide に対応付ける。

| 旧 (remixicon)                | 新 (lucide-react)   | 用途（旧サイト）          |
| ----------------------------- | ------------------- | ------------------------- |
| `ri-building-line`            | `Building2`         | toB 向け SaaS             |
| `ri-code-box-line`            | `Code2`             | モダンフロントエンド      |
| `ri-dashboard-line`           | `LayoutDashboard`   | 社内システム・管理画面    |
| `ri-global-line`              | `Globe`             | CDN の活用                |
| `ri-money-dollar-circle-line` | `CircleDollarSign`  | 柔軟な料金体系            |
| `ri-robot-line`               | `Bot`               | 生成 AI 開発              |
| `ri-server-line`              | `Server`            | API 開発                  |
| `ri-shield-check-line`        | `ShieldCheck`       | 品質の担保                |
| `ri-speed-up-line`            | `Gauge`             | 改善点の調査分析          |
| `ri-team-line`                | `Users`             | チーム一体での開発        |
| `ri-time-line`                | `Clock`             | （汎用）                  |
| `ri-user-smile-line`          | `Smile`             | toC 向け Web サービス     |
| `ri-folder-line`              | `Folder`            | （汎用）                  |
| `ri-youtube-line`             | **brand SVG**       | YouTube チャンネル（とらゼミ） |

> Discord / コミュニティ案内は廃止。フッターの SNS は YouTube / X / GitHub / Zenn を `BrandIcon` で表示する。

---

## 5. Layout Principles

### Spacing Scale (4px base grid)

| Token | Size | Usage                          |
| ----- | ---- | ------------------------------ |
| xs    | 4px  | アイコンとラベルの間隔         |
| sm    | 8px  | 要素内パディング               |
| md    | 12px | カード内のセクション間隔       |
| lg    | 16px | カード間、要素間               |
| xl    | 24px | カードパディング、小セクション |
| 2xl   | 32px | セクション内の塊               |
| 3xl   | 48px | セクション間（モバイル）       |
| 4xl   | 80px | セクション間（`lg` 以上）      |

### Border Radius

| Token | Size | Computed From               |
| ----- | ---- | --------------------------- |
| sm    | 6px  | `calc(var(--radius) - 4px)` |
| md    | 8px  | `calc(var(--radius) - 2px)` |
| lg    | 10px | `var(--radius)` (0.625rem)  |
| xl    | 14px | `calc(var(--radius) + 4px)` |

### Site Layout

- **Container**: 中央寄せ `max-w-screen-lg`（1024px）、左右パディング モバイル lg(16px) / `lg` 以上 xl(24px)
- **Header**: 上部固定。ロゴ（左）+ ナビ（Services / Works / About / News / Contact）+ テーマ切替。モバイルはハンバーガー → ドロワー（Sheet）
- **Footer**: ロゴ、コピーライト、SNS（YouTube / X / GitHub / Zenn）、各種リンク
- **Sections**: `id` アンカー（`#services` 等）でナビからスクロール。セクション間は 3xl〜4xl の余白
- **Hero / 背景帯**: フル幅。内側コンテンツはコンテナ幅

---

## 6. Depth & Elevation

フラットを基本とし、影は控えめに。

| Level | Shadow                        | Use Case                        |
| ----- | ----------------------------- | ------------------------------- |
| 0     | none                          | ページ背景、フラット要素        |
| 1     | border only (1px)             | カード、パネル                  |
| 2     | `0 1px 3px rgba(0,0,0,0.08)`  | ポップオーバー、ドロップダウン  |
| 3     | `0 4px 16px rgba(0,0,0,0.12)` | モーダル、ドロワー、固定ヘッダー|

**Focus indicator**: `ring` — Blue `#004AAD` 2px（ライト）/ Blue Light `#5B9BFF` 2px（ダーク）。影ではなくリングで深度を表現する。

---

## 7. Do's and Don'ts

### Do

- 定義済みの HEX 値（globals.css のトークン）を CSS 変数経由で参照する（`bg-primary` / `text-foreground` / `border-border`）
- **ゴールドは背景に使い、その上の文字はインク `#222222`**（ダーク文字）にする
- **本文リンク・アクション色はブルー `#004AAD`** を使う
- アイコンは Lucide を使用する（stroke 1.75px, round joins）。ブランドアイコンは inline SVG
- className の合成には `cn()`（`@/lib/cn`）を使用する
- Light / Dark 両モードを必ずサポートする
- 日本語本文に `word-break: break-all`、見出しに `font-feature-settings: "palt"` を適用する
- 4px グリッドに沿ったスペーシングのみ使用する
- モバイル（基準幅 360px）から設計し、`sm` / `md` / `lg` で拡張する
- インタラクティブ要素のヒット領域は 44×44px 以上を確保する（`min-h-11`）

### Don't

- **ゴールド背景に白文字を載せない**（コントラスト不足）
- **本文リンクにゴールドを使わない**（ブルーを使う）
- ロゴにドロップシャドウ・グラデーション・アウトラインを追加しない
- 定義済みパレット外のカラーを追加しない
- 日本語のみの文字列に Inter のみを指定しない（Noto Sans JP にフォールバックさせる）
- スペーシングに端数ピクセルを使わない
- `line-height` を 1.2 未満にしない（日本語の可読性低下）
- 純粋な `#000000` をテキストに使わない（インク `#222222`）
- Warning（アンバー）と Brand Gold を隣接させ混同させない
- shadcn/ui にあるコンポーネントを自作しない（既存を確認する）

---

## 8. Responsive Behavior

### Breakpoints (Tailwind v4 defaults)

| Token | Width  |
| ----- | ------ |
| sm    | 640px  |
| md    | 768px  |
| lg    | 1024px |
| xl    | 1280px |
| 2xl   | 1536px |

### Mobile-First Approach

- **基準幅**: 360px。**最適表示幅（モバイル）**: 390〜430px
- base はモバイルで記述し、`sm` / `md` / `lg` で上書き拡張する
- **ナビゲーション**: モバイルはハンバーガー → ドロワー（Sheet）、`md` 以上で水平ナビ
- **グリッド**: カード群はモバイル 1 カラム、`md` で 2 カラム、`lg` で 3 カラム
- **タッチターゲット**: 最小 44×44px（`min-h-11` / `min-w-11`）

### Japanese Text Responsive

- 日本語は `word-break: break-all` で折り返しを制御
- 本文は 16px を維持（14px 未満に縮小しない）

---

## 9. Agent Prompt Guide

### Quick Reference Card

| Token            | Value                                       |
| ---------------- | ------------------------------------------- |
| Brand Gold       | `#FACE03`（背景のみ・上の文字はインク）     |
| Brand Blue       | `#004AAD`（リンク・アクション）             |
| Text Color       | `#222222`（light）/ `#F7F7F6`（dark）       |
| Background       | `#FFFFFF`（light）/ `#171716`（dark）       |
| Font (UI)        | Inter + Noto Sans JP                        |
| Body Size        | 16px / line-height 1.7                      |
| Base Spacing     | 4px grid                                    |
| Border Radius    | 8px（既定）/ 12px（カード）                 |
| Container        | `max-w-screen-lg`（中央寄せ）               |
| Layout           | Mobile-First（基準 360px → sm/md/lg）        |
| Tap Target       | 44×44px 以上（`min-h-11` / `min-w-11`）     |

### For `frontend-developer`

- カラーは CSS 変数経由で参照する。生の HEX を Tailwind クラスに直書きしない（`bg-primary` / `text-foreground` / `border-border` / `text-brand-blue`）
- shadcn/ui (radix-ui + CVA) コンポーネントを優先的に使う
- className の合成には `cn()`（`@/lib/cn`）を使う
- フォントは `layout.tsx` で読み込み済み。追加 import は不要
- アイコンは `lucide-react`。ブランドアイコンは専用 inline SVG コンポーネント

### Domain Context Hints

| Scenario                       | Color             | Icon (lucide)      |
| ------------------------------ | ----------------- | ------------------ |
| Web アプリ／システム開発       | Brand Gold        | `Code2`            |
| toC 向け Web サービス          | Brand Blue        | `Smile`            |
| toB 向け SaaS                  | Brand Blue        | `Building2`        |
| 社内システム・管理画面         | Neutral           | `LayoutDashboard`  |
| ラボ型開発・チーム             | Brand Gold        | `Users`            |
| 品質の担保                     | Success           | `ShieldCheck`      |
| 料金・コスト                   | Neutral           | `CircleDollarSign` |
| API 開発                       | Brand Blue        | `Server`           |
| 生成 AI 開発                   | Brand Gold        | `Bot`              |
| テスト自動化                   | Brand Gold        | `FlaskConical`     |
| AI駆動開発                     | Brand Gold        | `Bot`              |
| 運用監視自動化                 | Brand Blue        | `Activity`         |
| YouTube「とらゼミ」            | `#FF0000`（brand）| brand SVG (YouTube)|

---

## References

| File                              | Description                                       |
| --------------------------------- | ------------------------------------------------- |
| `src/app/globals.css`             | CSS 変数定義（Light / Dark）。トークンの真実      |
| `src/app/layout.tsx`              | フォントインポート（Inter, Noto Sans JP）・Provider |
| `src/lib/cn.ts`                   | `cn()` className 合成ユーティリティ               |
| `src/components/ui/`              | shadcn/ui プリミティブ                            |
| `components.json`                 | shadcn 設定（new-york / lucide）                  |
| `public/meta/`                    | favicon・manifest 等のメタアセット                |
| `public/images/`                  | ロゴ・ヒーロー画像・代表者写真（`profile.webp`） |
