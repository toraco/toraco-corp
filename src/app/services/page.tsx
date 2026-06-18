import type { Metadata } from 'next';
import Link from 'next/link';

import { Section, SectionHeading } from '@/components/sections/section';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { services } from '@/content/services';
import { getWorkBySlug } from '@/content/works';

export const metadata: Metadata = {
  title: 'サービス',
  description:
    '受託開発・ラボ型開発・Web高速化・テスト自動化・AI駆動開発。toraco が提供する開発サービスをご紹介します。',
};

export default function ServicesPage() {
  return (
    <>
      <Section>
        <SectionHeading
          en="Services"
          ja="サービス"
          description="企画・要件定義からフロントエンド・バックエンド・クラウドインフラまで。toraco が提供する開発サービスです。"
        />
      </Section>

      {services.map((service) => (
        <Section key={service.slug} id={service.slug} className="border-t">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-accent p-2 text-accent-foreground">
                <Icon name={service.icon} />
              </span>
              <h2 className="text-2xl font-bold tracking-tight">
                {service.name}
              </h2>
            </div>
            <p className="max-w-2xl text-pretty text-muted-foreground">
              {service.description}
            </p>

            <ul className="grid gap-4 sm:grid-cols-3">
              {service.features.map((feature) => (
                <li key={feature.title}>
                  <Card className="h-full gap-2">
                    <Icon
                      name={feature.icon}
                      size={20}
                      className="text-brand-blue"
                    />
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </Card>
                </li>
              ))}
            </ul>

            {service.examples && service.examples.length > 0 && (
              <div className="rounded-xl border bg-muted/30 p-6">
                <h3 className="font-semibold">導入事例</h3>
                <ul className="mt-3 flex flex-col gap-3">
                  {service.examples.map((example) => (
                    <li key={example.title}>
                      <p className="font-medium">{example.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {example.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.workSlugs && service.workSlugs.length > 0 && (
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="text-sm font-medium">関連事例:</span>
                {service.workSlugs.map((slug) => {
                  const work = getWorkBySlug(slug);
                  if (!work) return null;
                  return (
                    <Link
                      key={slug}
                      href={`/works/${slug}`}
                      className="text-sm text-brand-blue hover:underline"
                    >
                      {work.title}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </Section>
      ))}
    </>
  );
}
