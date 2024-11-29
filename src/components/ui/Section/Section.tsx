import { ReactNode } from 'react';

import { Typography } from '@/components/ui/Typography';

import styles from './Section.module.scss';

type SectionProps = {
  children: ReactNode;
  id?: string;
  variant?: 'light' | 'dark';
  className?: string;
  fullWidth?: boolean;
  title: string;
};

export const Section = ({
  children,
  id,
  variant = 'light',
  className = '',
  fullWidth = false,
  title,
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
      <Typography variant="h2" className={styles.sectionTitle}>
        {title}
      </Typography>
      <div className={styles.container}>{children}</div>
    </section>
  );
};
