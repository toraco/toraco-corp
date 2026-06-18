import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { works } from '@/content/works';

import { Section, SectionHeading } from './section';

export function WorksExcerpt() {
  return (
    <Section id="works" className="bg-muted/30">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          en="Works"
          ja="開発事例"
          description="受託開発・ラボ型開発で手がけた事例の一部をご紹介します。"
        />
        <Button asChild variant="link">
          <Link href="/works">すべて見る</Link>
        </Button>
      </div>
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {works.map((work) => (
          <li key={work.slug}>
            <Link
              href={`/works/${work.slug}`}
              className="block h-full rounded-xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              <Card className="h-full gap-3 transition-colors hover:border-brand-blue/40">
                <h3 className="text-lg font-semibold text-balance">
                  {work.title}
                </h3>
                <p className="line-clamp-3 text-sm text-muted-foreground">
                  {work.summary}
                </p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                  {work.techTags.slice(0, 4).map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
