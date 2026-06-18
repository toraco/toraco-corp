import Link from 'next/link';

import { BrandIcon } from '@/components/ui/brand-icon';
import { navItems, socialLinks } from '@/content/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-screen-lg flex-col gap-8 px-4 py-10 lg:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <Link href="/" className="font-bold tracking-tight">
            toraco株式会社
          </Link>

          <nav
            aria-label="フッターナビゲーション"
            className="flex flex-wrap gap-x-6 gap-y-2"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-brand-blue"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <ul className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <BrandIcon name={social.name} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-muted-foreground">© {year} toraco, Inc.</p>
      </div>
    </footer>
  );
}
