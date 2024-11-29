import { ElementType, ReactNode } from 'react';

import styles from './Typography.module.scss';

type TypographyProps = {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  children: ReactNode;
  className?: string;
};

export const Typography = ({
  variant,
  children,
  className = '',
}: TypographyProps) => {
  const Component = variant as ElementType;

  const combinedClassName = [styles.text, styles[variant], className]
    .filter(Boolean)
    .join(' ');

  return <Component className={combinedClassName}>{children}</Component>;
};
