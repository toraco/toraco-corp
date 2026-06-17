import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';

// NOTE: コーポレートサイトのコンテンツ（Hero / Services / News / About 等）は
// 次セッションで TDD により再構築する（plan.md フェーズ B 参照）。
// 本ページは新スタックの土台が動作することを示す最小シェル。
export default function Page() {
  return (
    <main className="relative mx-auto flex min-h-dvh max-w-screen-lg flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <div className="fixed right-4 top-4">
        <ModeToggle />
      </div>

      <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
        コーポレートサイト刷新中
      </span>

      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        toraco株式会社
      </h1>

      <p className="max-w-prose text-pretty text-muted-foreground">
        「やりたい」という原動力を、テクノロジーで実現する。
      </p>

      <Button asChild>
        <a
          href="https://share.hsforms.com/1vAN4BWSZRRuLSyg3gdd-Fgss65q"
          target="_blank"
          rel="noopener noreferrer"
        >
          お問い合わせ
        </a>
      </Button>
    </main>
  );
}
