import React from 'react';

import wrapWith, { HowOf } from '../../../src/wrapWith';

import type { ReactNode } from 'react';

const Header = ({ children }: { children?: ReactNode | undefined }) => <h1>{children}</h1>;

// "className" is not allowed in prop.

// Object literal may only specify known properties, and 'className' does not exist in type 'HowOf<({ children }: { children?: ReactNode; }) => Element>'.
wrapWith(Header, { className: '123' } satisfies HowOf<typeof Header>);
