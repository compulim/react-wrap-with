import React from 'react';

import wrapWith, { type HowOf } from '../../src/wrapWith';

import type { PropsWithChildren } from 'react';

const Header = ({ children, className }: PropsWithChildren<{ className: string }>) => (
  <h1 className={className}>{children}</h1>
);

// Because "className" is extracted, it should be okay to pass undefined for initialProps.
const Component = wrapWith(Header, { className: '123' } satisfies HowOf<typeof Header>)(() => <div />);

// It is okay to render without "className" prop because "className" prop is optional.
<Component />;
