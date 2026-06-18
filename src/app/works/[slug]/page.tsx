import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Section } from '@/components/sections/section';
import { Badge } from '@/components/ui/badge';
import { getWorkBySlug, works } from '@/content/works';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) return {};
  return { title: work.title, description: work.summary };
}

export default async function WorkDetailPage({ params }: Params) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) notFound();

  return (
    <Section>
      <article className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          {work.isAnonymous ? (
            <Badge variant="secondary" className="w-fit">
              非公開事例
            </Badge>
          ) : (
            work.clientName && (
              <Badge variant="brand" className="w-fit">
                {work.clientName}
              </Badge>
            )
          )}
          <h1 className="text-3xl font-bold tracking-tight text-balance">
            {work.title}
          </h1>
          <p className="text-pretty text-muted-foreground">{work.summary}</p>
          {work.url && (
            <a
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-brand-blue hover:underline"
            >
              {work.url}
            </a>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-semibold">課題</h2>
            <p className="mt-2 text-pretty text-muted-foreground">
              {work.challenge}
            </p>
          </div>
          <div>
            <h2 className="font-semibold">toraco の対応</h2>
            <p className="mt-2 text-pretty text-muted-foreground">
              {work.solution}
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-semibold">成果</h2>
          <ul className="mt-2 list-disc pl-5 text-muted-foreground">
            {work.results.map((result) => (
              <li key={result}>{result}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-semibold">提供範囲</h2>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {work.scope.map((item) => (
              <Badge key={item} variant="outline">
                {item}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold">技術スタック</h2>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {work.techTags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <Link href="/works" className="text-brand-blue hover:underline">
          ← 事例一覧へ
        </Link>
      </article>
    </Section>
  );
}
