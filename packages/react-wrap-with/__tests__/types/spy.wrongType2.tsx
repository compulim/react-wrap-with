import React from 'react';

import { type HowOf, SpyProp, wrapWith } from '../../src/index';

import type { PropsWithChildren } from 'react';

const Header = ({ children, className }: PropsWithChildren<{ className: string }>) => (
  <h1 className={className}>{children}</h1>
);

// @ts-expect-error Type 'string' is not assignable to type 'number'.
wrapWith(Header, { className: SpyProp } satisfies HowOf<typeof Header>)((_: { className: number }) => <div />);
