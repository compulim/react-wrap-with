/** @jest-environment jsdom */
/// <reference types="@types/jest" />

import { render } from '@testing-library/react';
import React, { forwardRef, type PropsWithChildren, type Ref, useEffect, useRef } from 'react';

import Extract from '../Extract';
import wrapWith from './wrapWith';

import type { HowOf } from '../HowOf';

type EffectProps = PropsWithChildren<{ containerRef?: Ref<HTMLSpanElement>; effect: 'blink' }>;

const Effect = ({ children, containerRef, effect }: EffectProps) => (
  <span className={`effect effect--${effect}`} ref={containerRef}>
    {children}
  </span>
);

Effect.displayName = 'Effect';

const Hello = forwardRef((_, ref: Ref<HTMLHeadingElement>) => <h1 ref={ref}>Hello, World!</h1>);

Hello.displayName = 'Effect';

test('ref of RefObject should be passed', () => {
  // GIVEN: Wrapping <Hello> with <Effect effect="blink">.
  const BlinkingHello = wrapWith(Effect, { containerRef: Extract, effect: 'blink' } satisfies HowOf<typeof Effect>)(
    Hello
  );

  const App = ({ onRef }: { onRef: (refs: [HTMLDivElement | null, HTMLHeadingElement | null]) => void }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const ref = useRef<HTMLHeadingElement | null>(null);

    useEffect(() => onRef([containerRef.current, ref.current]), [onRef]);

    return <BlinkingHello containerRef={containerRef} ref={ref} />;
  };

  const handleRef = jest.fn();

  // WHEN: Render.
  render(<App onRef={handleRef} />);

  // THEN: Ref should be passed.
  expect(handleRef).toBeCalledTimes(1);

  // THEN: "containerRef" should point to <span>.
  expect(handleRef.mock.calls[0][0][0]).toHaveProperty('tagName', 'SPAN');

  // THEN: "ref" should point to <h1>.
  expect(handleRef.mock.calls[0][0][1]).toHaveProperty('tagName', 'H1');
});
