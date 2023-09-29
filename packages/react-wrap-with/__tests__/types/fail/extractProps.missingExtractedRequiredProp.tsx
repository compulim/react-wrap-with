import React from 'react';

import wrapWith, { ExtractProp } from '../../../src/wrapWith';

import type { PropsWithChildren } from 'react';

const Header = ({ children, className }: PropsWithChildren<{ className: string }>) => (
  <h1 className={className}>{children}</h1>
);

const Component = wrapWith(Header, { className: ExtractProp })(() => <div />);

// "className" prop is mapped and is required.
<Component />;
