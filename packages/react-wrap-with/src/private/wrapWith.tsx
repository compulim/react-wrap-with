import React, { createElement, forwardRef, Fragment } from 'react';

import Extract from '../Extract';
import pick from './util/pick';
import pickAndOmit from './util/pickAndOmit';
import Spy from '../Spy';

import type { ComponentType, PropsWithChildren, PropsWithoutRef, ReactNode, RefAttributes } from 'react';
import type { HowOf } from '../HowOf';
import type { PropsOf } from '../PropsOf';
import type { RefOf } from '../RefOf';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EmptyComponent: ComponentType<any> = () => <Fragment />;

EmptyComponent.displayName = 'wrapWith(never)(never)';

// Everything.
export default function wrapWith<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ContainerComponentType extends ComponentType<PropsWithChildren<any>>,
  ExtractPropKey extends keyof PropsOf<ContainerComponentType>,
  SpyPropKey extends keyof PropsOf<ContainerComponentType>,
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
    keyof { [K in keyof How as How[K] extends typeof Spy ? K : never]: K }
  >,
  Ref extends RefOf<(typeof how)['ref'] extends typeof Extract ? PropsOf<ContainerComponentType> : MinimalContentProps>
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
  ExtractPropsKey extends keyof PropsOf<ContainerComponentType>,
  SpyPropsKey extends keyof PropsOf<ContainerComponentType>,
  const How extends HowOf<PropsOf<ContainerComponentType>, ExtractPropsKey, SpyPropsKey> = HowOf<
    ContainerComponentType,
    ExtractPropsKey,
    SpyPropsKey
  >
>(ContainerComponent: ContainerComponentType | false | null | undefined, how: How) {
  type ContainerProps = PropsOf<ContainerComponentType>;

  type ExtractProps = { [K in keyof How as How[K] extends typeof Extract ? K : never]: ContainerProps[K] };
  type ExtractPropsKeys = keyof ExtractProps;

  type SpyProps = { [K in keyof How as How[K] extends typeof Spy ? K : never]: ContainerProps[K] };
  type SpyPropsKeys = keyof SpyProps;

  const extractPropsKeys: ExtractPropsKeys[] = Object.entries(how || {})
    .filter(([_, value]) => value === Extract)
    .map(([key]) => key as keyof How) as ExtractPropsKeys[];

  const spyPropsKeys: SpyPropsKeys[] = Object.entries<typeof Extract | typeof Spy>(how || {})
    .filter(([_, value]) => value === Spy)
    .map(([key]) => key as keyof How) as SpyPropsKeys[];

  const isRefExtracted = how && how.ref === Extract;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function wrap<
    MinimalContentProps extends SpyProps,
    Ref extends RefOf<(typeof how)['ref'] extends typeof Extract ? ContainerProps : MinimalContentProps>
  >(
    contentComponent: ComponentType<MinimalContentProps> | false | null | undefined
  ): ComponentType<PropsWithoutRef<PropsOf<typeof contentComponent> & ExtractProps> & RefAttributes<Ref>> {
    if (ContainerComponent) {
      const WithContainer = forwardRef<Ref, ExtractProps & MinimalContentProps>((props, ref) => {
        const [extractedProps, contentProps] = pickAndOmit<ExtractProps, MinimalContentProps>(props, extractPropsKeys);
        const spyProps = pick<MinimalContentProps, SpyPropsKeys>(props, spyPropsKeys);

        return createElement(
          ContainerComponent,
          { ...extractedProps, ...spyProps, ...(isRefExtracted ? { ref } : {}) },
          // If there are "ContentComponentType" is falsy, don't override children. It will override the `props.children`.
          ...(contentComponent
            ? [createElement(contentComponent, { ...contentProps, ...(isRefExtracted ? {} : { ref }) })]
            : [])
        );
      });

      WithContainer.displayName = `wrapWith(${ContainerComponent.displayName || 'Component'})(${
        (contentComponent || {}).displayName || 'Component'
      })`;

      return WithContainer;
    }

    if (contentComponent) {
      const WithContainer = forwardRef<Ref, ExtractProps & MinimalContentProps>((props, ref) => {
        const [, contentProps] = pickAndOmit<ExtractProps, MinimalContentProps>(props, extractPropsKeys);

        return createElement(contentComponent, { ...contentProps, ...(isRefExtracted ? {} : { ref }) });
      });

      WithContainer.displayName = `wrapWith(never)(${(contentComponent || {}).displayName || 'Component'})`;

      return WithContainer;
    }

    return EmptyComponent;
  };
}
