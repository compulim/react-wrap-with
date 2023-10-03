import React, { Component, type ComponentClass } from 'react';

import { type EffectProps } from './Effect.props';

class Effect extends Component<EffectProps> {
  render() {
    return (
      <span className={`effect effect--${this.props.effect}${this.props.emphasis ? ' effect--emphasis' : ''}`}>
        {this.props.children}
      </span>
    );
  }
}

(Effect as ComponentClass<EffectProps>).displayName = 'Effect';

export default Effect;
