import { About } from '@/components/features/About';
import { Hero } from '@/components/features/Hero';
import { NewsList } from '@/components/features/NewsList';
import { Services } from '@/components/features/Services';
import { getNewsList } from '@/services/microcms';
import { getEnvByRuntime } from '@/utils/env';

export const runtime =
  process.env.NODE_ENV === 'production' ? 'edge' : 'nodejs';

export default async function Page() {
  const env = getEnvByRuntime(runtime);
  const serviceDomain = env.MICROCMS_SERVICE_DOMAIN ?? '';
  const apiKey = env.MICROCMS_API_KEY ?? '';
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
