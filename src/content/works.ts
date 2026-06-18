import type { Work } from '@/domains/works';

// 開発事例。匿名事例（large-scale-platform / d2c-multi-brand）は
// 業種が特定されうる語（広告 / SSP / 通信 / WiFi 等）を本文に含めない。
export const works: Work[] = [
  {
    slug: 'etoe',
    title: 'etoe sauna & hotel 予約・施設管理プラットフォーム',
    summary:
      '宿泊予約から施設運営までを一気通貫で支える PMS を、フロントエンドからクラウドインフラまで内製しました。',
    isAnonymous: false,
    clientName: 'etoe sauna & hotel',
    url: 'https://etoehotel.com',
    challenge:
      'OTA と自社予約サイトの在庫を二重管理する負担や、入退室・清掃オペレーションの煩雑さといった、宿泊施設運営の現場課題を解消する必要がありました。',
    solution:
      '宿泊予約フロント・施設管理画面・清掃スタッフ向け UI・物理入退室（スマートロック）連携を内製し、OTA チャネルマネージャ・Stripe 決済・LINE 連携を統合。インフラは AWS CDK でコード化し、在庫生成や滞在延長課金などの定型業務をサーバーレスで自動化しました。さらに本番運用では、エラーログを検知して Slack へ即時通知し、生成 AI が原因の一次調査までを自動で行う運用監視基盤も構築しています。',
    results: [
      '予約・在庫・決済・入退室・清掃を単一プラットフォームで一元管理',
      'OTA と自社予約の在庫同期を自動化し、二重管理を解消',
      'AWS CDK による IaC とサーバーレスで運用業務を自動化',
      '生成 AI による運用監視（エラー検知・一次調査）で障害対応の初動を高速化',
    ],
    techTags: [
      'Next.js',
      'React',
      'Hono',
      'Prisma',
      'MySQL',
      'AWS CDK',
      'ECS Fargate',
      'Lambda',
      'CloudWatch',
      'Stripe',
      'LINE Messaging API',
    ],
    scope: [
      '要件定義',
      'フロントエンド',
      'バックエンド API',
      'データベース設計',
      'AWS インフラ（IaC）',
      '外部システム連携',
      '運用監視（可観測性）',
    ],
    serviceSlugs: ['contract-development', 'monitoring-automation'],
  },
  {
    slug: 'large-scale-platform',
    title: '大規模基幹システムの継続開発・モダナイズ',
    summary:
      '14年以上稼働する大規模 Web プラットフォームの基幹システムを、専任チームで継続的に改善・モダナイズしています。',
    isAnonymous: true,
    challenge:
      '多言語・多世代の技術が混在する大規模なレガシーシステムを、サービスを止めることなく改善し続ける必要がありました。',
    solution:
      'ラボ型の専任チームとして、フロントエンドからバックエンド、データ基盤、インフラまでを横断的に担当。レガシーから現行スタックへの段階的なリプレースを継続しながら、新機能開発と保守を並行して進めています。',
    results: [
      '14年以上にわたり継続的に開発・保守を担当',
      '累計約4万コミット・延べ183名規模の開発に対応',
      'レガシーを止めずに段階的なモダナイズを推進',
    ],
    techTags: [
      'PHP',
      'Go',
      'TypeScript',
      'GraphQL',
      'MySQL',
      '検索エンジン',
      'AWS ECS',
      'GitHub Actions',
      'Datadog',
      'OpenTelemetry',
    ],
    scope: [
      'フロントエンド',
      'バックエンド',
      'データ基盤',
      'インフラ',
      '可観測性',
      '継続的リプレース',
    ],
    serviceSlugs: ['lab-development'],
  },
  {
    slug: 'd2c-multi-brand',
    title: '複数ブランド横断の開発・業務自動化 継続支援',
    summary:
      'D2C 事業者の複数ブランドを共通基盤で支え、集客から申込・決済・バックオフィス業務まで一気通貫で継続支援しています。',
    isAnonymous: true,
    challenge:
      '複数ブランドのサービスを素早く立ち上げ・改善しつつ、請求や督促といった定型業務の負担を軽減する必要がありました。',
    solution:
      '申込アプリを共通アーキテクチャでテンプレート化して横展開し、本人確認 OCR・決済・ノーコード業務基盤（kintone）連携を実装。請求・督促などのバックオフィス業務はサーバーレスで自動化し、一部は生成 AI による運用監視も組み込みました。集客 LP やインフラ移行（IaC）まで幅広く対応しています。',
    results: [
      '複数ブランドを共通基盤で横展開し継続運用',
      '本人確認・決済・CRM 連携を備えた申込システムを提供',
      '請求・督促業務をサーバーレスで自動化（一部に生成 AI 監視）',
    ],
    techTags: [
      'Next.js',
      'Hono',
      'Prisma',
      'AWS CDK',
      'Lambda',
      'kintone 連携',
      'Amazon Bedrock',
      'S3 / CloudFront',
    ],
    scope: [
      '集客 LP',
      '申込アプリ',
      '決済・本人確認',
      '業務自動化',
      'インフラ移行（IaC）',
    ],
    serviceSlugs: ['lab-development', 'ai-driven-development'],
  },
];

export const getWorkBySlug = (slug: string): Work | undefined =>
  works.find((work) => work.slug === slug);
