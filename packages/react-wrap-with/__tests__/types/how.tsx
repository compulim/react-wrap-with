import React from 'react';

import { Extract, type HowOf, Spy } from '../../src/index';

import type { PropsWithChildren } from 'react';

const Header = ({ children, className }: PropsWithChildren<{ className: string; role: string; value: string }>) => (
  <h1 className={className}>{children}</h1>
);

const how: HowOf<typeof Header, 'className', 'value'> = {
  className: Extract,
  role: 'main',
  value: Spy
};

console.log(how);
