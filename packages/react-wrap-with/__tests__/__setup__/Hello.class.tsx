import React, { type ForwardedRef } from 'react';
import { type HelloProps } from './Hello.props.ts';

const { Component, forwardRef } = React;

class _Hello extends Component<HelloProps & { forwardedRef: ForwardedRef<HTMLHeadingElement> }> {
  render() {
    return (
      <h1 className={this.props.emphasis ? 'hello--emphasis' : undefined} ref={this.props.forwardedRef}>
        {this.props.text}
      </h1>
    );
  }
}

const Hello = forwardRef(
  (props: HelloProps, ref: ForwardedRef<HTMLHeadingElement>) =>
    React.createElement(_Hello, { ...props, forwardedRef: ref })
  // <Hello {...props} forwardedRef={ref} />
);

Hello.displayName = 'Hello';

export default Hello;
