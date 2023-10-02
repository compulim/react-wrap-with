import React from 'react';

import { wrapWith } from '../../src/index';

import type { PropsWithChildren } from 'react';

const Effect = ({ children, effect }: PropsWithChildren<{ effect: string }>) => (
  <div className={`effect effect--${effect}`}>{children}</div>
);

const Hello = ({ value }: { value: string }) => <div>{value}</div>;

const HelloWithEffect = wrapWith(Effect, { effect: 'blink' })(Hello);

<HelloWithEffect value="Hello, World!" />;
