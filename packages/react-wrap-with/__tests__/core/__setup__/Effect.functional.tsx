import React from 'react';

import { type EffectProps } from './Effect.props';

const Effect = (props: EffectProps) => (
  <span className={`effect effect--${props.effect}${props.emphasis ? ' effect--emphasis' : ''}`}>{props.children}</span>
);

Effect.displayName = 'Effect';

export default Effect;
