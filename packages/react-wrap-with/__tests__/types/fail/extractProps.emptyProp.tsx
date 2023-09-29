import React from 'react';

import wrapWith, { ExtractProp } from '../../../src/wrapWith';

import type { ReactNode } from 'react';

const Header = ({ children }: { children?: ReactNode | undefined }) => <h1>{children}</h1>;

// "xyz" is not a prop of <Header> and cannot be extracted.
wrapWith(Header, { xyz: ExtractProp });
