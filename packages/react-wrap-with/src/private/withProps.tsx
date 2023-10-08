import { type ComponentType, createElement, forwardRef, type RefAttributes } from 'react';

import { type PropsOf } from '../PropsOf';
import { type Simplify } from 'type-fest';

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
