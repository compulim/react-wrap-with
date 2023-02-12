import React from 'react';

import wrapWith from '../../src/wrapWith';

import type { PropsWithChildren } from 'react';

const Header = ({ children }: PropsWithChildren<{}>) => <h1>{children}</h1>;

wrapWith(Header, undefined);
