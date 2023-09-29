import React, { createElement, forwardRef, Fragment } from 'react';

import pick from './util/pick';
import pickAndOmit from './util/pickAndOmit';

import type { ComponentType, PropsWithChildren, PropsWithoutRef, ReactNode, RefAttributes } from 'react';

type PropsOf<T> = T extends ComponentType<infer P> ? P : never;
type RefOf<T> = T extends RefAttributes<infer R> ? R : never;

const EmptyComponent = () => <Fragment />;

const ExtractProp = Symbol('ExtractProp');
const SpyProp = Symbol('SpyProp');

export { ExtractProp, SpyProp };

// Everything.
export default function wrapWith<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ContainerComponentType extends ComponentType<PropsWithChildren<any>>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // ContainerProps extends Record<string, any> = object,
  ContainerProps extends PropsOf<ContainerComponentType> = PropsOf<ContainerComponentType>,
  How extends {
    [K in keyof ContainerProps]: K extends 'children'
      ? never
      :
          | typeof ExtractProp
          | typeof SpyProp
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          | (ContainerProps[K] extends any ? any : never);
  } = {
    [K in keyof ContainerProps]: K extends 'children'
      ? never
      :
          | typeof ExtractProp
          | typeof SpyProp
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          | (ContainerProps[K] extends any ? any : never);
  },
  ExtractPropsKeys extends keyof How = keyof {
    [K in keyof How as How[K] extends typeof ExtractProp ? K : never]: How[K];
  },
  SpyPropsKeys extends keyof How = keyof {
    [K in keyof How as How[K] extends typeof SpyProp ? K : never]: How[K];
  }
>(
  ContainerComponent: ContainerComponentType | false | null | undefined,
  how: How
): <
  ContentComponentType extends ComponentType<ContentProps>,
  ContentProps extends Pick<ContainerProps, SpyPropsKeys> = Pick<ContainerProps, SpyPropsKeys>,
  Ref = RefOf<ContentProps>
>(
  ContentComponent: ContentComponentType | false | null | undefined
) => ComponentType<
  PropsWithoutRef<PropsOf<ContentComponentType> & Pick<ContainerProps, ExtractPropsKeys>> & RefAttributes<Ref>
>;

// If <Container> need no props other than children, initialProps is optional.
export default function wrapWith<
  ContainerComponentType extends // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ComponentType<{ children?: ReactNode | undefined }> | false | null | undefined
>(
  ContainerComponent: ContainerComponentType | false | null | undefined,
  how?: undefined | Record<number | string | symbol, never>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): <ContentComponentType extends ComponentType<any>, Ref = RefOf<PropsOf<ContentComponentType>>>(
  ContentComponent: ContentComponentType | false | null | undefined
) => ComponentType<PropsWithoutRef<PropsOf<ContentComponentType>> & RefAttributes<Ref>>;

export default function wrapWith<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ContainerComponentType extends ComponentType<PropsWithChildren<any>>,
  ContainerProps extends PropsOf<ContainerComponentType> = PropsOf<ContainerComponentType>,
  How extends {
    [K in keyof ContainerProps]: typeof ExtractProp | typeof SpyProp | ContainerProps[K];
  } = {
    [K in keyof ContainerProps]: typeof ExtractProp | typeof SpyProp | ContainerProps[K];
  },
  ExtractPropsKeys extends keyof How = keyof {
    [K in keyof How as How[K] extends typeof ExtractProp ? K : never]: How[K];
  },
  SpyPropsKeys extends keyof How = keyof {
    [K in keyof How as How[K] extends typeof SpyProp ? K : never]: How[K];
  },
  InitialPropsKeys extends keyof How = keyof {
    [K in keyof How as How[K] extends typeof ExtractProp ? never : How[K] extends typeof SpyProp ? never : K]: How[K];
  }
>(ContainerComponent: ContainerComponentType | false | null | undefined, how: How) {
  type ExtractProps = Pick<ContainerProps, ExtractPropsKeys>;
  type SpyProps = Pick<ContainerProps, SpyPropsKeys>;
  type InitialProps = Omit<ContainerProps, ExtractPropsKeys | SpyPropsKeys>;

  const extractPropsKeys: ExtractPropsKeys[] = Object.entries(how)
    .filter(([_, value]) => value === ExtractProp)
    .map(([key]) => key as keyof How) as ExtractPropsKeys[];

  const spyPropsKeys: SpyPropsKeys[] = Object.entries(how)
    .filter(([_, value]) => value === SpyProp)
    .map(([key]) => key as keyof How) as SpyPropsKeys[];

  const initialPropsKeys: InitialPropsKeys[] = Object.entries(how)
    .filter(([_, value]) => value !== ExtractProp && value !== SpyProp)
    .map(([key]) => key as keyof How) as InitialPropsKeys[];

  // Try fix this.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [initialProps] = pickAndOmit<InitialProps, ExtractProps | SpyProps>(how as any, initialPropsKeys as any);

  return function wrap<
    ContentComponentType extends ComponentType<ContentProps>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ContentProps extends Pick<ContainerProps, SpyPropsKeys> = Pick<ContainerProps, SpyPropsKeys>,
    Ref = RefOf<ContentProps>
  >(
    ContentComponent: ContentComponentType | false | null | undefined
  ): ComponentType<PropsWithoutRef<PropsOf<ContentComponentType> & ExtractProps> & RefAttributes<Ref>> {
    if (ContainerComponent) {
      const WithContainer = forwardRef<Ref, PropsOf<ContentComponentType> & ExtractProps>((props, ref) => {
        const [extractedProps, contentProps] = pickAndOmit<ExtractProps, PropsOf<ContentComponentType>>(
          props,
          extractPropsKeys
        );
        const spyProps = pick(props, spyPropsKeys);

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
        Pick<PropsOf<ContainerComponentType>, ExtractPropsKeys> & PropsOf<ContentComponentType>
      >((props, ref) => {
        const [, contentProps] = pickAndOmit<
          Pick<PropsOf<ContainerComponentType>, ExtractPropsKeys>,
          PropsOf<ContentComponentType> & { ref?: Ref }
        >(props, extractPropsKeys);

        return createElement(ContentComponent, { ...contentProps, ref });
      });

      WithContainer.displayName = ContentComponent.displayName;

      return WithContainer;
    }

    return EmptyComponent;
  };
}
