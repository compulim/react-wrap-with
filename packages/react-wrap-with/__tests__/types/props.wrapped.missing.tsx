import React from 'react';

import { wrapWith } from '../../src/index';

import type { ReactNode } from 'react';

const Header = ({ children }: { children?: ReactNode | undefined }) => <h1>{children}</h1>;

const Component = wrapWith(Header)(({ role }: { role: string }) => <div role={role} />);

// "role" prop is required.

// @ts-expect-error Property 'role' is missing in type '{}' but required in type '{ role: string; }'.
<Component />;
