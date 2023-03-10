import React from 'react';

import wrapWith from '../../../src/wrapWith';

import type { FC, ReactNode } from 'react';

const Header: FC<{ children?: ReactNode | undefined }> = () => <h1>Hello, World!</h1>;

// Initial props must not have "children".
wrapWith(Header, { children: '123' });
