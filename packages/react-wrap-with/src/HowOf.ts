import { type ComponentType } from 'react';

import type { PropsOf } from './PropsOf';
import type Extract from './Extract';
import type Spy from './Spy';

export type HowOf<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends ComponentType<any>
> = {
  [K in keyof Required<Omit<PropsOf<T>, 'key' | 'ref'>> as K extends 'children' ? never : K]:
    | typeof Extract
    | typeof Spy;
} & {
  children?: never;
  key?: never;
  ref?: typeof Extract | undefined;
};
