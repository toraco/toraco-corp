import type { BrandName } from '@/components/ui/brand-icon';

// Google Tag Manager コンテナ ID（公開値）。GA4 等の計測は GTM 内で構成する。
export const gtmId = 'GTM-TGFL4CKQ';

export type NavItem = {
  label: string;
  href: string;
};

// ヘッダー / フッター / sitemap が参照するナビゲーションの単一情報源。
export const navItems: NavItem[] = [
  { label: 'Services', href: '/services' },
  { label: 'Works', href: '/works' },
  { label: 'About', href: '/about' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' },
];

export type SocialLink = {
  name: BrandName;
  label: string;
  href: string;
};

export const socialLinks: SocialLink[] = [
  {
    name: 'youtube',
    label: 'YouTube',
    href: 'https://www.youtube.com/@1492tiger',
  },
  { name: 'x', label: 'X', href: 'https://x.com/torahack_' },
  { name: 'github', label: 'GitHub', href: 'https://github.com/toraco' },
  { name: 'zenn', label: 'Zenn', href: 'https://zenn.dev/p/toraco' },
];
