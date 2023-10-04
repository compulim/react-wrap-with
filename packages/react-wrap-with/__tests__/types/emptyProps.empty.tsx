import React from 'react';

import { type HowOf, wrapWith } from '../../src/index';

import type { ReactNode } from 'react';

const Header = ({ children }: { children?: ReactNode | undefined }) => <h1>{children}</h1>;

wrapWith(Header, {} satisfies HowOf<typeof Header>);
