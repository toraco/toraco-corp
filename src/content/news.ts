import type { News } from '@/domains/news';

// 静的 News。更新頻度が低いためリポジトリ内で管理する。
const newsItems: News[] = [
  {
    slug: 'corporate-site-renewal',
    title: 'コーポレートサイトをリニューアルしました',
    category: 'お知らせ',
    publishedAt: '2026-06-18',
    body: 'toraco株式会社のコーポレートサイトを全面リニューアルしました。開発事例やサービス内容を新たに掲載しています。',
  },
  {
    slug: 'youtube-toragemi',
    title: 'YouTube「とらゼミ」で技術コンテンツを発信しています',
    category: 'メディア',
    publishedAt: '2025-12-01',
    body: '代表の稲垣が中心となり、YouTube チャンネル「とらゼミ」で実践的な Web エンジニアリングの講座を公開しています。',
  },
  {
    slug: 'company-established',
    title: 'toraco株式会社を設立しました',
    category: 'プレスリリース',
    publishedAt: '2021-04-23',
    body: '「やりたい」という原動力をテクノロジーで実現することをミッションに、toraco株式会社を設立しました。',
  },
];

/** 公開日（publishedAt）の降順で一覧を返す */
export const getNewsList = (): News[] =>
  [...newsItems].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

/** slug に一致する記事を返す。無ければ null */
export const getNewsBySlug = (slug: string): News | null =>
  newsItems.find((news) => news.slug === slug) ?? null;
