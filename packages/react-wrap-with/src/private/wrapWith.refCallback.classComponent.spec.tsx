/** @jest-environment jsdom */
/// <reference types="@types/jest" />

import { render } from '@testing-library/react';
import React, { Component, type PropsWithChildren, type Ref } from 'react';

import Extract from '../Extract';
import wrapWith from './wrapWith';

import type { HowOf } from '../HowOf';

type EffectProps = PropsWithChildren<{ containerRef?: Ref<HTMLSpanElement>; effect: 'blink' }>;

class Effect extends Component<EffectProps> {
  override render() {
    const { children, containerRef, effect } = this.props;

    return (
      <span className={`effect effect--${effect}`} ref={containerRef}>
        {children}
      </span>
    );
  }
}

class Hello extends Component {
  override render() {
    return <h1>Hello, World!</h1>;
  }
}

test('ref of RefObject should be passed', () => {
  // GIVEN: Wrapping <Hello> with <Effect effect="blink">.
  const BlinkingHello = wrapWith(Effect, { containerRef: Extract, effect: 'blink' } satisfies HowOf<typeof Effect>)(
    Hello
  );

  const App = ({
    onContainerRef,
    onRef
  }: {
    onContainerRef: (ref: HTMLSpanElement) => void;
    onRef: (ref: HTMLHeadingElement) => void;
  }) => <BlinkingHello containerRef={onContainerRef} ref={onRef} />;

  const handleRef = jest.fn();
  const handleContainerRef = jest.fn();

  // WHEN: Render.
  render(<App onContainerRef={handleContainerRef} onRef={handleRef} />);

  // THEN: "containerRef" should be passed.
  expect(handleContainerRef).toBeCalledTimes(1);

  // THEN: "containerRef" should point to <span>.
  expect(handleContainerRef.mock.calls[0][0]).toHaveProperty('tagName', 'SPAN');

  // THEN: "ref" should be passed.
  expect(handleRef).toBeCalledTimes(1);

  // THEN: "ref" should point to <Hello>.
  expect(handleRef.mock.calls[0][0]).toBeInstanceOf(Hello);
});
