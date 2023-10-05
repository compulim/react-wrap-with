import React from 'react';

import { Extract, wrapWith } from '../../src/index';

import type { PropsWithChildren } from 'react';

type HeaderProps = PropsWithChildren<{ className: string; value?: string }>;

const Header = ({ children, className }: HeaderProps) => <h1 className={className}>{children}</h1>;

// @ts-expect-error Type 'typeof Extract' is not assignable to type 'typeof Spy'.
wrapWith<typeof Header, 'className', 'value'>(Header, { className: Extract, value: Extract });
