import React, { Fragment } from 'react';

import type { ComponentType, PropsWithChildren } from 'react';

const Effect: ComponentType<PropsWithChildren<{ effect?: 'blink' }>> = ({ children, effect }) =>
  effect ? <span className={`effect effect--${effect}`}>{children}</span> : <Fragment>{children}</Fragment>;

export default Effect;
