import React from 'react';

import { wrapWith } from '../../src/index';

import type { PropsWithChildren } from 'react';

type HeaderProps = PropsWithChildren<{ className: string; value?: string }>;

const Header = ({ children, className }: HeaderProps) => <h1 className={className}>{children}</h1>;

// @ts-expect-error Argument of type '{}' is not assignable to parameter of type 'HowOf<({ children, className }: HeaderProps) => Element, "className", "value">'.
wrapWith<typeof Header, 'className', 'value'>(Header, {});
