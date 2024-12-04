import classNames from 'classnames';
import { ReactNode } from 'react';
import styles from './Section.module.scss';
import { Typography } from '@/components/ui/Typography';

type SectionProps = {
  children: ReactNode;
  id?: string;
  variant?: 'light' | 'dark';
  className?: string;
  fullWidth?: boolean;
  title: string;
};

const Section = ({
  children,
  id,
  variant = 'light',
  className = '',
  fullWidth = false,
  title,
}: SectionProps) => {
  return (
    <section
      id={id}
      className={classNames(styles.section, styles[variant], className, {
        [styles.fullWidth]: fullWidth,
      })}
    >
      <Typography variant="h2" className={styles.sectionTitle}>
        {title}
      </Typography>
      <div className={styles.container}>{children}</div>
    </section>
  );
};

export default Section;
