import { AboutExcerpt } from '@/components/sections/about-excerpt';
import { ContactCTA } from '@/components/sections/contact-cta';
import { Hero } from '@/components/sections/hero';
import { NewsPreview } from '@/components/sections/news-preview';
import { ServicesOverview } from '@/components/sections/services-overview';
import { WorksExcerpt } from '@/components/sections/works-excerpt';

export default function Page() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <WorksExcerpt />
      <AboutExcerpt />
      <NewsPreview />
      <ContactCTA />
    </>
  );
}
