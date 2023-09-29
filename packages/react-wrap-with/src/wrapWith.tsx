import React, { createElement, forwardRef, Fragment } from 'react';

import pick from './util/pick';
import pickAndOmit from './util/pickAndOmit';

import type { ComponentType, PropsWithChildren, PropsWithoutRef, ReactNode, RefAttributes } from 'react';

type PropsOf<T> = T extends ComponentType<infer P> ? P : never;
type RefOf<T> = T extends RefAttributes<infer R> ? R : never;

const EmptyComponent = () => <Fragment />;

const Extract = Symbol('Extract');
const Spy = Symbol('Spy');

export { Extract, Spy };

// Everything.
export default function wrapWith<
  // ContainerComponentType extends ComponentType<PropsWithChildren<Record<ExtractPropKey, any> & { spy: ContentProps }>>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ContainerComponentType extends ComponentType<PropsWithChildren<any>>,
  ExtractPropKey extends keyof Omit<PropsOf<ContainerComponentType>, 'children'> = never,
  SpyPropKey extends keyof Omit<PropsOf<ContainerComponentType>, 'children'> = never
>(
  ContainerComponent: ContainerComponentType | false | null | undefined,
  initialProps: Omit<PropsOf<ContainerComponentType> & { children?: never }, ExtractPropKey | SpyPropKey> | undefined,
  extractPropKeys: ExtractPropKey[],
  spyPropKeys: SpyPropKey[]
): <
  ContentComponentType extends ComponentType<Pick<PropsOf<ContainerComponentType>, SpyPropKey>>,
  Ref = RefOf<PropsOf<ContentComponentType>>
>(
  ContentComponent: ContentComponentType | false | null | undefined
) => ComponentType<
  PropsWithoutRef<Pick<PropsOf<ContainerComponentType>, ExtractPropKey> & PropsOf<ContentComponentType>> &
    RefAttributes<Ref>
>;

// Empty or no "spyPropKeys".
export default function wrapWith<
  // ContainerComponentType extends ComponentType<PropsWithChildren<Record<ExtractPropKey, any> & { spy: ContentProps }>>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ContainerComponentType extends ComponentType<PropsWithChildren<any>>,
  ExtractPropKey extends keyof Omit<PropsOf<ContainerComponentType>, 'children'> = never
>(
  ContainerComponent: ContainerComponentType | false | null | undefined,
  initialProps: Omit<PropsOf<ContainerComponentType> & { children?: never }, ExtractPropKey> | undefined,
  extractPropKeys: ExtractPropKey[],
  spyPropKeys?: undefined
  // @types/react did not put a restrictions on what can be props.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): <ContentComponentType extends ComponentType<any>, Ref = RefOf<PropsOf<ContentComponentType>>>(
  ContentComponent: ContentComponentType | false | null | undefined
) => ComponentType<
  PropsWithoutRef<PropsOf<ContentComponentType> & Pick<PropsOf<ContainerComponentType>, ExtractPropKey>> &
    RefAttributes<Ref>
>;

// Empty or no "extractPropKeys".
export default function wrapWith<
  // ContainerComponentType extends ComponentType<PropsWithChildren<Record<ExtractPropKey, any> & { spy: ContentProps }>>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ContainerComponentType extends ComponentType<PropsWithChildren<any>>,
  SpyPropKey extends keyof Omit<PropsOf<ContainerComponentType>, 'children'> = never
>(
  ContainerComponent: ContainerComponentType | false | null | undefined,
  initialProps: Omit<PropsOf<ContainerComponentType> & { children?: never }, SpyPropKey> | undefined,
  extractPropKeys: undefined,
  spyPropKeys: SpyPropKey[]
  // @types/react did not put a restrictions on what can be props.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): <
  ContentComponentType extends ComponentType<Pick<PropsOf<ContainerComponentType>, SpyPropKey>>,
  Ref = RefOf<PropsOf<ContentComponentType>>
>(
  ContentComponent: ContentComponentType | false | null | undefined
) => ComponentType<PropsWithoutRef<PropsOf<ContentComponentType>> & RefAttributes<Ref>>;

// Empty or no "extractPropKeys" and "spyPropKeys"
export default function wrapWith<
  // ContainerComponentType extends ComponentType<PropsWithChildren<{ spy: ContentProps }>>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ContainerComponentType extends ComponentType<PropsWithChildren<any>>
>(
  ContainerComponent: ContainerComponentType | false | null | undefined,
  // There is a bug in TypeScript that Omit<T, never> & Partial<Pick<T>, never>> does not equals to T.
  initialProps: PropsOf<ContainerComponentType> & { children?: never },
  extractedPropKeys?: undefined,
  spyPropKeys?: undefined
  // @types/react did not put a restrictions on what can be props.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): <ContentComponentType extends ComponentType<any>, Ref = RefOf<PropsOf<ContentComponentType>>>(
  ContentComponent: ContentComponentType | false | null | undefined
) => ComponentType<PropsWithoutRef<PropsOf<ContentComponentType>> & RefAttributes<Ref>>;

// If <Container> need no props other than children, initialProps is optional.
export default function wrapWith<
  // ContainerComponentType extends // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   ComponentType<PropsWithChildren<{ spy: ContentProps }>> | false | null | undefined,
  ContainerComponentType extends // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ComponentType<{ children?: ReactNode | undefined }> | false | null | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ContentProps extends object = any
>(
  ContainerComponent: ContainerComponentType | false | null | undefined,
  initialProps?: undefined | Record<number | string | symbol, never>
  // @types/react did not put a restrictions on what can be props.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): <ContentComponentType extends ComponentType<ContentProps>, Ref = RefOf<PropsOf<ContentComponentType>>>(
  ContentComponent: ContentComponentType | false | null | undefined
) => ComponentType<PropsWithoutRef<PropsOf<ContentComponentType>> & RefAttributes<Ref>>;

export default function wrapWith<
  // ContainerComponentType extends ComponentType<PropsWithChildren<Record<ExtractPropKey, any> & { spy: ContentProps }>>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ContainerComponentType extends ComponentType<PropsWithChildren<any>>,
  ExtractPropKey extends keyof Omit<PropsOf<ContainerComponentType>, 'children'> = never,
  SpyPropKey extends keyof Omit<PropsOf<ContainerComponentType>, 'children'> = never
>(
  ContainerComponent: ContainerComponentType | false | null | undefined,
  initialProps?: Omit<PropsOf<ContainerComponentType> & { children?: never }, ExtractPropKey | SpyPropKey>,
  extractPropKeys: ExtractPropKey[] = [] as never[],
  spyPropKeys: SpyPropKey[] = [] as never[]
) {
  return function wrap<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ContentComponentType extends ComponentType<Pick<PropsOf<ContainerComponentType>, SpyPropKey>>,
    Ref = RefOf<PropsOf<ContentComponentType>>
  >(
    ContentComponent: ContentComponentType | false | null | undefined
  ): ComponentType<
    PropsWithoutRef<Pick<PropsOf<ContainerComponentType>, ExtractPropKey> & PropsOf<ContentComponentType>> &
      RefAttributes<Ref>
  > {
    type ExpectedContentComponentProps = Pick<PropsOf<ContainerComponentType>, ExtractPropKey> &
      PropsOf<ContentComponentType>;

    if (ContainerComponent) {
      const WithContainer = forwardRef<Ref, ExpectedContentComponentProps>((props, ref) => {
        const [extractedProps, contentProps] = pickAndOmit<
          Pick<PropsOf<ContainerComponentType>, ExtractPropKey>,
          PropsOf<ContentComponentType>
        >(props, extractPropKeys);
        const spyProps = pick<ExpectedContentComponentProps, SpyPropKey>(props, spyPropKeys);

        return createElement(
          ContainerComponent,
          { ...initialProps, ...extractedProps, ...spyProps },
          // If there are "ContentComponentType" is falsy, don't override children. It will override the `props.children`.
          // False positive: we are unpacking the array rightaway.
          // eslint-disable-next-line react/jsx-key
          ...(ContentComponent ? [createElement(ContentComponent, { ...contentProps, ref })] : [])
        );
      });

      WithContainer.displayName = `WrappedWith${ContainerComponent.displayName || 'Component'}`;

      return WithContainer;
    }

    if (ContentComponent) {
      const WithContainer = forwardRef<
        Ref,
        Pick<PropsOf<ContainerComponentType>, ExtractPropKey> & PropsOf<ContentComponentType>
      >((props, ref) => {
        const [, contentProps] = pickAndOmit<
          Pick<PropsOf<ContainerComponentType>, ExtractPropKey>,
          PropsOf<ContentComponentType> & { ref?: Ref }
        >(props, extractPropKeys);

        return createElement(ContentComponent, { ...contentProps, ref });
      });

      WithContainer.displayName = ContentComponent.displayName;

      return WithContainer;
    }

    return EmptyComponent;
  };
}
