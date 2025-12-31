import React, { type ComponentType, type RefAttributes } from 'react';
// Related to https://github.com/import-js/eslint-plugin-import/issues/2872.
// eslint-disable-next-line import/consistent-type-specifier-style
import type { Simplify } from 'type-fest';
import { type PropsOf } from '../PropsOf.ts';

const { createElement, forwardRef } = React;

function withProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends ComponentType<any>,
  K extends keyof PropsOf<T>,
  R = unknown
>(
  component: T,
  initialProps: Simplify<Pick<PropsOf<T>, K>>
): ComponentType<Simplify<Omit<PropsOf<T>, keyof typeof initialProps | 'ref'> & RefAttributes<R>>> {
  const WithPropsWrapper = forwardRef<R, Omit<PropsOf<T>, keyof typeof initialProps>>((props, ref) =>
    createElement(component, {
      ...initialProps,
      ...props,
      ref
    })
  );

  WithPropsWrapper.displayName = `withProps(${component.displayName || 'Component'})`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return WithPropsWrapper as any;
}

export default withProps;
