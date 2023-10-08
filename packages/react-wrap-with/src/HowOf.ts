import { type ComponentType } from 'react';

import type { PropsOf } from './PropsOf';
import type Extract from './Extract';
import type Spy from './Spy';

export type HowOf<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends ComponentType<any>,
  E extends keyof PropsOf<T> = never,
  S extends keyof PropsOf<T> = never
> = {
  [K in keyof Required<Omit<PropsOf<T>, 'key' | 'ref'>> as K extends 'children' ? never : K]: K extends E
    ? typeof Extract
    : K extends S
    ? typeof Spy
    : typeof Extract | typeof Spy;
} & {
  ref?: typeof Extract | undefined;
};
