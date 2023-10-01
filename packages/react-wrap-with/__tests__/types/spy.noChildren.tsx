import React from 'react';

import { type HowOf, SpyProp } from '../../src/index';

import type { ReactNode } from 'react';

const Header = (_: { children?: ReactNode | undefined }) => <h1>Hello, World!</h1>;

// Initial props must not have "children".

// @ts-expect-error Type 'symbol' is not assignable to type 'undefined'.
({ children: SpyProp }) satisfies HowOf<typeof Header>;
