import { ReactNode } from 'react';

import styles from './Services.module.scss';

type ServiceListProps = {
  items: ReactNode[];
};

export const ServiceList = ({ items }: ServiceListProps) => {
  return (
    <ul className={styles.serviceList}>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};
