import React, { createElement, Fragment } from 'react';

import type { ComponentType, PropsWithChildren } from 'react';

type EmptyProps = Record<any, never>;
type PropsOf<T> = T extends ComponentType<infer P> ? P : never;

const EmptyComponent = () => <Fragment />;

export default function wrapWith<WrapperProps extends EmptyProps>(
  WrapperComponent: ComponentType<PropsWithChildren<EmptyProps>> | false | null | undefined,
  wrapperProps?: undefined | EmptyProps
): <WrappedComponent extends ComponentType<any>>(
  WrappedComponent: WrappedComponent | false | null | undefined
) => ComponentType<PropsOf<WrappedComponent>>;

export default function wrapWith<WrapperProps extends {}>(
  WrapperComponent: ComponentType<PropsWithChildren<WrapperProps>> | false | null | undefined,
  wrapperProps: WrapperProps
): <WrappedComponent extends ComponentType<any>>(
  WrappedComponent: WrappedComponent | false | null | undefined
) => ComponentType<PropsOf<WrappedComponent>>;

// TODO: We could probably open-source this function separately.
export default function wrapWith<WrapperProps extends {}>(
  WrapperComponent: ComponentType<PropsWithChildren<WrapperProps>> | false | null | undefined,
  wrapperProps: WrapperProps extends EmptyProps ? EmptyProps | undefined : WrapperProps
) {
  return function wrap<WrappedComponent extends ComponentType<any>>(
    WrappedComponent: WrappedComponent | false | null | undefined
  ): ComponentType<PropsOf<WrappedComponent>> {
    if (WrapperComponent) {
      const WithWrapper = (props: PropsOf<WrappedComponent>) =>
        createElement(
          WrapperComponent,
          wrapperProps,
          // If there are no "WrappedComponent", don't override children. It will override the `props.children`.
          ...(WrappedComponent ? [<WrappedComponent {...props} />] : [])
        );

      WithWrapper.displayName = `WrappedWith${WrapperComponent.displayName}`;

      return WithWrapper;
    }

    if (WrappedComponent) {
      return (props: PropsOf<WrappedComponent>) => <WrappedComponent {...props} />;
    }

    return EmptyComponent;
  };
}
