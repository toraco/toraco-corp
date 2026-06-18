import Link from 'next/link';

import { Button } from '@/components/ui/button';

export function ContactCTA() {
  return (
    <section id="contact" className="border-t bg-primary/10">
      <div className="mx-auto flex max-w-screen-lg flex-col items-center gap-6 px-4 py-16 text-center lg:px-6">
        <h2 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">
          お気軽にご相談ください
        </h2>
        <p className="max-w-prose text-pretty text-muted-foreground">
          開発のご相談、テスト自動化・AI駆動開発・運用監視自動化のご依頼、協業や採用まで。まずはお問い合わせフォームからご連絡ください。
        </p>
        <Button asChild size="lg">
          <Link href="/contact">お問い合わせ</Link>
        </Button>
      </div>
    </section>
  );
}
