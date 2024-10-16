import React, { type PropsWithChildren } from 'react';

import { Extract, type HowOf, wrapWith } from '../../src/index.ts';

const Header = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <h1 className={className}>{children}</h1>
);

// Because "className" is extracted, it should be okay to pass undefined for initialProps.
const Component = wrapWith(Header, { className: Extract } satisfies HowOf<typeof Header>)(() => <div />);

// It is okay to render without "className" prop because "className" prop is optional.
<Component className={undefined} />;
