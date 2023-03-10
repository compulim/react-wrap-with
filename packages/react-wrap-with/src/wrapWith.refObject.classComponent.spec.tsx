/** @jest-environment jsdom */
/// <reference types="@types/jest" />

import { render } from '@testing-library/react';
import React, { Component, useEffect, useRef } from 'react';

import wrapWith from './wrapWith';

import type { PropsWithChildren, Ref } from 'react';

type EffectProps = PropsWithChildren<{ containerRef?: Ref<HTMLSpanElement>; effect: 'blink' }>;

class Effect extends Component<EffectProps> {
  render() {
    const { children, containerRef, effect } = this.props;

    return (
      <span className={`effect effect--${effect}`} ref={containerRef}>
        {children}
      </span>
    );
  }
}

class Hello extends Component {
  render() {
    return <h1>Hello, World!</h1>;
  }
}

test('ref of RefObject should be passed', () => {
  // GIVEN: Wrapping <Hello> with <Effect effect="blink">.
  const BlinkingHello = wrapWith(Effect, { effect: 'blink' }, ['containerRef'])(Hello);

  const App = ({ onRef }: { onRef: (refs: [HTMLSpanElement | null, Hello | undefined]) => void }) => {
    const containerRef = useRef<HTMLSpanElement | null>(null);
    const ref = useRef<Hello>();

    useEffect(() => onRef([containerRef.current, ref.current]), [onRef]);

    return <BlinkingHello containerRef={containerRef} ref={ref} />;
  };

  const handleRef = jest.fn();

  // WHEN: Render.
  render(<App onRef={handleRef} />);

  // THEN: Ref should be passed.
  expect(handleRef).toBeCalledTimes(1);

  // THEN: "containerRef" is pointing to the instance of <span>.
  expect(handleRef.mock.calls[0][0][0]).toHaveProperty('tagName', 'SPAN');

  // THEN: "ref" is pointing to the instance of <Hello>.
  expect(handleRef.mock.calls[0][0][1]).toBeInstanceOf(Hello);
});
