import { FC } from 'react';
import { useEffect, useState } from 'react';

import 'remixicon/fonts/remixicon.css';
import styles from './Icon.module.scss';

type IconProps = {
  name: string;
  className?: string;
};

export const Icon: FC<IconProps> = ({ name, className = '' }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <span className={styles.iconPlaceholder} aria-hidden="true" />;
  }

  const combinedClassName = [`ri-${name}`, styles.icon, className]
    .filter(Boolean)
    .join(' ');

  return <i className={combinedClassName} aria-hidden="true" />;
};
