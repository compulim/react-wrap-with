import React from 'react';

import wrapWith, { ExtractProp, type HowOf } from '../../../src/wrapWith';

import type { PropsWithChildren } from 'react';

const Header = ({ children }: PropsWithChildren<{ abc: number }>) => <h1>{children}</h1>;

// "xyz" is not a prop of <Header> and cannot be extracted.

// @ts-expect-error Object literal may only specify known properties, and 'xyz' does not exist in type 'HowOf<({ children }: PropsWithChildren<{ abc: number; }>) => Element>'.
wrapWith(Header, { abc: 123, xyz: ExtractProp } satisfies HowOf<typeof Header>);
