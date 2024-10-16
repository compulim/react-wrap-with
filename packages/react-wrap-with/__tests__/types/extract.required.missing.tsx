import React, { type PropsWithChildren } from 'react';

import { Extract, type HowOf, wrapWith } from '../../src/index.ts';

const Header = ({ children, className }: PropsWithChildren<{ className: string }>) => (
  <h1 className={className}>{children}</h1>
);

const Component = wrapWith(Header, { className: Extract } satisfies HowOf<typeof Header>)(() => <div />);

// "className" prop is mapped and is required.

// @ts-expect-error ["Property 'className' is missing in type '{}' but required in type '{ className: string; ref?: LegacyRef<unknown> | undefined; key?: Key | null | undefined; }'.", "Property 'className' is missing in type '{}' but required in type '{ className: string; ref?: Ref<unknown> | undefined; key?: Key | null | undefined; }'."]
<Component />;
