import React, { Component, forwardRef, type ForwardedRef } from 'react';

import { type EffectProps } from './Effect.props';

class _Effect extends Component<EffectProps & { forwardedRef: ForwardedRef<HTMLSpanElement> }> {
  render() {
    return (
      <span
        className={`effect effect--${this.props.effect}${this.props.emphasis ? ' effect--emphasis' : ''}`}
        ref={this.props.forwardedRef}
      >
        {this.props.children}
      </span>
    );
  }
}

const Effect = forwardRef((props: EffectProps, ref: ForwardedRef<HTMLSpanElement>) =>
  React.createElement(_Effect, { ...props, forwardedRef: ref })
);

Effect.displayName = 'Effect';

export default Effect;
