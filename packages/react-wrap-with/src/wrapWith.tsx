import React, { createElement, Fragment } from 'react';

import type { ComponentType, PropsWithChildren } from 'react';

type EmptyProps = Record<number | string | symbol, never>;
type PropsOf<T> = T extends ComponentType<infer P> ? P : never;

const EmptyComponent = () => <Fragment />;

export default function wrapWith(
  WrapperComponent: ComponentType<PropsWithChildren<EmptyProps>> | false | null | undefined,
  wrapperProps?: undefined | EmptyProps
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): <WrappedComponent extends ComponentType<any>>(
  WrappedComponent: WrappedComponent | false | null | undefined
) => ComponentType<PropsOf<WrappedComponent>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unnecessary-type-constraint
export default function wrapWith<WrapperProps extends object>(
  WrapperComponent: ComponentType<PropsWithChildren<WrapperProps>> | false | null | undefined,
  wrapperProps: WrapperProps
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): <WrappedComponent extends ComponentType<any>>(
  WrappedComponent: WrappedComponent | false | null | undefined
) => ComponentType<PropsOf<WrappedComponent>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unnecessary-type-constraint
export default function wrapWith<WrapperProps extends object>(
  WrapperComponent: ComponentType<PropsWithChildren<WrapperProps>> | false | null | undefined,
  wrapperProps: WrapperProps extends EmptyProps ? EmptyProps | undefined : WrapperProps
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function wrap<WrappedComponent extends ComponentType<any>>(
    WrappedComponent: WrappedComponent | false | null | undefined
  ): ComponentType<PropsOf<WrappedComponent>> {
    if (WrapperComponent) {
      const WithWrapper = (props: PropsOf<WrappedComponent>) =>
        createElement(
          WrapperComponent,
          wrapperProps,
          // If there are no "WrappedComponent", don't override children. It will override the `props.children`.
          // eslint-disable-next-line react/jsx-key
          ...(WrappedComponent ? [<WrappedComponent {...props} />] : [])
        );

      WithWrapper.displayName = `WrappedWith${WrapperComponent.displayName}`;

      return WithWrapper;
    }

    if (WrappedComponent) {
      const WithWrapper = (props: PropsOf<WrappedComponent>) => <WrappedComponent {...props} />;

      WithWrapper.displayName = WrappedComponent.displayName;

      return WithWrapper;
    }

    return EmptyComponent;
  };
}
