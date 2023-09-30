import React from 'react';

import wrapWith, { ExtractProp } from '../../../src/wrapWith';

import type { PropsWithChildren } from 'react';

const Header = ({ children, className }: PropsWithChildren<{ className: string }>) => (
  <h1 className={className}>{children}</h1>
);

const Container = wrapWith(Header, { className: ExtractProp })(() => <div />);

// "className" prop is mapped and is required.

// Property 'className' is missing in type '{}' but required in type 'Pick<{ className: string; } & { children?: ReactNode; }, "className">'.
<Container />;
