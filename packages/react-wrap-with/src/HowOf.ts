import { type ComponentType } from 'react';
import { type PropsOf } from './private/type/PropsOf';
import type ExtractProp from './ExtractProp';
import type SpyProp from './SpyProp';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HowOf<T extends ComponentType<any>, E = never, S = never> = {
  [K in keyof PropsOf<T>]: K extends 'children'
    ? never
    : K extends E
    ? typeof ExtractProp
    : K extends S
    ? typeof SpyProp
    : PropsOf<T>[K] | typeof ExtractProp | typeof SpyProp;
};
