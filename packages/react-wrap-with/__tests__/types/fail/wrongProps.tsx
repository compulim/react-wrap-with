import React from 'react';

import wrapWith, { HowOf } from '../../../src/wrapWith';

import type { PropsWithChildren } from 'react';

const Header = ({ children }: PropsWithChildren<{ className: string }>) => <h1>{children}</h1>;

// "level" is not a prop.

// @ts-expect-error Object literal may only specify known properties, and 'level' does not exist in type 'HowOf<({ children }: PropsWithChildren<{ className: string; }>) => Element>'.
wrapWith(Header, { level: 1 } satisfies HowOf<typeof Header>);
