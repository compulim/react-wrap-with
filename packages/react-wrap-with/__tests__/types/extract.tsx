import React from 'react';

import wrapWith, { ExtractProp, type HowOf } from '../../src/wrapWith';

import type { PropsWithChildren } from 'react';

const Header = ({ children, className }: PropsWithChildren<{ className: string }>) => (
  <h1 className={className}>{children}</h1>
);

const Component = wrapWith(Header, { className: ExtractProp } satisfies HowOf<typeof Header>)(() => <div />);

<Component className="123" />;
