import {
  createElement,
  forwardRef,
  type ComponentType,
  type PropsWithChildren,
  type PropsWithoutRef,
  type ReactNode,
  type RefAttributes
} from 'react';

// Related to https://github.com/import-js/eslint-plugin-import/issues/2872.
// eslint-disable-next-line import/consistent-type-specifier-style
import type { ConditionalKeys, Simplify } from 'type-fest';

import Extract from '../Extract.ts';
import { type HowOf } from '../HowOf.ts';
import { type PropsOf } from '../PropsOf.ts';
import { type RefOf } from '../RefOf.ts';
import Spy from '../Spy.ts';
import pick from './util/pick.ts';
import pickAndOmit from './util/pickAndOmit.ts';

// Everything.
export default function wrapWith<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ContainerComponentType extends ComponentType<PropsWithChildren<any>>,
  const How extends HowOf<ContainerComponentType>
>(
  containerComponent: ContainerComponentType,
  how: How
): <
  ContentProps extends Pick<PropsOf<ContainerComponentType>, ConditionalKeys<How, typeof Spy>>,
  Ref extends RefOf<(typeof how)['ref'] extends typeof Extract ? PropsOf<ContainerComponentType> : ContentProps>
>(
  contentComponent: ComponentType<ContentProps>
) => ComponentType<
  Simplify<
    PropsWithoutRef<
      PropsOf<typeof contentComponent> & Pick<PropsOf<ContainerComponentType>, ConditionalKeys<How, typeof Extract>>
    > &
      RefAttributes<Ref>
  >
>;

// If <Container> need no props other than children, initialProps is optional.
export default function wrapWith<ContainerComponentType extends ComponentType<{ children?: ReactNode | undefined }>>(
  containerComponent: ContainerComponentType,
  how?: undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): <ContentComponentType extends ComponentType<any>, Ref = RefOf<PropsOf<ContentComponentType>>>(
  contentComponent: ContentComponentType
) => ComponentType<Simplify<PropsWithoutRef<PropsOf<typeof contentComponent>> & RefAttributes<Ref>>>;

export default function wrapWith<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ContainerComponentType extends ComponentType<PropsWithChildren<any>>,
  How extends HowOf<ContainerComponentType>
>(containerComponent: ContainerComponentType, how?: How | undefined) {
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
    Ref extends RefOf<Exclude<typeof how, undefined>['ref'] extends typeof Extract ? ContainerProps : ContentProps>
  >(
    contentComponent: ComponentType<ContentProps>
  ): ComponentType<Simplify<PropsWithoutRef<PropsOf<typeof contentComponent> & ExtractProps> & RefAttributes<Ref>>> {
    const WithContainer = forwardRef<Ref, ExtractProps & ContentProps>((props, ref) => {
      const [extractedProps, contentProps] = pickAndOmit<ExtractProps, ContentProps>(
        props as ExtractProps & ContentProps, // "props" do not have "ref", we will assign it below.
        extractPropsKeys
      );
      const spyProps = pick<ContentProps, keyof PropsOf<typeof contentComponent>>(
        props as ExtractProps & ContentProps, // "props" do not have "ref" but spy will never have "ref" either.
        spyPropsKeys
      );

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

    // Simplify<> don't play nice, we need to force cast here.
    return WithContainer as unknown as ComponentType<
      Simplify<PropsWithoutRef<PropsOf<typeof contentComponent> & ExtractProps> & RefAttributes<Ref>>
    >;
  };
}
