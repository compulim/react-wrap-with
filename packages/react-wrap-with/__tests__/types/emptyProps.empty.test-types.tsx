import React, { type ReactNode } from 'react';

import { type HowOf, wrapWith } from '../../src/index.ts';

const Header = ({ children }: { children?: ReactNode | undefined }) => <h1>{children}</h1>;

wrapWith(Header, {} satisfies HowOf<typeof Header>);
