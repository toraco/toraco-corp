import { ReactNode } from 'react';
import styles from './Services.module.scss';
import { Icon } from '@/components/ui/Icon';
import { Spacer } from '@/components/ui/Spacer';
import { Typography } from '@/components/ui/Typography';

type ServiceGroupProps = {
  title: string;
  icon: string;
  children: ReactNode;
  useGrid?: boolean;
};

const ServiceGroup = ({
  title,
  icon,
  children,
  useGrid = false,
}: ServiceGroupProps) => {
  return (
    <div className={styles.serviceGroup}>
      <div className={styles.groupTitleWrapper}>
        <Icon name={icon} className={styles.groupIcon} />
        <Typography variant="h3" className={styles.groupTitle}>
          {title}
        </Typography>
      </div>
      <Spacer size={2} />
      <div className={useGrid ? styles.serviceCards : undefined}>
        {children}
      </div>
    </div>
  );
};

export default ServiceGroup;
