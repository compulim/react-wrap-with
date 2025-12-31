import React from 'react';
import { type EmptyObject } from 'type-fest';

import { wrapWith } from '../../src/index.ts';

const Header = (_: EmptyObject) => <h1>Hello, World!</h1>;

// All containers must allow "children" prop.

// @ts-expect-error ["Type '{ children?: ReactNode; }' has no properties in common with type 'EmptyObject'.", "Type 'PropsWithChildren<{ children?: ReactNode; }>' has no properties in common with type 'EmptyObject'."]
wrapWith(Header);
