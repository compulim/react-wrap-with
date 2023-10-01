import React from 'react';

import { ExtractProp, type HowOf, wrapWith } from '../../src/index';

import type { PropsWithChildren } from 'react';

const Header = ({ children, className }: PropsWithChildren<{ className: string }>) => (
  <h1 className={className}>{children}</h1>
);

const Component = wrapWith(Header, { className: ExtractProp } satisfies HowOf<typeof Header>)(() => <div />);

// @ts-expect-error Type 'boolean' is not assignable to type 'string'.
<Component className={true} />;
