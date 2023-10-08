import { type ComponentType } from 'react';

import type { PropsOf } from './PropsOf';
import type Extract from './Extract';
import type Spy from './Spy';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HowOf<T extends ComponentType<any> | false | null | undefined, E = never, S = never> = {
  [K in keyof Required<Omit<PropsOf<T>, 'key' | 'ref'>> as K extends 'children' ? never : K]: K extends E
    ? typeof Extract
    : K extends S
    ? typeof Spy
    : typeof Extract | typeof Spy;
} & {
  ref?: typeof Extract | undefined;
};
