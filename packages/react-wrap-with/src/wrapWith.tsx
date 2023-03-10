import React, { createElement, Fragment } from 'react';

import pickAndOmit from './util/pickAndOmit';

import type { ComponentType, PropsWithChildren, ReactNode } from 'react';

type PropsOf<T> = T extends ComponentType<infer P> ? P : never;

const EmptyComponent = () => <Fragment />;

export default function wrapWith<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Wrapper extends ComponentType<PropsWithChildren<any>>,
  ExtractPropKey extends keyof Omit<PropsOf<Wrapper>, 'children'> = never
>(
  WrapperComponent: Wrapper | false | null | undefined,
  wrapperProps: Omit<PropsOf<Wrapper> & { children?: never }, ExtractPropKey> | undefined,
  extractPropKeys: ExtractPropKey[]
  // @types/react did not put a restrictions on what can be props.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): <Wrapped extends ComponentType<any>>(
  WrappedComponent: Wrapped | false | null | undefined
) => ComponentType<Pick<PropsOf<Wrapper>, ExtractPropKey> & PropsOf<Wrapped>>;

export default function wrapWith<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Wrapper extends ComponentType<PropsWithChildren<any>>
>(
  WrapperComponent: Wrapper | false | null | undefined,
  // There is a bug in TypeScript that Omit<T, never> & Partial<Pick<T>, never>> does not equals to T.
  wrapperProps: PropsOf<Wrapper> & { children?: never },
  extractedPropKeys?: undefined
  // @types/react did not put a restrictions on what can be props.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): <Wrapped extends ComponentType<any>>(
  WrappedComponent: Wrapped | false | null | undefined
) => ComponentType<PropsOf<Wrapped>>;

// If Wrapper need no props other than children, wrapperProps is optional.
export default function wrapWith<
  Wrapper extends ComponentType<{ children?: ReactNode | undefined }> | false | null | undefined
>(
  WrapperComponent: Wrapper | false | null | undefined,
  wrapperProps?: undefined | Record<number | string | symbol, never>
  // @types/react did not put a restrictions on what can be props.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): <Wrapped extends ComponentType<any>>(
  WrappedComponent: Wrapped | false | null | undefined
) => ComponentType<PropsOf<Wrapped>>;

export default function wrapWith<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Wrapper extends ComponentType<PropsWithChildren<any>>,
  ExtractPropKey extends keyof Omit<PropsOf<Wrapper>, 'children'> = never
>(
  WrapperComponent: Wrapper | false | null | undefined,
  wrapperProps?: Omit<PropsOf<Wrapper> & { children?: never }, ExtractPropKey>,
  extractPropKeys: ExtractPropKey[] = [] as never[]
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function wrap<Wrapped extends ComponentType<any>>(
    WrappedComponent: Wrapped | false | null | undefined
  ): ComponentType<Pick<PropsOf<Wrapper>, ExtractPropKey> & PropsOf<Wrapped>> {
    if (WrapperComponent) {
      const WithWrapper = (props: Pick<PropsOf<Wrapper>, ExtractPropKey> & PropsOf<Wrapped>) => {
        const [extractedProps, wrappedProps] = pickAndOmit<Pick<PropsOf<Wrapper>, ExtractPropKey>, PropsOf<Wrapped>>(
          props,
          extractPropKeys
        );

        return createElement(
          WrapperComponent,
          { ...wrapperProps, ...extractedProps },
          // If there are no "WrappedComponent", don't override children. It will override the `props.children`.
          // False positive: we are unpacking the array rightaway.
          // eslint-disable-next-line react/jsx-key
          ...(WrappedComponent ? [<WrappedComponent {...wrappedProps} />] : [])
        );
      };

      WithWrapper.displayName = `WrappedWith${WrapperComponent.displayName}`;

      return WithWrapper;
    }

    if (WrappedComponent) {
      const WithWrapper = (props: PropsOf<Wrapped>) => <WrappedComponent {...props} />;

      WithWrapper.displayName = WrappedComponent.displayName;

      return WithWrapper;
    }

    return EmptyComponent;
  };
}
