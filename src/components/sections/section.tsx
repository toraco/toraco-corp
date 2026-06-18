import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn('scroll-mt-16 py-12 lg:py-20', className)}>
      <div className="mx-auto max-w-screen-lg px-4 lg:px-6">{children}</div>
    </section>
  );
}

export function SectionHeading({
  en,
  ja,
  description,
  className,
}: {
  en: string;
  ja?: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <span className="text-sm font-semibold tracking-wide text-brand-blue">
        {en}
      </span>
      {ja && (
        <h2 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">
          {ja}
        </h2>
      )}
      {description && (
        <p className="max-w-prose text-pretty text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
