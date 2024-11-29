import type { GetServerSideProps, NextPage } from 'next';

import { About } from '@/components/features/About';
import { Hero } from '@/components/features/Hero';
import { NewsList } from '@/components/features/NewsList';
import { Services } from '@/components/features/Services';
import { Layout } from '@/components/ui/Layout';
import type { News } from '@/domains/news';
import { getNewsList } from '@/services/microcms';

type HomeProps = {
  news: News[];
};

const Home: NextPage<HomeProps> = ({ news }) => {
  return (
    <Layout>
      <main>
        <Hero />
        <Services />
        <section id="news">
          <NewsList news={news} />
        </section>
        <About />
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const response = await getNewsList();

    return {
      props: {
        news: response.contents,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        news: [],
      },
    };
  }
};

export default Home;
