import React from 'react';

import wrapWith from '../../../src/wrapWith';

import type { ReactNode } from 'react';

const Header = ({ children, className }: { children?: ReactNode | undefined; className: string }) => (
  <h1 className={className}>{children}</h1>
);

// Because "className" is an extracted prop, it cannot be defined in initial prop.
// This is because the initial prop value will always be overwritten on extraction.
// Thus, defining it in initial prop is always meaningless.
wrapWith<typeof Header, 'className'>(Header, { className: 'abc' }, ['className']);
