import React from 'react';

import { Extract, Spy, wrapWith } from '../../src/index';

import type { PropsWithChildren } from 'react';

type HeaderProps = PropsWithChildren<{ className: string; value?: string }>;

const Header = ({ children, className }: HeaderProps) => <h1 className={className}>{children}</h1>;

wrapWith<typeof Header, 'className', 'value'>(Header, { className: Extract, value: Spy });
