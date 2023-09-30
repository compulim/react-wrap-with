import React from 'react';

import wrapWith, { type HowOf, SpyProp } from '../../src/wrapWith';

import type { PropsWithChildren } from 'react';

const Header = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <h1 className={className}>{children}</h1>
);

const Component = wrapWith(Header, { className: SpyProp } satisfies HowOf<typeof Header>)(() => <div />);

// It is okay to render with "className" prop of undefined, because "className" prop is optional.
<Component className={undefined} />;
