import classNames from 'classnames';
import { FC } from 'react';
import 'remixicon/fonts/remixicon.css';
import styles from './Icon.module.scss';

type IconProps = {
  name: string;
  className?: string;
};

const Icon: FC<IconProps> = ({ name, className = '' }) => {
  return (
    <i
      className={classNames(`ri-${name}`, styles.icon, className)}
      aria-hidden="true"
    />
  );
};

export default Icon;
