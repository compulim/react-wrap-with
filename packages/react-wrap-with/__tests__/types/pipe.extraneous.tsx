import React from 'react';

import { Extract, wrapWith } from '../../src/index';

import type { PropsWithChildren } from 'react';

const Effect = ({ children, effect }: PropsWithChildren<{ effect: string }>) => (
  <div className={`effect effect--${effect}`}>{children}</div>
);

const Hello = () => <div>Hello, World!</div>;

const HelloWithEffect = wrapWith(Effect, { effect: Extract })(Hello);

// @ts-expect-error Property 'value' does not exist on type 'IntrinsicAttributes & Pick<{ effect: string; } & { children?: ReactNode; }, never> & Pick<{ effect: string; } & { children?: ReactNode; }, "effect"> & RefAttributes<...>'
<HelloWithEffect effect="blink" value="Hello, World!" />;
