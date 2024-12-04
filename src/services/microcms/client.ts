import { createClient } from 'microcms-js-sdk';

// Only create the client if configuration is valid
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN ?? '',
  apiKey: process.env.MICROCMS_API_KEY ?? '',
});
