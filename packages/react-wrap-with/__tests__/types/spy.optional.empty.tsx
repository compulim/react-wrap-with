import React from 'react';

import { type HowOf, Spy, wrapWith } from '../../src/index';

import type { PropsWithChildren } from 'react';

const Header = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <h1 className={className}>{children}</h1>
);

const Component = wrapWith(Header, { className: Spy } satisfies HowOf<typeof Header>)(() => <div />);

// It is okay to render with "className" prop of empty, because "className" prop is optional.
<Component />;
