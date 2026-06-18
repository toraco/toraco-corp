import type { Metadata } from 'next';
import Link from 'next/link';

import { Section, SectionHeading } from '@/components/sections/section';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { works } from '@/content/works';

export const metadata: Metadata = {
  title: '開発事例',
  description:
    'toraco が受託開発・ラボ型開発で手がけた開発事例をご紹介します。',
};

export default function WorksPage() {
  return (
    <Section>
      <SectionHeading
        en="Works"
        ja="開発事例"
        description="受託開発・ラボ型開発で手がけた事例をご紹介します。"
      />
      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {works.map((work) => (
          <li key={work.slug}>
            <Link
              href={`/works/${work.slug}`}
              className="block h-full rounded-xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              <Card className="h-full gap-3 transition-colors hover:border-brand-blue/40">
                <h2 className="text-lg font-semibold text-balance">
                  {work.title}
                </h2>
                <p className="text-sm text-muted-foreground">{work.summary}</p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                  {work.techTags.slice(0, 5).map((tag) => (
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
