import React from 'react';

import wrapWith, { HowOf } from '../../../src/wrapWith';

import type { FC, ReactNode } from 'react';

const Header: FC<{ children?: ReactNode | undefined }> = () => <h1>Hello, World!</h1>;

// Initial props must not have "children".

// @ts-expect-error Type 'string' is not assignable to type 'undefined'.
wrapWith(Header, { children: '123' } satisfies HowOf<typeof Header>);
