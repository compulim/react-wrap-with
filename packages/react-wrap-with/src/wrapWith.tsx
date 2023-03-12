import React, { createElement, forwardRef, Fragment } from 'react';

import pickAndOmit from './util/pickAndOmit';

import type { ComponentType, PropsWithChildren, PropsWithoutRef, ReactNode, RefAttributes } from 'react';

type PropsOf<T> = T extends ComponentType<infer P> ? P : never;
type RefOf<T> = T extends RefAttributes<infer R> ? R : never;

const EmptyComponent = () => <Fragment />;

export default function wrapWith<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ContainerComponentType extends ComponentType<PropsWithChildren<any>>,
  ExtractPropKey extends keyof Omit<PropsOf<ContainerComponentType>, 'children'> = never
>(
  ContainerComponent: ContainerComponentType | false | null | undefined,
  initialProps: Omit<PropsOf<ContainerComponentType> & { children?: never }, ExtractPropKey> | undefined,
  extractPropKeys: ExtractPropKey[]
  // @types/react did not put a restrictions on what can be props.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): <ContentComponentType extends ComponentType<any>, Ref = RefOf<PropsOf<ContentComponentType>>>(
  ContentComponent: ContentComponentType | false | null | undefined
) => ComponentType<
  PropsWithoutRef<Pick<PropsOf<ContainerComponentType>, ExtractPropKey> & PropsOf<ContentComponentType>> &
    RefAttributes<Ref>
>;

export default function wrapWith<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ContainerComponentType extends ComponentType<PropsWithChildren<any>>
>(
  ContainerComponent: ContainerComponentType | false | null | undefined,
  // There is a bug in TypeScript that Omit<T, never> & Partial<Pick<T>, never>> does not equals to T.
  initialProps: PropsOf<ContainerComponentType> & { children?: never },
  extractedPropKeys?: undefined
  // @types/react did not put a restrictions on what can be props.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): <ContentComponentType extends ComponentType<any>, Ref = RefOf<PropsOf<ContentComponentType>>>(
  ContentComponent: ContentComponentType | false | null | undefined
) => ComponentType<PropsWithoutRef<PropsOf<ContentComponentType>> & RefAttributes<Ref>>;

// If <Container> need no props other than children, initialProps is optional.
export default function wrapWith<
  ContainerComponentType extends ComponentType<{ children?: ReactNode | undefined }> | false | null | undefined
>(
  ContainerComponent: ContainerComponentType | false | null | undefined,
  initialProps?: undefined | Record<number | string | symbol, never>
  // @types/react did not put a restrictions on what can be props.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): <ContentComponentType extends ComponentType<any>, Ref = RefOf<PropsOf<ContentComponentType>>>(
  ContentComponent: ContentComponentType | false | null | undefined
) => ComponentType<PropsWithoutRef<PropsOf<ContentComponentType>> & RefAttributes<Ref>>;

export default function wrapWith<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ContainerComponentType extends ComponentType<PropsWithChildren<any>>,
  ExtractPropKey extends keyof Omit<PropsOf<ContainerComponentType>, 'children'> = never
>(
  ContainerComponent: ContainerComponentType | false | null | undefined,
  initialProps?: Omit<PropsOf<ContainerComponentType> & { children?: never }, ExtractPropKey>,
  extractPropKeys: ExtractPropKey[] = [] as never[]
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function wrap<ContentComponentType extends ComponentType<any>, Ref = RefOf<PropsOf<ContentComponentType>>>(
    ContentComponent: ContentComponentType | false | null | undefined
  ): ComponentType<
    PropsWithoutRef<Pick<PropsOf<ContainerComponentType>, ExtractPropKey> & PropsOf<ContentComponentType>> &
      RefAttributes<Ref>
  > {
    if (ContainerComponent) {
      const WithContainer = forwardRef<
        Ref,
        Pick<PropsOf<ContainerComponentType>, ExtractPropKey> & PropsOf<ContentComponentType>
      >((props, ref) => {
        const [extractedProps, contentProps] = pickAndOmit<
          Pick<PropsOf<ContainerComponentType>, ExtractPropKey>,
          PropsOf<ContentComponentType> & { ref?: Ref }
        >(props, extractPropKeys);

        return createElement(
          ContainerComponent,
          { ...initialProps, ...extractedProps },
          // If there are "ContentComponentType" is falsy, don't override children. It will override the `props.children`.
          // False positive: we are unpacking the array rightaway.
          // eslint-disable-next-line react/jsx-key
          ...(ContentComponent
            ? [createElement<PropsOf<ContentComponentType>>(ContentComponent, { ...contentProps, ref })]
            : [])
        );
      });

      WithContainer.displayName = `WrappedWith${ContainerComponent.displayName || 'Component'}`;

      return WithContainer;
    }

    if (ContentComponent) {
      const WithContainer = forwardRef<Ref, PropsOf<ContentComponentType>>((props, ref) =>
        createElement<PropsOf<ContentComponentType>>(ContentComponent, { ...props, ref })
      );

      WithContainer.displayName = ContentComponent.displayName;

      return WithContainer;
    }

    return EmptyComponent;
  };
}
