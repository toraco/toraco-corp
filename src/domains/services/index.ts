// サービスのドメインモデル。データと取得関数は `src/content/services.ts`。

export type ServiceFeature = {
  title: string;
  description: string;
  /** lucide アイコン名 */
  icon: string;
};

/** サービス内で紹介する匿名の実例（例: テスト自動化の導入事例） */
export type ServiceExample = {
  title: string;
  description: string;
};

export type Service = {
  /** URL スラッグ / アンカー（`/services#<slug>`） */
  slug: string;
  /** サービス名 */
  name: string;
  /** 一覧用の一文キャッチ */
  tagline: string;
  /** 詳細説明 */
  description: string;
  /** lucide アイコン名 */
  icon: string;
  /** 特徴 */
  features: ServiceFeature[];
  /** 匿名の実例（任意） */
  examples?: ServiceExample[];
  /** 関連事例の slug（`src/content/works.ts`） */
  workSlugs?: string[];
};
