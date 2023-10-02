/** @jest-environment jsdom */
/// <reference types="@types/jest" />

import { render } from '@testing-library/react';
import React, { type PropsWithChildren } from 'react';

import wrapWith from './wrapWith';

import type { HowOf } from '../HowOf';

type EffectProps = PropsWithChildren<{ effect: 'blink' }>;

const Effect = ({ children, effect }: EffectProps) => <span className={`effect effect--${effect}`}>{children}</span>;

const Hello = () => <h1>Hello, World!</h1>;

test('simple scenario', () => {
  // GIVEN: Wrapping <Hello> with <Effect effect="blink">.
  const BlinkingHello = wrapWith(Effect, { effect: 'blink' } satisfies HowOf<typeof Effect>)(Hello);

  // WHEN: Render.
  const result = render(<BlinkingHello />);

  // THEN: It should produce HTML equivalent to <Effect><Hello /></Effect>.
  expect(result.container.innerHTML).toMatchInlineSnapshot(
    `"<span class="effect effect--blink"><h1>Hello, World!</h1></span>"`
  );
});
