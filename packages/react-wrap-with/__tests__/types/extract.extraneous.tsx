import React from 'react';

import { ExtractProp, type HowOf } from '../../src/index';

import type { ReactNode } from 'react';

const Header = ({ children }: { children?: ReactNode | undefined }) => <h1>{children}</h1>;

// "xyz" is not a prop of <Header> and cannot be extracted.

// @ts-expect-error Object literal may only specify known properties, and 'className' does not exist in type 'HowOf<({ children }: { children?: ReactNode; }) => Element>'.
({ className: ExtractProp }) satisfies HowOf<typeof Header>;
