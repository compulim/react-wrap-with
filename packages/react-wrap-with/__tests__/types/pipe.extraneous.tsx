import React, { type PropsWithChildren } from 'react';

import { Extract, wrapWith } from '../../src/index.ts';

const Effect = ({ children, effect }: PropsWithChildren<{ effect: string }>) => (
  <div className={`effect effect--${effect}`}>{children}</div>
);

const Hello = () => <div>Hello, World!</div>;

const HelloWithEffect = wrapWith(Effect, { effect: Extract })(Hello);

// @ts-expect-error ["Property 'value' does not exist on type 'IntrinsicAttributes & { effect: string; ref?: LegacyRef<unknown> | undefined; key?: Key | null | undefined; }'.", "Property 'value' does not exist on type 'IntrinsicAttributes & { effect: string; ref?: Ref<unknown> | undefined; key?: Key | null | undefined; } & { children?: ReactNode; }'."]
<HelloWithEffect effect="blink" value="Hello, World!" />;
