import React from 'react';

import wrapWith, { type HowOf } from '../../src/wrapWith';

import type { PropsWithChildren } from 'react';

const Header = ({ children, className }: PropsWithChildren<{ className: string }>) => (
  <h1 className={className}>{children}</h1>
);

// @ts-expect-error Type 'true' is not assignable to type 'string | unique symbol | unique symbol'.
console.log({ className: true } satisfies HowOf<typeof Header>);
