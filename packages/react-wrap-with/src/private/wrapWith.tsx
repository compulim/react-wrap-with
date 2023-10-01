import React, { createElement, forwardRef, Fragment } from 'react';

import ExtractProp from '../ExtractProp';
import pick from './util/pick';
import pickAndOmit from './util/pickAndOmit';
import SpyProp from '../SpyProp';

import type { ComponentType, PropsWithChildren, PropsWithoutRef, ReactNode, RefAttributes } from 'react';
import type { HowOf } from '../HowOf';
import type { PropsOf } from './type/PropsOf';
import type { RefOf } from './type/RefOf';

const EmptyComponent = () => <Fragment />;

// Everything.
export default function wrapWith<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ContainerComponentType extends ComponentType<PropsWithChildren<any>>,
  ExtractPropKeys extends keyof PropsOf<ContainerComponentType> = never,
  SpyPropKeys extends keyof PropsOf<ContainerComponentType> = never,
  const How extends HowOf<ContainerComponentType, ExtractPropKeys, SpyPropKeys> = HowOf<
    ContainerComponentType,
    ExtractPropKeys,
    SpyPropKeys
  >
>(
  ContainerComponent: ContainerComponentType | false | null | undefined,
  how: How
): <
  ContentComponentType extends ComponentType<
    Pick<
      PropsOf<ContainerComponentType>,
      keyof {
        [K in keyof typeof how as (typeof how)[K] extends typeof SpyProp ? K : never]: (typeof how)[K];
      }
    >
  >,
  Ref = RefOf<PropsOf<ContentComponentType>>
>(
  ContentComponent: ContentComponentType | false | null | undefined
) => ComponentType<
  PropsWithoutRef<
    PropsOf<ContentComponentType> &
      Pick<
        PropsOf<ContainerComponentType>,
        keyof {
          [K in keyof typeof how as (typeof how)[K] extends typeof ExtractProp
            ? K
            : (typeof how)[K] extends typeof SpyProp
            ? K
            : never]: (typeof how)[K];
        }
      >
  > &
    RefAttributes<Ref>
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
  ExtractPropKeys extends keyof ContainerComponentType,
  SpyPropKeys extends keyof ContainerComponentType,
  const How extends HowOf<PropsOf<ContainerComponentType>, ExtractPropKeys, SpyPropKeys> = HowOf<
    ContainerComponentType,
    ExtractPropKeys,
    SpyPropKeys
  >
>(ContainerComponent: ContainerComponentType | false | null | undefined, how: How) {
  type ContainerProps = PropsOf<ContainerComponentType>;

  type ExtractPropsKeys = keyof {
    [K in keyof How as How[K] extends typeof ExtractProp ? K : never]: How[K];
  };
  type SpyPropsKeys = keyof {
    [K in keyof How as How[K] extends typeof SpyProp ? K : never]: How[K];
  };
  type InitialPropsKeys = keyof {
    [K in keyof How as How[K] extends typeof ExtractProp ? never : How[K] extends typeof SpyProp ? never : K]: How[K];
  };

  type ExtractProps = Pick<ContainerProps, ExtractPropsKeys>;
  type SpyProps = Pick<ContainerProps, SpyPropsKeys>;
  type InitialProps = Omit<ContainerProps, ExtractPropsKeys | SpyPropsKeys>;

  const extractPropsKeys: ExtractPropsKeys[] = Object.entries(how || {})
    .filter(([_, value]) => value === ExtractProp)
    .map(([key]) => key as keyof How) as ExtractPropsKeys[];

  const spyPropsKeys: SpyPropsKeys[] = Object.entries(how || {})
    .filter(([_, value]) => value === SpyProp)
    .map(([key]) => key as keyof How) as SpyPropsKeys[];

  const initialPropsKeys: InitialPropsKeys[] = Object.entries(how || {})
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
    ContentComponent: // | { how: How; extract: ExtractPropsKeys; spy: SpyPropsKeys; initial: InitialPropsKeys }
    ContentComponentType | false | null | undefined
  ): ComponentType<PropsWithoutRef<PropsOf<ContentComponentType> & ExtractProps & SpyProps> & RefAttributes<Ref>> {
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
