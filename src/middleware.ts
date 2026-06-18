import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// www.toraco.jp へのアクセスを apex（toraco.jp）へ 308 で恒久リダイレクトし、
// canonical を apex に統一する。パス・クエリは維持する。
export function middleware(request: NextRequest) {
  const host = request.headers.get('host');

  if (host === 'www.toraco.jp') {
    const url = request.nextUrl.clone();
    url.protocol = 'https:';
    url.host = 'toraco.jp';
    url.port = '';
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  // 静的アセット・画像最適化・favicon を除く全リクエストで判定する。
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
