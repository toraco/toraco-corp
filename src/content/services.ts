import type { Service } from '@/domains/services';

export const services: Service[] = [
  {
    slug: 'contract-development',
    name: '受託開発',
    tagline:
      'ビジネス課題に合わせた最適な Web ソリューションを、要件定義からインフラまで一貫して。',
    description:
      '一般消費者向けの Web サービスから企業向け SaaS、社内システムまで幅広い開発実績があります。フロントエンド・バックエンド・データベース・クラウドインフラまで一気通貫で内製します。',
    icon: 'Code2',
    features: [
      {
        title: 'toC 向け Web サービス',
        description: 'ユーザー体験を重視した、魅力的な Web サービスを構築',
        icon: 'Smile',
      },
      {
        title: 'toB 向け SaaS',
        description: '業務効率を高める、スケーラブルな SaaS プラットフォーム',
        icon: 'Building2',
      },
      {
        title: '社内システム・管理画面',
        description: '業務フローに最適化された、使いやすい管理システム',
        icon: 'LayoutDashboard',
      },
    ],
    workSlugs: ['etoe'],
  },
  {
    slug: 'lab-development',
    name: 'ラボ型開発',
    tagline: '必要なスキルを持つ専任チームで、継続的に成果を出す開発体制を。',
    description:
      'プロジェクトの規模や要件に応じて、必要なスキルを持つチームメンバーを柔軟に組み合わせ、高品質な開発を実現します。単なる人材派遣ではなく、チームとして成果を出すことにこだわります。',
    icon: 'Users',
    features: [
      {
        title: 'チーム一体での開発',
        description: 'PM・エンジニア・デザイナーが連携して推進',
        icon: 'Users',
      },
      {
        title: '品質の担保',
        description: 'チームでのレビューと継続的な品質管理',
        icon: 'ShieldCheck',
      },
      {
        title: '柔軟な体制',
        description: '稼働量や要件に応じてスケールする開発体制',
        icon: 'Settings2',
      },
    ],
    workSlugs: ['large-scale-platform', 'd2c-multi-brand'],
  },
  {
    slug: 'web-performance',
    name: 'Web高速化',
    tagline: 'ユーザー体験と SEO を両立する、Web サイトのパフォーマンス改善。',
    description:
      '最新のフロントエンド技術と CDN を活用し、高速で快適な Web サイトを構築します。表示速度の改善は、ユーザー体験と検索エンジン評価の両面で効果を発揮します。',
    icon: 'Gauge',
    features: [
      {
        title: 'モダンフロントエンド技術',
        description: 'Next.js・React 等を活用した最適化',
        icon: 'Code2',
      },
      {
        title: 'CDN の活用',
        description: '世界中どこでも高速なアクセスを実現',
        icon: 'Globe',
      },
      {
        title: '改善点の調査分析',
        description: '詳細なパフォーマンス分析と改善提案',
        icon: 'Gauge',
      },
    ],
  },
  {
    slug: 'test-automation',
    name: 'テスト自動化',
    tagline: 'E2E / VRT を CI に組み込み、手動 QA の負担を継続的に削減。',
    description:
      'Playwright を用いた E2E テスト・ビジュアルリグレッションテスト（VRT）・LINE ミニアプリ（LIFF）テストを整備し、CI/CD に組み込みます。リリースのたびに繰り返される回帰テストを自動化し、品質を保ちながら開発スピードを高めます。AI（Claude Code / Playwright MCP）を活用してテスト生成を加速します。',
    icon: 'FlaskConical',
    features: [
      {
        title: 'E2E テスト自動化',
        description: 'Playwright で画面操作・業務フローを自動検証',
        icon: 'MousePointerClick',
      },
      {
        title: 'ビジュアルリグレッション',
        description: 'スクリーンショット比較で UI 崩れを自動検知',
        icon: 'Eye',
      },
      {
        title: 'CI/CD 組み込み',
        description: 'PR ごとの品質ゲートでデグレを早期発見',
        icon: 'GitPullRequest',
      },
    ],
    examples: [
      {
        title: '薬局向け LINE アプリの E2E 自動化',
        description:
          'LINE ミニアプリ（LIFF）と Web 管理画面の回帰テストを自動化し、手動回帰テストの工数を約66%削減。AI を活用したテスト生成で導入を加速しました。',
      },
    ],
  },
  {
    slug: 'ai-driven-development',
    name: 'AI駆動開発',
    tagline: '生成 AI を開発プロセスとプロダクトの両面に取り入れ、価値提供を加速。',
    description:
      'Claude Code を活用した開発の高速化、AI エージェント／MCP の運用設計、生成 AI を組み込んだ機能実装や運用監視まで対応します。日々の受託・ラボ型開発の現場で AI を実践的に活用しています。',
    icon: 'Bot',
    features: [
      {
        title: 'AI による開発高速化',
        description: 'Claude Code を用いた実装・テスト・レビューの効率化',
        icon: 'Sparkles',
      },
      {
        title: 'AI エージェント / MCP 運用',
        description: 'マルチモデルのエージェント設計と運用',
        icon: 'Bot',
      },
      {
        title: '生成 AI 機能の実装',
        description: 'プロダクトへの生成 AI 組み込み・運用監視（Amazon Bedrock 等）',
        icon: 'BrainCircuit',
      },
    ],
    workSlugs: ['d2c-multi-brand'],
  },
];

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((service) => service.slug === slug);
