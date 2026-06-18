import Link from 'next/link';

import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="border-b bg-accent/40">
      <div className="mx-auto flex max-w-screen-lg flex-col items-start gap-6 px-4 py-20 lg:px-6 lg:py-28">
        <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          「やりたい」を、
          <br className="hidden sm:block" />
          テクノロジーで実現する。
        </h1>
        <p className="max-w-2xl text-pretty text-lg text-muted-foreground">
          受託開発・ラボ型開発から、テスト自動化・AI駆動開発まで。toraco は「やりたいけどできない」を技術で解消し、挑戦を後押しします。
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild size="lg">
            <Link href="/contact">お問い合わせ</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/services">サービスを見る</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
