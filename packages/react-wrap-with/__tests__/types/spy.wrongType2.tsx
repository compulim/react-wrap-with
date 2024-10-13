import React, { type PropsWithChildren } from 'react';

import { type HowOf, Spy, wrapWith } from '../../src/index.ts';

const Header = ({ children, className }: PropsWithChildren<{ className: string }>) => (
  <h1 className={className}>{children}</h1>
);

// @ts-expect-error Type 'string' is not assignable to type 'number'.
wrapWith(Header, { className: Spy } satisfies HowOf<typeof Header>)((_: { className: number }) => <div />);
