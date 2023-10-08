import { createElement, forwardRef } from 'react';

import Extract from '../Extract';
import pick from './util/pick';
import pickAndOmit from './util/pickAndOmit';
import Spy from '../Spy';

import type { ComponentType, PropsWithChildren, PropsWithoutRef, ReactNode, RefAttributes } from 'react';
import type { EmptyObject } from 'type-fest';
import type { HowOf } from '../HowOf';
import type { PropsOf } from '../PropsOf';
import type { RefOf } from '../RefOf';

// Everything.
export default function wrapWith<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ContainerComponentType extends ComponentType<PropsWithChildren<any>>,
  const How extends HowOf<ContainerComponentType> = HowOf<ContainerComponentType>
>(
  containerComponent: ContainerComponentType,
  how: How
): <
  ContentProps extends Pick<
    PropsOf<ContainerComponentType>,
    keyof { [K in keyof How as How[K] extends typeof Spy ? K : never]: K }
  >,
  Ref extends RefOf<(typeof how)['ref'] extends typeof Extract ? PropsOf<ContainerComponentType> : ContentProps>
>(
  contentComponent: ComponentType<ContentProps>
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
export default function wrapWith<ContainerComponentType extends ComponentType<{ children?: ReactNode | undefined }>>(
  containerComponent: ContainerComponentType,
  how?: EmptyObject | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): <ContentComponentType extends ComponentType<any>, Ref = RefOf<PropsOf<ContentComponentType>>>(
  contentComponent: ContentComponentType
) => ComponentType<PropsWithoutRef<PropsOf<typeof contentComponent>> & RefAttributes<Ref>>;

export default function wrapWith<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ContainerComponentType extends ComponentType<PropsWithChildren<any>>,
  const How extends HowOf<ContainerComponentType> = HowOf<ContainerComponentType>
>(containerComponent: ContainerComponentType, how: How) {
  type ContainerProps = PropsOf<ContainerComponentType>;

  type ExtractProps = { [K in keyof How as How[K] extends typeof Extract ? K : never]: ContainerProps[K] };
  type SpyProps = { [K in keyof How as How[K] extends typeof Spy ? K : never]: ContainerProps[K] };

  const extractPropsKeys = Object.entries(how || {})
    .filter(([_, value]) => value === Extract)
    .map(([key]) => key as keyof How) as (keyof ExtractProps)[];

  const spyPropsKeys = Object.entries<typeof Extract | typeof Spy>(how || {})
    .filter(([_, value]) => value === Spy)
    .map(([key]) => key as keyof How) as (keyof SpyProps)[];

  const isRefExtracted = how && how.ref === Extract;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function wrap<
    ContentProps extends SpyProps,
    Ref extends RefOf<(typeof how)['ref'] extends typeof Extract ? ContainerProps : ContentProps>
  >(
    contentComponent: ComponentType<ContentProps>
  ): ComponentType<PropsWithoutRef<PropsOf<typeof contentComponent> & ExtractProps> & RefAttributes<Ref>> {
    const WithContainer = forwardRef<Ref, ExtractProps & ContentProps>((props, ref) => {
      const [extractedProps, contentProps] = pickAndOmit<ExtractProps, ContentProps>(props, extractPropsKeys);
      const spyProps = pick<ContentProps, keyof PropsOf<typeof contentComponent>>(props, spyPropsKeys);

      return createElement(
        containerComponent,
        { ...extractedProps, ...spyProps, ...(isRefExtracted ? { ref } : {}) },
        // If there are "ContentComponentType" is falsy, don't override children. It will override the `props.children`.
        ...(contentComponent
          ? [createElement(contentComponent, { ...contentProps, ...(isRefExtracted ? {} : { ref }) })]
          : [])
      );
    });

    WithContainer.displayName = `wrapWith(${containerComponent.displayName || 'Component'})(${
      (contentComponent || {}).displayName || 'Component'
    })`;

    return WithContainer;
  };
}
