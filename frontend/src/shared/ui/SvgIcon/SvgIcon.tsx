import { MantineSpacing, TextProps , Box } from '@mantine/core';

import React from 'react';

import { filterUndefinedValues } from '../../lib/filterUndefinedValues';

export interface SvgIconProps
  extends Omit<TextProps, 'size' | 'radius'>,
    Omit<React.ComponentPropsWithoutRef<'svg'>, keyof TextProps> {
  size?: MantineSpacing;
  radius?: MantineSpacing;
}

const isPxSize = (size: MantineSpacing) =>
  typeof size === 'number' || size.endsWith('px');

export const SvgIcon = ({ size, radius, style, ...props }: SvgIconProps) => {
  const styles = {
    width: size
      ? isPxSize(size)
        ? size
        : `var(--mantine-spacing-${size})`
      : undefined,
    height: size
      ? isPxSize(size)
        ? size
        : `var(--mantine-spacing-${size})`
      : undefined,
    borderRadius: radius ? `var(--mantine-radius-${radius})` : undefined,
  };

  return (
    <Box
      component="svg"
      style={{ ...style, ...filterUndefinedValues(styles) }}
      {...props}
    />
  );
};

export type Icon = (props: SvgIconProps) => React.ReactElement
