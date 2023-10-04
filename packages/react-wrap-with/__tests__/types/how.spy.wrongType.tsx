import React from 'react';

import { Extract, type HowOf } from '../../src/index';

import type { PropsWithChildren } from 'react';

const Header = ({ children, className }: PropsWithChildren<{ className: string }>) => (
  <h1 className={className}>{children}</h1>
);

({
  // @ts-expect-error Type 'typeof Extract' is not assignable to type 'typeof Spy'.
  className: Extract
}) satisfies HowOf<typeof Header, never, 'className'>;
