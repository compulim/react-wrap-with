import React from 'react';

import wrapWith, { type HowOf } from '../../../src/wrapWith';

import type { PropsWithChildren } from 'react';

const Header = ({ children }: PropsWithChildren<{ className: string }>) => <h1>{children}</h1>;

// "children" cannot be set in how.

// Object literal may only specify known properties, and 'children' does not exist in type 'HowOf<({ children }: PropsWithChildren<{ className: string; }>) => Element>'.
wrapWith(Header, { children: 123, className: 'abc' } satisfies HowOf<typeof Header>);
