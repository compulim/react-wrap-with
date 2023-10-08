import React from 'react';

import { Extract, type HowOf } from '../../src/index';

import type { ReactNode } from 'react';

const Header = ({ children }: { children?: ReactNode | undefined }) => <h1>{children}</h1>;

// "xyz" is not a prop of <Header> and cannot be extracted.

// @ts-expect-error Type '{ className: symbol; }' does not satisfy the expected type '{ children?: undefined; key?: undefined; ref?: unique symbol | undefined; }'.
({ className: Extract }) satisfies HowOf<typeof Header>;
