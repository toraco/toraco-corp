import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { cn } from '@/lib/cn';

const isExternalHref = (href: string) => /^https?:\/\//.test(href);

// リンクのみ独自描画し、外部リンクは別タブ（target/rel）で開く。
// 各要素の装飾は wrapper の子孫バリアントで一括付与する（DESIGN.md トークン準拠）。
const components: Components = {
  a({ href, children }) {
    const external = isExternalHref(href ?? '');
    return (
      <a
        href={href}
        {...(external
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        {children}
      </a>
    );
  },
};

const proseClassName = cn(
  'flex flex-col gap-4 text-pretty leading-relaxed text-muted-foreground',
  '[&_a]:font-medium [&_a]:text-brand-blue [&_a]:underline [&_a]:underline-offset-4',
  '[&_strong]:font-semibold [&_strong]:text-foreground',
  '[&_h2]:text-xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground',
  '[&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground',
  '[&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5',
  '[&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5',
  '[&_blockquote]:border-l-2 [&_blockquote]:pl-4 [&_blockquote]:italic'
);

/** News 本文などの Markdown 文字列を描画する（サーバーコンポーネント）。 */
export function Markdown({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <div className={cn(proseClassName, className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
