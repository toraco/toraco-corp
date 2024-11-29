export const MICROCMS_CONFIG = {
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
} as const;

export const isConfigValid = (): boolean => {
  return Boolean(MICROCMS_CONFIG.serviceDomain && MICROCMS_CONFIG.apiKey);
};
