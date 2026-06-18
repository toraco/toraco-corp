import { GoogleTagManager } from '@next/third-parties/google';

import { gtmId } from '@/content/site';

// 解析タグ（Google Tag Manager）。本番ビルドでのみ読み込み、
// 開発・プレビュー時の計測汚染を避ける。GA4 等の個別タグは GTM 内で設定する。
export function Analytics() {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return <GoogleTagManager gtmId={gtmId} />;
}
