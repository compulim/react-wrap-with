/** @jest-environment jsdom */
/// <reference types="@types/jest" />

import { render } from '@testing-library/react';
import React, { forwardRef } from 'react';

import wrapWith from './wrapWith';

import type { PropsWithChildren, Ref } from 'react';

type EffectProps = PropsWithChildren<{ effect: 'blink' }>;

const Effect = forwardRef(({ children, effect }: EffectProps, ref: Ref<HTMLSpanElement> | null) => (
  <span className={`effect effect--${effect}`} ref={ref}>
    {children}
  </span>
));

Effect.displayName = 'Effect';

const Hello = forwardRef((_, ref: Ref<HTMLHeadingElement>) => <h1 ref={ref}>Hello, World!</h1>);

Hello.displayName = 'Hello';

test('ref of RefObject should be passed', () => {
  // GIVEN: Wrapping <Hello> with <Effect effect="blink">.
  const BlinkingHello = wrapWith(Effect, { effect: 'blink' })(Hello);

  const App = ({ onRef }: { onRef: (htmlElement: HTMLHeadingElement) => void }) => <BlinkingHello ref={onRef} />;

  // WHEN: Render.
  const handleRef = jest.fn();

  render(<App onRef={handleRef} />);

  // THEN: Ref should be passed.
  expect(handleRef).toBeCalledTimes(1);

  // THEN: Ref should point to <h1>.
  expect(handleRef.mock.calls[0][0]).toHaveProperty('tagName', 'H1');
});
