import { NextRequest } from 'next/server';
import { describe, expect, it } from 'vitest';

import { middleware } from './middleware';

const requestFor = (url: string, host: string) =>
  new NextRequest(url, { headers: { host } });

describe('middleware（www → apex リダイレクト）', () => {
  it('www.toraco.jp へのアクセスを apex へ 308 でリダイレクトしパス/クエリを維持する', () => {
    const res = middleware(
      requestFor('https://www.toraco.jp/news?tag=tech', 'www.toraco.jp'),
    );
    expect(res.status).toBe(308);
    expect(res.headers.get('location')).toBe('https://toraco.jp/news?tag=tech');
  });

  it('apex（toraco.jp）はリダイレクトせず通過させる', () => {
    const res = middleware(
      requestFor('https://toraco.jp/about', 'toraco.jp'),
    );
    expect(res.status).not.toBe(308);
    expect(res.headers.get('location')).toBeNull();
  });
});
