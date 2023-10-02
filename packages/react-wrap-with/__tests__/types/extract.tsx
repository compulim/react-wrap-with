import React from 'react';

import { Extract, type HowOf, wrapWith } from '../../src/index';

import type { PropsWithChildren } from 'react';

const Header = ({ children, className }: PropsWithChildren<{ className: string }>) => (
  <h1 className={className}>{children}</h1>
);

const Component = wrapWith(Header, { className: Extract } satisfies HowOf<typeof Header>)(() => <div />);

<Component className="123" />;
