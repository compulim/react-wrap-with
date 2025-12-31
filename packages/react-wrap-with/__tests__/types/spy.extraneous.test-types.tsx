import React, { type ReactNode } from 'react';

import { type HowOf, Spy } from '../../src/index.ts';

const Header = ({ children }: { children?: ReactNode | undefined }) => <h1>{children}</h1>;

// "xyz" is not a prop of <Header> and cannot be extracted.

// @ts-expect-error Object literal may only specify known properties, and 'className' does not exist in type '{ children?: undefined; key?: undefined; ref?: unique symbol | undefined; }'.
({ className: Spy }) satisfies HowOf<typeof Header>;
