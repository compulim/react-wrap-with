import React from 'react';

import { Extract, wrapWith } from '../../src/index';

import type { ComponentType, PropsWithChildren } from 'react';

const Effect = ({ children, effect }: PropsWithChildren<{ effect: string }>) => (
  <div className={`effect effect--${effect}`}>{children}</div>
);

const Hello: ComponentType<{ value: string }> = ({ value }: { value: string }) => <div>{value}</div>;

const HelloWithEffect = wrapWith(Effect, { effect: Extract })(Hello);

<HelloWithEffect effect="blink" value="Hello, World!" />;
