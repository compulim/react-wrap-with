import React from 'react';

import wrapWith from '../../src/wrapWith';

import type { PropsWithChildren } from 'react';

const Header = ({ children }: PropsWithChildren<Record<any, never>>) => <h1>{children}</h1>;

wrapWith(Header, undefined);
