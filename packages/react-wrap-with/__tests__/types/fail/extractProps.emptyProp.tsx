import React from 'react';

import wrapWith, { ExtractProp, type HowOf } from '../../../src/wrapWith';

import type { ReactNode } from 'react';

const Header = ({ children }: { children?: ReactNode | undefined }) => <h1>{children}</h1>;

// "xyz" is not a prop of <Header> and cannot be extracted.

wrapWith(Header, { xyz: ExtractProp } satisfies HowOf<typeof Header>);
