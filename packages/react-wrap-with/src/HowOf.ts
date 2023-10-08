import { type ComponentType } from 'react';

import type { PropsOf } from './PropsOf';
import type { Simplify } from 'type-fest';
import type Extract from './Extract';
import type Spy from './Spy';

export type HowOf<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends ComponentType<any>
> = Simplify<
  {
    [K in keyof Required<Omit<PropsOf<T>, 'children' | 'key' | 'ref'>>]: typeof Extract | typeof Spy;
  } & {
    children?: never;
    key?: never;
    ref?: typeof Extract | undefined;
  }
>;
