import React from 'react';

import { ExtractProp, type HowOf, SpyProp } from '../../src/wrapWith';

import type { PropsWithChildren } from 'react';

const Header = ({ children, className }: PropsWithChildren<{ className: string; role: string; value: string }>) => (
  <h1 className={className}>{children}</h1>
);

const how: HowOf<typeof Header, 'className', 'value'> = {
  className: ExtractProp,
  role: 'main',
  value: SpyProp
};

console.log(how);
