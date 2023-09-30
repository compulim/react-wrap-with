import React from 'react';

import wrapWith, { ExtractProp, type HowOf } from '../../src/wrapWith';

import type { PropsWithChildren } from 'react';

const Header = ({ children, className }: PropsWithChildren<{ className: string }>) => (
  <h1 className={className}>{children}</h1>
);

const Container = wrapWith(Header, { className: ExtractProp } satisfies HowOf<typeof Header>)(() => <div />);

// @ts-expect-error Type 'boolean' is not assignable to type 'string'.
<Container className={true} />;
