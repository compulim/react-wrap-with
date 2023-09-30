import React from 'react';

import wrapWith, { HowOf } from '../../../src/wrapWith';

import type { ReactNode } from 'react';

const Header = ({ children }: { children?: ReactNode | undefined }) => <h1>{children}</h1>;

// "className" is not allowed in prop.
wrapWith(Header, { className: '123' } satisfies HowOf<typeof Header>);
