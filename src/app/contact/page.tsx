import type { Metadata } from 'next';

import { ContactForm } from '@/components/contact/contact-form';
import { Section, SectionHeading } from '@/components/sections/section';

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description:
    'toraco株式会社へのお問い合わせはこちらから。開発のご相談・テスト自動化・AI駆動開発・採用や協業まで承ります。',
};

export default function ContactPage() {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';

  return (
    <Section>
      <SectionHeading
        en="Contact"
        ja="お問い合わせ"
        description="開発のご相談、テスト自動化・AI駆動開発のご依頼、協業や採用まで。下記フォームよりお気軽にご連絡ください。"
      />
      <div className="mt-8 max-w-2xl">
        <ContactForm turnstileSiteKey={turnstileSiteKey} />
      </div>
    </Section>
  );
}
