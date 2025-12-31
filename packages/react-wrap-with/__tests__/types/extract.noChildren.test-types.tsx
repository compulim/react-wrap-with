import React, { type ReactNode } from 'react';

import { Extract, type HowOf } from '../../src/index.ts';

const Header = (_: { children?: ReactNode | undefined }) => <h1>Hello, World!</h1>;

// Initial props must not have "children".

// @ts-expect-error Type 'symbol' is not assignable to type 'undefined'.
({ children: Extract }) satisfies HowOf<typeof Header>;
