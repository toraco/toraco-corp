import { Fragment } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';

import { Section, SectionHeading } from '@/components/sections/section';
import { company } from '@/content/company';

export const metadata: Metadata = {
  title: '会社情報',
  description:
    'toraco株式会社の会社概要・ミッション・代表者プロフィールをご紹介します。',
};

export default function AboutPage() {
  const { representative } = company;

  return (
    <>
      <Section>
        <SectionHeading en="About" ja="会社情報" />
        <p className="mt-6 max-w-2xl text-xl font-semibold text-balance">
          {company.mission}
        </p>
      </Section>

      <Section className="border-t">
        <SectionHeading en="Vision" ja="価値観" />
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {company.values.map((value) => (
            <li key={value.title} className="rounded-xl border p-5">
              <h3 className="font-semibold">{value.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {value.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="border-t">
        <h2 className="text-xl font-bold tracking-tight">会社概要</h2>
        <dl className="mt-4 border-y">
          {company.profile.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-1 gap-1 border-b py-3 last:border-b-0 sm:grid-cols-[160px_1fr] sm:gap-4"
            >
              <dt className="font-medium text-muted-foreground">{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section className="border-t">
        <h2 className="text-xl font-bold tracking-tight">代表者</h2>
        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
          {representative.photo && (
            <Image
              src={representative.photo.src}
              alt={representative.photo.alt}
              width={representative.photo.width}
              height={representative.photo.height}
              className="h-auto w-40 shrink-0 rounded-xl border object-cover sm:w-48"
            />
          )}
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">
              {representative.name}
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                {representative.title}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              {representative.nameKana}（{representative.nameEn}）
            </p>
            <div className="mt-2 flex max-w-2xl flex-col gap-2 text-pretty text-muted-foreground">
              {representative.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
