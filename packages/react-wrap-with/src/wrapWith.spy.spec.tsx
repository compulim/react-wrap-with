/** @jest-environment jsdom */
/// <reference types="@types/jest" />

import { render } from '@testing-library/react';
import React from 'react';

import wrapWith from './wrapWith';

import type { PropsWithChildren } from 'react';

type EffectProps = PropsWithChildren<{ effect?: 'blink'; emphasis: boolean }>;

const Effect = (props: EffectProps) => {
  const { children, effect, emphasis } = props;

  return <span className={`effect effect--${effect} effect__emphasis--${emphasis}`}>{children}</span>;
};

type HelloProps = { emphasis?: boolean };

const Hello = ({ emphasis }: HelloProps) => <h1 className={emphasis ? 'hello--emphasis' : ''}>Hello, World!</h1>;

test('simple scenario', () => {
  // GIVEN: Wrapping <Hello> with <Effect effect="blink">.
  const BlinkingHello = wrapWith(Effect, {}, ['effect'], ['emphasis'])(Hello);

  // WHEN: Render.
  const result = render(<BlinkingHello effect="blink" emphasis={true} />);

  // THEN: It should produce HTML equivalent to <Effect><Hello /></Effect>.
  expect(result.container.innerHTML).toMatchInlineSnapshot(
    `"<span class="effect effect--blink effect__emphasis--true"><h1 class="hello--emphasis">Hello, World!</h1></span>"`
  );
});
