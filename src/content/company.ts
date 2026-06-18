import type { Company } from '@/domains/company';

export const company: Company = {
  name: 'toraco株式会社',
  nameEn: 'toraco, Inc.',
  mission: '「やりたい」という原動力を、テクノロジーで実現する。',
  values: [
    {
      title: '責務の完遂',
      description: '自らの仕事に誇りを持ち、継続的に技術を高め続けます。',
    },
    {
      title: '顧客第一',
      description: '思いを持つ仲間やお客様を、積極的に助けます。',
    },
    {
      title: '失敗を恐れない',
      description: '自立して、社会課題の解決に挑み続けます。',
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
        'Web アプリケーション・システムの設計／開発／保守／運用、ラボ型開発、Web高速化、テスト自動化、AI駆動開発、YouTube「とらゼミ」運営',
    },
  ],
  representative: {
    name: '稲垣 貴映',
    nameKana: 'いながき たかあき',
    nameEn: 'Inagaki Takaaki',
    title: '代表取締役',
    bio: [
      '新卒で SIer に入社後、独学でプログラミングを習得し、フロントエンドエンジニアへ転身。',
      '2021年4月に toraco株式会社を設立し、代表取締役に就任。',
      'React / TypeScript を主軸に、近年は Cloudflare を中心としたエッジ・高速化領域にも注力。',
      'YouTube「とらゼミ」や登壇・執筆を通じて、Web エンジニアリングの知見を発信している。',
    ],
  },
};
