import classNames from 'classnames';
import { ElementType, ReactNode } from 'react';
import styles from './Typography.module.scss';

type TypographyProps = {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  children: ReactNode;
  className?: string;
};

const Typography = ({ variant, children, className = '' }: TypographyProps) => {
  const Component = variant as ElementType;
  return (
    <Component className={classNames(styles.text, styles[variant], className)}>
      {children}
    </Component>
  );
};

export default Typography;
