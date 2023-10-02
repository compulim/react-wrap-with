import { type ComponentType } from 'react';
import { type PropsOf } from './private/type/PropsOf';
import type Extract from './Extract';
import type Spy from './Spy';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HowOf<T extends ComponentType<any>, E = never, S = never> = {
  [K in keyof PropsOf<T>]: K extends 'children'
    ? never
    : K extends E
    ? typeof Extract
    : K extends S
    ? typeof Spy
    : PropsOf<T>[K] | typeof Extract | typeof Spy;
};
