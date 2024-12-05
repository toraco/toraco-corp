import { getRequestContext } from '@cloudflare/next-on-pages';

export const getEnvByRuntime = (runtime: string) => {
  switch (runtime) {
    case 'edge':
      // c.f. https://developers.cloudflare.com/pages/framework-guides/nextjs/ssr/troubleshooting/#top-level-getrequestcontext
      const { env } = getRequestContext();
      return env;
    default:
      return process.env;
  }
};
