import Link from 'next/link';

import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { services } from '@/content/services';

import { Section, SectionHeading } from './section';

export function ServicesOverview() {
  return (
    <Section id="services">
      <SectionHeading
        en="Services"
        ja="サービス"
        description="企画・要件定義からフロントエンド・バックエンド・クラウドインフラまで。toraco が提供する開発サービスです。"
      />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <li key={service.slug}>
            <Link
              href={`/services#${service.slug}`}
              className="block h-full rounded-xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              <Card className="h-full gap-3 transition-colors hover:border-brand-blue/40">
                <Icon name={service.icon} className="text-brand-blue" />
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {service.tagline}
                </p>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
