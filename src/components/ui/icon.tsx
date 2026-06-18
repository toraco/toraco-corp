import {
  Activity,
  ArrowRight,
  BellRing,
  Bot,
  BrainCircuit,
  Building2,
  Cloud,
  Code2,
  ExternalLink,
  Eye,
  FlaskConical,
  GitPullRequest,
  LayoutDashboard,
  Mail,
  Menu,
  MousePointerClick,
  Settings2,
  ShieldCheck,
  Smile,
  Sparkles,
  Users,
  X,
  type LucideProps,
} from 'lucide-react';

import { cn } from '@/lib/cn';

// 利用するアイコンのみを明示登録し、バンドルを最小化する。
const iconRegistry = {
  Activity,
  ArrowRight,
  BellRing,
  Bot,
  BrainCircuit,
  Building2,
  Cloud,
  Code2,
  ExternalLink,
  Eye,
  FlaskConical,
  GitPullRequest,
  LayoutDashboard,
  Mail,
  Menu,
  MousePointerClick,
  Settings2,
  ShieldCheck,
  Smile,
  Sparkles,
  Users,
  X,
};

export type IconName = keyof typeof iconRegistry;

type IconProps = Omit<LucideProps, 'ref'> & {
  name: string;
};

export function Icon({
  name,
  className,
  size = 24,
  strokeWidth = 1.75,
  ...props
}: IconProps) {
  const LucideIcon = iconRegistry[name as IconName];
  if (!LucideIcon) return null;

  return (
    <LucideIcon
      aria-hidden="true"
      size={size}
      strokeWidth={strokeWidth}
      className={cn('shrink-0', className)}
      {...props}
    />
  );
}
