import React, { forwardRef } from 'react';

import { type EffectProps } from './Effect.props';

const Effect = forwardRef<HTMLSpanElement, EffectProps>((props: EffectProps, ref) => (
  <span className={`effect effect--${props.effect}${props.emphasis ? ' effect--emphasis' : ''}`} ref={ref}>
    {props.children}
  </span>
));

Effect.displayName = 'Effect';

export default Effect;
