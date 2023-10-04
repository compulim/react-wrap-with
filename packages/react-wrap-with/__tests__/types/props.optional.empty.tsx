import React from 'react';

import { wrapWith } from '../../src/index';

import type { PropsWithChildren } from 'react';

const Header = ({ children }: PropsWithChildren<{ className?: string }>) => <h1>{children}</h1>;

wrapWith(Header);
