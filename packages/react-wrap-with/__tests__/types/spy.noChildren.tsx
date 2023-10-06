import React from 'react';

import { type HowOf, Spy } from '../../src/index';

import type { ReactNode } from 'react';

const Header = (_: { children?: ReactNode | undefined }) => <h1>Hello, World!</h1>;

// Initial props must not have "children".

// @ts-expect-error Type '{ children: symbol; }' does not satisfy the expected type 'HowOf<(_: { children?: ReactNode; }) => Element>'.
({ children: Spy }) satisfies HowOf<typeof Header>;
