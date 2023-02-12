import React from 'react';

import type { PropsWithChildren } from 'react';

const Effect = ({ children, effect }: PropsWithChildren<{ effect?: 'blink' }>) =>
  effect ? <span className={`effect effect--${effect}`}>{children}</span> : children;

export default Effect;
