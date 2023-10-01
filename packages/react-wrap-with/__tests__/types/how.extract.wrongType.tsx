import React from 'react';

import { type HowOf, SpyProp } from '../../src/index';

import type { PropsWithChildren } from 'react';

const Header = ({ children, className }: PropsWithChildren<{ className: string }>) => (
  <h1 className={className}>{children}</h1>
);

({
  // @ts-expect-error Type 'typeof SpyProp' is not assignable to type 'typeof ExtractProp'.
  className: SpyProp
}) satisfies HowOf<typeof Header, 'className'>;
