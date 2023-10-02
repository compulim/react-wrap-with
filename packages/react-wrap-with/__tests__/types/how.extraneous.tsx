import React from 'react';

import { Extract, type HowOf } from '../../src/index';

import type { PropsWithChildren } from 'react';

const Header = ({ children, className }: PropsWithChildren<{ className: string }>) => (
  <h1 className={className}>{children}</h1>
);

({
  // @ts-expect-error Object literal may only specify known properties, and 'value' does not exist in type 'HowOf<({ children, className }: PropsWithChildren<{ className: string; }>) => Element, never, "className">'.
  value: Extract
}) satisfies HowOf<typeof Header, never, 'className'>;
