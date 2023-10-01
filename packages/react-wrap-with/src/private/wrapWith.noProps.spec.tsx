/** @jest-environment jsdom */
/// <reference types="@types/jest" />

import { render } from '@testing-library/react';
import React from 'react';

import wrapWith from './wrapWith';

import type { PropsWithChildren } from 'react';

type EffectProps = PropsWithChildren<{ abc: number }>;

const Effect = ({ children }: EffectProps) => <span className="effect">{children}</span>;

const Hello = () => <h1>Hello, World!</h1>;

test('simple scenario', () => {
  // GIVEN: Wrapping <Hello> with <Effect effect="blink">.
  const BlinkingHello = wrapWith(Effect, { abc: 123 })(Hello);

  // WHEN: Render.
  const result = render(<BlinkingHello />);

  // THEN: It should produce HTML equivalent to <Effect><Hello /></Effect>.
  expect(result.container.innerHTML).toMatchInlineSnapshot(`"<span class="effect"><h1>Hello, World!</h1></span>"`);
});
