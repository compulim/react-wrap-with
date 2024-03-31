import React, { Fragment, type ComponentType, type PropsWithChildren } from 'react';

type Props = PropsWithChildren<{ effect?: 'blink' }>;

const Effect: ComponentType<Props> = ({ children, effect }: Props) =>
  effect ? <span className={`effect effect--${effect}`}>{children}</span> : <Fragment>{children}</Fragment>;

export default Effect;
