import type { Company } from '@/domains/company';

export const company: Company = {
  name: 'toraco株式会社',
  nameEn: 'toraco, Inc.',
  mission: '「やりたい」という原動力を、テクノロジーで実現する。',
  values: [
    {
      title: 'Be proud',
      description:
        '責務を果たし、自らの仕事に誇りを持とう。ただし、誇りを持つことと慢心は違う。”やりたいけどできない” を社会から1つでも減らすために、常に技術力を磨いていこう。',
    },
    {
      title: 'Be cooperative',
      description: '“やりたい” という思いを持つ仲間やお客様を積極的に助けよう。',
    },
    {
      title: 'Be independent',
      description:
        '自立 ( = 自らの “やりたい” を実現した状態 ) で社会の ”やりたい” を実現していこう。',
    },
  ],
  profile: [
    { label: '社名', value: 'toraco株式会社（toraco, Inc.）' },
    { label: '設立', value: '2021年4月23日' },
    { label: '資本金', value: '700万円' },
    { label: '代表者', value: '代表取締役 稲垣 貴映' },
    {
      label: '所在地',
      value: '〒101-0041 東京都千代田区神田須田町2-2-2 神田須田町ビル8階',
    },
    {
      label: '事業内容',
      value:
        'Web アプリケーション・システムの設計／開発／保守／運用、ラボ型開発、テスト自動化、AI駆動開発、運用監視自動化、YouTube「とらゼミ」運営',
    },
  ],
  representative: {
    name: '稲垣 貴映',
    nameKana: 'いながき たかあき',
    nameEn: 'Inagaki Takaaki',
    title: '代表取締役',
    photo: {
      src: '/images/profile.webp',
      alt: '稲垣 貴映',
      width: 800,
      height: 1000,
    },
    bio: [
      '2021年4月に toraco株式会社を創業し、代表取締役に就任。',
      'TypeScript / Go / Python が主な開発言語であり、AWS / GCP / Cloudflare といったクラウドインフラの知見も豊富にある。フロントエンド/バックエンド/インフラの分野を横断して開発することが得意。',
      '受託開発・ラボ型開発に加え、テスト自動化・AI駆動開発・運用監視自動化の領域でチームを率いる。',
      'YouTube「とらゼミ」やオンライン講座（Schoo）への登壇を通じて、Web エンジニアリングの知見を発信している。',
    ],
  },
};
