import React, { type PropsWithChildren } from 'react';

import { Extract, type HowOf, wrapWith } from '../../src/index.ts';

const Header = ({ children, className }: PropsWithChildren<{ className: string }>) => (
  <h1 className={className}>{children}</h1>
);

const Component = wrapWith(Header, { className: Extract } satisfies HowOf<typeof Header>)(() => <div />);

// @ts-expect-error Type 'boolean' is not assignable to type 'string'.
<Component className={true} />;
