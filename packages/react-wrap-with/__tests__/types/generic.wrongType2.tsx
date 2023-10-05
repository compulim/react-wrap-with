import React from 'react';

import { Spy, wrapWith } from '../../src/index';

import type { PropsWithChildren } from 'react';

type HeaderProps = PropsWithChildren<{ className: string; value?: string }>;

const Header = ({ children, className }: HeaderProps) => <h1 className={className}>{children}</h1>;

// @ts-expect-error Type 'typeof Spy' is not assignable to type 'typeof Extract'.
wrapWith<typeof Header, 'className', 'value'>(Header, { className: Spy, value: Spy });
