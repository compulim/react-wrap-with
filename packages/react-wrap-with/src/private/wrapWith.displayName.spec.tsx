/** @jest-environment jsdom */
/// <reference types="@types/jest" />

import React from 'react';

import wrapWith from './wrapWith';

import type { PropsWithChildren } from 'react';

type EffectProps = PropsWithChildren<{ effect: 'blink' }>;

const Effect = ({ children, effect }: EffectProps) => <span className={`effect effect--${effect}`}>{children}</span>;

Effect.displayName = 'Effect';

const Hello = () => <h1>Hello, World!</h1>;

test('simple scenario', () => {
  // WHEN: Wrapping <Hello> with <Effect effect="blink">.
  const BlinkingHello = wrapWith(Effect, { effect: 'blink' })(Hello);

  // THEN: Wrapped component should have display name of "WrappedWithEffect".
  expect(BlinkingHello).toHaveProperty('displayName', 'WrappedWithEffect');
});
