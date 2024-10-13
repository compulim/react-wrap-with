import React, { type ReactNode } from 'react';

import { type HowOf, Spy } from '../../src/index.ts';

const Header = (_: { children?: ReactNode | undefined }) => <h1>Hello, World!</h1>;

// Initial props must not have "children".

// @ts-expect-error Type 'symbol' is not assignable to type 'undefined'.
({ children: Spy }) satisfies HowOf<typeof Header>;
