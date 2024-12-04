import { About } from '@/components/features/About';
import { Hero } from '@/components/features/Hero';
import { NewsList } from '@/components/features/NewsList';
import { Services } from '@/components/features/Services';
import { getNewsList } from '@/services/microcms';

export default async function Page() {
  const response = await getNewsList();

  return (
    <div>
      <Hero />
      <Services />
      <NewsList news={response.contents} />
      <About />
    </div>
  );
}

// To enable Edge Runtime for Cloudflare Pages
export const runtime = 'edge';
