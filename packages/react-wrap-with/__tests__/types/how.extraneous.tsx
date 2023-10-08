import React from 'react';

import { Extract, type HowOf } from '../../src/index';

import type { PropsWithChildren } from 'react';

const Header = ({ children, className }: PropsWithChildren<{ className: string }>) => (
  <h1 className={className}>{children}</h1>
);

({
  // @ts-expect-error Type '{ value: symbol; }' does not satisfy the expected type 'HowOf<({ children, className }: PropsWithChildren<{ className: string; }>) => Element, never, "className">'.
  value: Extract
}) satisfies HowOf<typeof Header, never, 'className'>;
