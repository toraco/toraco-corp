// 静的 News のドメインモデル（microCMS 廃止後はリポジトリ内で管理する）。
// データと取得関数は `src/content/news.ts`、整形は `src/utils/date.ts` の formatDate。

export const NEWS_CATEGORIES = [
  'お知らせ',
  'プレスリリース',
  'イベント',
  'メディア',
] as const;

export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export type News = {
  /** URL スラッグ（`/news/[slug]`） */
  slug: string;
  title: string;
  category: NewsCategory;
  /** 公開日（ISO 8601 文字列） */
  publishedAt: string;
  /** 本文（プレーン/簡易マークアップ） */
  body: string;
  /** サムネイル画像 URL（任意） */
  thumbnail?: string;
};
