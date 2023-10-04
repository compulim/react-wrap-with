import React from 'react';

import { type HowOf, Spy } from '../../src/index';

import type { PropsWithChildren } from 'react';

const Header = ({ children, className }: PropsWithChildren<{ className: string }>) => (
  <h1 className={className}>{children}</h1>
);

({
  // @ts-expect-error Type 'typeof Spy' is not assignable to type 'typeof Extract'.
  className: Spy
}) satisfies HowOf<typeof Header, 'className'>;
