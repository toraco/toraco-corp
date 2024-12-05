import { getRequestContext } from '@cloudflare/next-on-pages';
import { About } from '@/components/features/About';
import { Hero } from '@/components/features/Hero';
import { NewsList } from '@/components/features/NewsList';
import { Services } from '@/components/features/Services';
import { getNewsList } from '@/services/microcms';

export default async function Page() {
  // c.f. https://developers.cloudflare.com/pages/framework-guides/nextjs/ssr/troubleshooting/#top-level-getrequestcontext
  const serviceDomain = getRequestContext().env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = getRequestContext().env.MICROCMS_API_KEY;
  const response = await getNewsList({ serviceDomain, apiKey });

  return (
    <>
      <Hero />
      <Services />
      <NewsList news={response.contents} />
      <About />
    </>
  );
}

// To enable Edge Runtime for Cloudflare Pages
export const runtime = 'edge';
