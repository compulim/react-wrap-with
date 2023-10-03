import React, { createElement, forwardRef, Fragment } from 'react';

import Extract from '../Extract';
import pick from './util/pick';
import pickAndOmit from './util/pickAndOmit';
import Spy from '../Spy';

import type { ComponentType, PropsWithChildren, PropsWithoutRef, ReactNode, RefAttributes } from 'react';
import type { HowOf } from '../HowOf';
import type { PropsOf } from './type/PropsOf';
import type { RefOf } from './type/RefOf';

const EmptyComponent = () => <Fragment />;

// Everything.
export default function wrapWith<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ContainerComponentType extends ComponentType<PropsWithChildren<any>>,
  ExtractPropKey extends keyof ContainerComponentType,
  SpyPropKey extends keyof ContainerComponentType,
  const How extends HowOf<PropsOf<ContainerComponentType>, ExtractPropKey, SpyPropKey> = HowOf<
    ContainerComponentType,
    ExtractPropKey,
    SpyPropKey
  >
>(
  ContainerComponent: ContainerComponentType | false | null | undefined,
  how: How
): <
  MinimalContentProps extends Pick<
    PropsOf<ContainerComponentType>,
    keyof {
      [K in keyof How as How[K] extends typeof Spy ? K : never]: How[K];
    }
  >,
  Ref extends RefOf<MinimalContentProps>
>(
  contentComponent: ComponentType<MinimalContentProps> | false | null | undefined
) => ComponentType<
  PropsWithoutRef<
    PropsOf<typeof contentComponent> &
      Pick<
        PropsOf<ContainerComponentType>,
        keyof {
          [K in keyof How as How[K] extends typeof Extract ? K : never]: How[K];
        }
      >
  > &
    RefAttributes<Ref>
>;

// If <Container> need no props other than children, initialProps is optional.
export default function wrapWith<
  ContainerComponentType extends ComponentType<{ children?: ReactNode | undefined }> | false | null | undefined
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
  ExtractPropKey extends keyof ContainerComponentType,
  SpyPropKey extends keyof ContainerComponentType,
  const How extends HowOf<PropsOf<ContainerComponentType>, ExtractPropKey, SpyPropKey> = HowOf<
    ContainerComponentType,
    ExtractPropKey,
    SpyPropKey
  >
>(ContainerComponent: ContainerComponentType | false | null | undefined, how: How) {
  type ContainerProps = PropsOf<ContainerComponentType>;
  type ExtractPropsKeys = keyof {
    [K in keyof How as How[K] extends typeof Extract ? K : never]: How[K];
  };
  type SpyPropsKeys = keyof {
    [K in keyof How as How[K] extends typeof Spy ? K : never]: How[K];
  };

  // Could we simplified?
  // type ExtractProps = { [K in keyof How as How[K] extends typeof Extract ? K : never]: ContainerProps[K] };
  // type SpyProps = { [K in keyof How as How[K] extends typeof Spy ? K : never]: ContainerProps[K] };
  type ExtractProps = Pick<ContainerProps, ExtractPropsKeys>;
  type SpyProps = Pick<ContainerProps, SpyPropsKeys>;
  type InitialProps = Omit<ContainerProps, ExtractPropsKeys | SpyPropsKeys>;

  type InitialPropsKeys = keyof InitialProps;

  const extractPropsKeys: ExtractPropsKeys[] = Object.entries(how || {})
    .filter(([_, value]) => value === Extract)
    .map(([key]) => key as keyof How) as ExtractPropsKeys[];

  const spyPropsKeys: SpyPropsKeys[] = Object.entries(how || {})
    .filter(([_, value]) => value === Spy)
    .map(([key]) => key as keyof How) as SpyPropsKeys[];

  const initialPropsKeys: InitialPropsKeys[] = Object.entries(how || {})
    .filter(([_, value]) => value !== Extract && value !== Spy)
    .map(([key]) => key as keyof How) as InitialPropsKeys[];

  const [initialProps] = pickAndOmit<InitialProps, ExtractProps | SpyProps>(
    // Try fix this.
    (how || {}) as InitialProps & ExtractProps & SpyProps,
    initialPropsKeys
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function wrap<MinimalContentProps extends SpyProps, Ref extends RefOf<MinimalContentProps>>(
    contentComponent: ComponentType<MinimalContentProps> | false | null | undefined
  ): ComponentType<PropsWithoutRef<PropsOf<typeof contentComponent> & ExtractProps> & RefAttributes<Ref>> {
    if (ContainerComponent) {
      const WithContainer = forwardRef<Ref, ExtractProps & MinimalContentProps>((props, ref) => {
        const [extractedProps, contentProps] = pickAndOmit<ExtractProps, MinimalContentProps>(props, extractPropsKeys);
        const spyProps = pick<MinimalContentProps, SpyPropsKeys>(props, spyPropsKeys);

        return createElement(
          ContainerComponent,
          { ...initialProps, ...extractedProps, ...spyProps },
          // If there are "ContentComponentType" is falsy, don't override children. It will override the `props.children`.
          ...(contentComponent ? [createElement(contentComponent, { ...contentProps, ref })] : [])
        );
      });

      WithContainer.displayName = `WrappedWith${ContainerComponent.displayName || 'Component'}`;

      return WithContainer;
    }

    if (contentComponent) {
      const WithContainer = forwardRef<Ref, ExtractProps & MinimalContentProps>((props, ref) => {
        const [, contentProps] = pickAndOmit<
          Pick<PropsOf<ContainerComponentType>, ExtractPropsKeys>,
          MinimalContentProps
        >(props, extractPropsKeys);

        return createElement(contentComponent, { ...contentProps, ref });
      });

      WithContainer.displayName = contentComponent.displayName;

      return WithContainer;
    }

    return EmptyComponent;
  };
}
