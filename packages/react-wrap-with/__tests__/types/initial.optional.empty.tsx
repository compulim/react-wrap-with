import React from 'react';

import { type HowOf, wrapWith } from '../../src/index';

import type { PropsWithChildren } from 'react';

const Header = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <h1 className={className}>{children}</h1>
);

// Because "className" is extracted, it should be okay to pass {} for initialProps.
const Component = wrapWith(Header, {} satisfies HowOf<typeof Header>)(() => <div />);

// It is okay to render without "className" prop because "className" prop is optional.
<Component />;
