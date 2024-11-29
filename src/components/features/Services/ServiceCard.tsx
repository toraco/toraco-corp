import { ReactNode } from 'react';

import styles from './Services.module.scss';
import { Spacer } from '@/components/ui/Spacer';
import { Typography } from '@/components/ui/Typography';


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
