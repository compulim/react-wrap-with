import React from 'react';

import { wrapWith } from '../../src/index';

import type { PropsWithChildren } from 'react';

const Effect = ({ children, effect }: PropsWithChildren<{ effect: string }>) => (
  <div className={`effect effect--${effect}`}>{children}</div>
);

const Hello = () => <div>Hello, World!</div>;

const HelloWithEffect = wrapWith(Effect, { effect: 'blink' })(Hello);

// @ts-expect-error Property 'value' does not exist on type 'IntrinsicAttributes & Pick<{ effect: string; } & { children?: ReactNode; }, never> & RefAttributes<unknown>'.
<HelloWithEffect value="Hello, World!" />;
