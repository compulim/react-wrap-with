import React from 'react';

import wrapWith from '../../../src/wrapWith';

import type { PropsWithChildren } from 'react';

const Header = ({ children }: PropsWithChildren<{ abc: number }>) => <h1>{children}</h1>;

// "xyz" is not a prop of <Header> and cannot be extracted.
wrapWith(Header, { abc: 123 }, ['xyz']);
