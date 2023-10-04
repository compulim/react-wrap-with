import React from 'react';

import { wrapWith } from '../../src/index';

import type { ComponentType, PropsWithChildren } from 'react';

const Effect = ({ children, effect }: PropsWithChildren<{ effect: string }>) => (
  <div className={`effect effect--${effect}`}>{children}</div>
);

const Hello: ComponentType<{ value: string }> = ({ value }: { value: string }) => <div>{value}</div>;

const HelloWithEffect = wrapWith(Effect, { effect: 'blink' })(Hello);

<HelloWithEffect value="Hello, World!" />;
