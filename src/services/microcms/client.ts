import { createClient } from 'microcms-js-sdk';

import { MICROCMS_CONFIG, isConfigValid } from './config';

// Only create the client if configuration is valid
export const client = isConfigValid()
  ? createClient({
      serviceDomain: MICROCMS_CONFIG.serviceDomain!,
      apiKey: MICROCMS_CONFIG.apiKey!,
    })
  : null;
