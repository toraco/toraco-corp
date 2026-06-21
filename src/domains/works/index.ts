// 開発事例（Works）のドメインモデル。
// すべて社名・サービス名・固有 URL を伏せた匿名事例として掲載する。
// データと取得関数は `src/content/works.ts`。

export type Work = {
  /** URL スラッグ（`/works/[slug]`） */
  slug: string;
  /** 事例タイトル */
  title: string;
  /** 一覧・抜粋用の短い説明 */
  summary: string;
  /** 実名公開可なら false、匿名なら true */
  isAnonymous: boolean;
  /** 実名公開時のクライアント名（匿名時は undefined） */
  clientName?: string;
  /** 公開 URL（実名公開時のみ） */
  url?: string;
  /** 課題 */
  challenge: string;
  /** toraco の対応 */
  solution: string;
  /** 成果（箇条書き） */
  results: string[];
  /** 技術タグ */
  techTags: string[];
  /** 提供範囲 */
  scope: string[];
  /** 関連サービスの slug（`src/content/services.ts`） */
  serviceSlugs: string[];
};
