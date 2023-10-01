import React from 'react';

import { ExtractProp, type HowOf } from '../../src/index';

import type { PropsWithChildren } from 'react';

const Header = ({ children, className }: PropsWithChildren<{ className: string }>) => (
  <h1 className={className}>{children}</h1>
);

({
  // @ts-expect-error Type 'typeof ExtractProp' is not assignable to type 'typeof SpyProp'.
  className: ExtractProp
}) satisfies HowOf<typeof Header, never, 'className'>;
