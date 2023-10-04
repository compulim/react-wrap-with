import React from 'react';

import { wrapWith } from '../../src/index';

import type { ReactNode } from 'react';

const Header = ({ children }: { children?: ReactNode | undefined }) => <h1>{children}</h1>;

wrapWith(Header);
