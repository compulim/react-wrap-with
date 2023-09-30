import React from 'react';

import wrapWith, { HowOf } from '../../../src/wrapWith';

import type { PropsWithChildren } from 'react';

const Header = ({ children }: PropsWithChildren<{ className: string }>) => <h1>{children}</h1>;

// "level" is not a prop.

// Property 'className' is missing in type '{ children?: ReactNode; }' but required in type '{ className: string; }'.
wrapWith(Header, { level: 1 } satisfies HowOf<typeof Header>);
