import { type ComponentType } from 'react';

import type { PropsOf } from './PropsOf';
import type Extract from './Extract';
import type Spy from './Spy';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HowOf<T extends ComponentType<any> | false | null | undefined, E = never, S = never> = Omit<
  {
    [K in keyof Required<PropsOf<T>>]: K extends E
      ? typeof Extract
      : K extends S
      ? typeof Spy
      : PropsOf<T>[K] | typeof Extract | typeof Spy;
  },
  'children'
> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: typeof Extract | typeof Spy | undefined;
};
