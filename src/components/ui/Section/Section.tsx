import { ReactNode } from 'react';

import styles from './Section.module.scss';

type SectionProps = {
  children: ReactNode;
  id?: string;
  variant?: 'light' | 'dark';
  className?: string;
  fullWidth?: boolean;
};

export const Section = ({
  children,
  id,
  variant = 'light',
  className = '',
  fullWidth = false,
}: SectionProps) => {
  const combinedClassName = [
    styles.section,
    styles[variant],
    fullWidth && styles.fullWidth,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section id={id} className={combinedClassName}>
      <div className={styles.container}>{children}</div>
    </section>
  );
};
