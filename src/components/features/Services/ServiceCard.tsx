import { ReactNode } from 'react';

import { Spacer } from '@/components/ui/Spacer';
import { Typography } from '@/components/ui/Typography';

import styles from './Services.module.scss';

type ServiceCardProps = {
  title?: string;
  children: ReactNode;
};

export const ServiceCard = ({ title, children }: ServiceCardProps) => {
  return (
    <div className={styles.card}>
      {title && (
        <>
          <Typography variant="h4" className={styles.cardTitle}>
            {title}
          </Typography>
          <Spacer size={1.5} />
        </>
      )}
      {children}
    </div>
  );
};
