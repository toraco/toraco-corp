import { render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { gtmId } from '@/content/site';

// @next/third-parties は next/script に依存し jsdom では扱いにくいため、
// GTM コンテナ ID が正しく渡るかをマーカーで検証できるようモックする。
vi.mock('@next/third-parties/google', () => ({
  GoogleTagManager: ({ gtmId }: { gtmId: string }) => (
    <div data-testid="gtm" data-gtm-id={gtmId} />
  ),
}));

import { Analytics } from './analytics';

describe('Analytics', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('本番環境では GTM コンテナ(GTM-TGFL4CKQ)を読み込む', () => {
    vi.stubEnv('NODE_ENV', 'production');
    const { getByTestId } = render(<Analytics />);
    const gtm = getByTestId('gtm');
    expect(gtm).toHaveAttribute('data-gtm-id', 'GTM-TGFL4CKQ');
    expect(gtm).toHaveAttribute('data-gtm-id', gtmId);
  });

  it('本番以外では解析タグを読み込まない', () => {
    vi.stubEnv('NODE_ENV', 'development');
    const { queryByTestId } = render(<Analytics />);
    expect(queryByTestId('gtm')).toBeNull();
  });
});
