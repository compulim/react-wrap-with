import React from 'react';

import { wrapWith } from '../../src/index';

import type { PropsWithChildren } from 'react';

const Header = ({ children }: PropsWithChildren<{ className: string }>) => <h1>{children}</h1>;

// "className" is required.

// @ts-expect-error ["Property 'className' is missing in type '{ children?: ReactNode; }' but required in type '{ className: string; }'.", "Property 'className' is missing in type 'PropsWithChildren<{ children?: ReactNode; }>' but required in type '{ className: string; }'."]
wrapWith(Header);
