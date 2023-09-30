import React, { Fragment } from 'react';

import wrapWith, { type HowOf } from '../../src/wrapWith';

import type { ReactNode } from 'react';

const Header = ({ children }: { children?: ReactNode | undefined }) => <h1>{children}</h1>;

// "children" cannot be set in how.

// @ts-expect-error Type 'Element' is not assignable to type 'undefined'.
wrapWith(Header, { children: <Fragment /> } satisfies HowOf<typeof Header>);
