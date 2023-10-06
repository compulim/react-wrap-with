import React, { Fragment } from 'react';

import { type HowOf } from '../../src/index';

import type { ReactNode } from 'react';

const Header = ({ children }: { children?: ReactNode | undefined }) => <h1>{children}</h1>;

// "children" cannot be set in how.

// @ts-expect-error Type '{ children: React.JSX.Element; }' does not satisfy the expected type 'HowOf<({ children }: { children?: ReactNode; }) => Element>'.
({ children: <Fragment /> }) satisfies HowOf<typeof Header>;
