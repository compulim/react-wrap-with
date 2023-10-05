import React from 'react';

import { wrapWith } from '../../src/index';

import type { PropsWithChildren } from 'react';

type HeaderProps = PropsWithChildren<{ className: string; value?: string }>;

const Header = ({ children, className }: HeaderProps) => <h1 className={className}>{children}</h1>;

// @ts-expect-error Property 'className' is missing in type '{}' but required in type '{ className: unique symbol; value?: unique symbol | undefined; children?: undefined; }'.
wrapWith<typeof Header, 'className', 'value'>(Header, {});
