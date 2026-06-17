import type { NextConfig } from 'next';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

// Cloudflare のローカル開発バインディングを `next dev` に注入する
initOpenNextCloudflareForDev();

export default nextConfig;
