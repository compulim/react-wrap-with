import { type ComponentType } from 'react';
// Related to https://github.com/import-js/eslint-plugin-import/issues/2872.
// eslint-disable-next-line import/consistent-type-specifier-style
import type { Simplify } from 'type-fest';

import type Extract from './Extract';
import { type PropsOf } from './PropsOf.ts';
import type Spy from './Spy';

export type HowOf<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends ComponentType<any>
> = Simplify<
  {
    [K in keyof Omit<Required<PropsOf<T>>, 'children' | 'key' | 'ref'>]: typeof Extract | typeof Spy;
  } & {
    children?: never;
    key?: never;
    ref?: typeof Extract | undefined;
  }
>;
