import React from 'react';

import wrapWith, { type HowOf } from '../../../src/wrapWith';

import type { PropsWithChildren } from 'react';

const Header = ({ children }: PropsWithChildren<{ className: string }>) => <h1>{children}</h1>;

// "children" cannot be set in how.

// @ts-expect-error Type 'number' is not assignable to type 'undefined'.
wrapWith(Header, { children: 123, className: 'abc' } satisfies HowOf<typeof Header>);
