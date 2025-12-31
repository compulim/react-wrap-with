import React, { type PropsWithChildren } from 'react';

import { type HowOf, Spy, wrapWith } from '../../src/index.ts';

const Header = ({ children, className }: PropsWithChildren<{ className: string }>) => (
  <h1 className={className}>{children}</h1>
);

const Component = wrapWith(Header, { className: Spy } satisfies HowOf<typeof Header>)(() => <div />);

// It is okay to render without "className" prop because "className" prop is optional.
<Component className="123" />;
