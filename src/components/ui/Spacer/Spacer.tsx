import { CSSProperties } from 'react';

type SpacerProps = {
  size: number;
  axis?: 'horizontal' | 'vertical';
  style?: CSSProperties;
};

export const Spacer = ({
  size,
  axis = 'vertical',
  style = {},
}: SpacerProps) => {
  const width = axis === 'horizontal' ? `${size}rem` : undefined;
  const height = axis === 'vertical' ? `${size}rem` : undefined;

  return (
    <div
      style={{
        width,
        height,
        minWidth: width,
        minHeight: height,
        ...style,
      }}
    />
  );
};
