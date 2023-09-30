import React from 'react';

import wrapWith, { ExtractProp, type HowOf } from '../../src/wrapWith';

import type { ReactNode } from 'react';

const Header = (_: { children?: ReactNode | undefined }) => <h1>Hello, World!</h1>;

// Initial props must not have "children".

// @ts-expect-error Type 'symbol' is not assignable to type 'undefined'.
wrapWith(Header, { children: ExtractProp } satisfies HowOf<typeof Header>);
