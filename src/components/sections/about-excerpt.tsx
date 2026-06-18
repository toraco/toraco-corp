import { Fragment } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { company } from '@/content/company';

import { Section, SectionHeading } from './section';

export function AboutExcerpt() {
  return (
    <Section id="about">
      <SectionHeading en="About" ja="会社情報" />
      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-5">
          <p className="text-xl font-semibold text-balance">{company.mission}</p>
          <ul className="flex flex-col gap-3">
            {company.values.map((value) => (
              <li key={value.title}>
                <span className="font-medium">{value.title}</span>
                <span className="block text-sm text-muted-foreground">
                  {value.description}
                </span>
              </li>
            ))}
          </ul>
          <Button asChild variant="outline" className="w-fit">
            <Link href="/about">会社概要を見る</Link>
          </Button>
        </div>
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm">
          {company.profile.slice(0, 4).map((row) => (
            <Fragment key={row.label}>
              <dt className="font-medium text-muted-foreground">{row.label}</dt>
              <dd>{row.value}</dd>
            </Fragment>
          ))}
        </dl>
      </div>
    </Section>
  );
}
