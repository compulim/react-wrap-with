import React from 'react';

import { wrapWith } from '../../src/index';

const Header = (_: Record<string, never>) => <h1>Hello, World!</h1>;

// All containers must allow "children" prop.

// @ts-expect-error Type '{ children?: ReactNode; }' is not assignable to type 'Record<string, never>'.
wrapWith(Header);
