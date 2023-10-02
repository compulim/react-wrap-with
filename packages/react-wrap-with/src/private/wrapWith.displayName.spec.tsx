/** @jest-environment jsdom */
/// <reference types="@types/jest" />

import React, { type PropsWithChildren } from 'react';

import wrapWith from './wrapWith';

import type { HowOf } from '../HowOf';

type EffectProps = PropsWithChildren<{ effect: 'blink' }>;

const Effect = ({ children, effect }: EffectProps) => <span className={`effect effect--${effect}`}>{children}</span>;

Effect.displayName = 'Effect';

const Hello = () => <h1>Hello, World!</h1>;

test('simple scenario', () => {
  // WHEN: Wrapping <Hello> with <Effect effect="blink">.
  const BlinkingHello = wrapWith(Effect, { effect: 'blink' } satisfies HowOf<typeof Effect>)(Hello);

  // THEN: Wrapped component should have display name of "WrappedWithEffect".
  expect(BlinkingHello).toHaveProperty('displayName', 'WrappedWithEffect');
});
