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
    slug: 'test-automation',
    name: 'テスト自動化',
    tagline: 'E2E / VRT を CI に組み込み、手動 QA の負担を継続的に削減。',
    description:
      'Playwright を用いた E2E テスト・ビジュアルリグレッションテスト（VRT）を整備し、CI/CD に組み込みます。リリースのたびに繰り返される回帰テストを自動化し、品質を保ちながら開発スピードを高めます。AI（Claude Code / Playwright MCP）を活用してテスト生成を加速します。',
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
    tagline: 'AI 駆動で開発できるチームへ。基盤構築から定着まで伴走支援。',
    description:
      'Claude Code をはじめとする生成 AI を開発プロセスに定着させるための、基盤構築とコンサルティングを提供します。現状のワークフロー分析・ツール選定から、Claude Code / MCP / CI への統合、コーディング規約やスキルの整備、チームへの教育・運用ルール策定までを伴走支援し、AI 駆動開発を自走できる体制づくりをご支援します。',
    icon: 'Bot',
    features: [
      {
        title: 'AI 駆動開発の導入コンサルティング',
        description: '現状のワークフロー分析からツール選定・運用設計まで伴走',
        icon: 'Sparkles',
      },
      {
        title: '開発基盤の構築',
        description: 'Claude Code / MCP / CI への統合、規約・スキルの整備',
        icon: 'Settings2',
      },
      {
        title: '定着・内製化支援',
        description: 'チーム教育と運用ルール整備で AI 駆動開発の自走を支援',
        icon: 'Users',
      },
    ],
    workSlugs: ['d2c-multi-brand'],
  },
  {
    slug: 'monitoring-automation',
    name: '運用監視自動化',
    tagline:
      'エラー検知から原因の一次調査まで。AI を活用して運用監視を自動化。',
    description:
      'アプリケーションのエラーを検知して即座に通知し、生成 AI が原因の一次調査（影響範囲・原因仮説・修正方針の提示）までを自動で行う運用監視基盤を構築します。外部 SaaS に依存せず、クラウドのマネージドサービスと生成 AI を組み合わせ、障害対応の初動を高速化し、運用負荷を継続的に削減します。',
    icon: 'Activity',
    features: [
      {
        title: 'エラー検知と即時通知',
        description: '構造化ログやメトリクスの異常を検知し Slack へ即時通知',
        icon: 'BellRing',
      },
      {
        title: 'AI による一次調査',
        description:
          '生成 AI がソースを横断調査し、原因仮説・影響範囲・修正方針を提示',
        icon: 'BrainCircuit',
      },
      {
        title: 'クラウドネイティブな監視基盤',
        description:
          'マネージドサービスで構築し、重複通知の抑制や自己監視まで作り込み',
        icon: 'Cloud',
      },
    ],
    examples: [
      {
        title: 'サウナ&ホテル「etoe」の運用監視・AI 一次調査自動化',
        description:
          'エラーログを検知して Slack に即時通知し、生成 AI（Claude）がソースコードを横断調査して原因仮説・影響範囲・修正方針を同じスレッドへ自動投稿。GitHub Issue 化までを自動化し、障害対応の初動を高速化しました。',
      },
    ],
    workSlugs: ['etoe'],
  },
];

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((service) => service.slug === slug);
