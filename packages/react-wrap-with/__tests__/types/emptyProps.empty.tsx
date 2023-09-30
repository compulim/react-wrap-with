import React from 'react';

import wrapWith, { type HowOf } from '../../src/wrapWith';

import type { ReactNode } from 'react';

const Header = ({ children }: { children?: ReactNode | undefined }) => <h1>{children}</h1>;

wrapWith(Header, {} satisfies HowOf<typeof Header>);
