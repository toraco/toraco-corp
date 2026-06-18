import { Fragment } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { company } from '@/content/company';

import { Section, SectionHeading } from './section';

export function AboutExcerpt() {
  return (
    <Section id="about">
      <SectionHeading en="About" ja="会社情報" />
      <div className="mt-6 flex flex-col gap-8">
        <p className="max-w-2xl text-xl font-semibold text-balance">
          {company.mission}
        </p>
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm">
          {company.profile.slice(0, 4).map((row) => (
            <Fragment key={row.label}>
              <dt className="font-medium text-muted-foreground">{row.label}</dt>
              <dd>{row.value}</dd>
            </Fragment>
          ))}
        </dl>
        <Button asChild variant="outline" className="w-fit">
          <Link href="/about">会社概要を見る</Link>
        </Button>
      </div>
    </Section>
  );
}
