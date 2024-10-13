import React, { type PropsWithChildren } from 'react';

import { wrapWith } from '../../src/index.ts';

const Header = ({ children }: PropsWithChildren<{ className?: string }>) => <h1>{children}</h1>;

wrapWith(Header, undefined);
