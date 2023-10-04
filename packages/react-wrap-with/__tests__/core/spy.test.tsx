/** @jest-environment jsdom */
/// <reference types="@types/jest" />

import { render, RenderResult } from '@testing-library/react';
import React, { type ComponentType } from 'react';

import { type HowOf, Spy, wrapWith } from '../../src/index';
import EffectClass from './__setup__/Effect.class';
import FunctionalEffect from './__setup__/Effect.functional';
import FunctionalHello from './__setup__/Hello.functional';
import HelloClass from './__setup__/Hello.class';

import type { EffectProps } from './__setup__/Effect.props';
import type { HelloProps } from './__setup__/Hello.props';

describe.each([
  ['functional component', FunctionalEffect, FunctionalHello],
  ['component class', EffectClass, HelloClass],
  ['functional component without container', false as const, FunctionalHello],
  ['component class without container', false as const, HelloClass],
  ['functional component without content', FunctionalEffect, false as const],
  ['component class without content', EffectClass, false as const]
])('with a %s', (_, Effect: ComponentType<EffectProps> | false, Hello: ComponentType<HelloProps> | false) => {
  let BlinkingHello: ComponentType<{ emphasis?: boolean; text: string }>;
  let result: RenderResult;

  beforeEach(() => {
    BlinkingHello = wrapWith(Effect, { effect: 'blink', emphasis: Spy } satisfies HowOf<typeof Effect>)(Hello);

    result = render(<BlinkingHello emphasis={true} text="Hello, World!" />);
  });

  test('should render as expected', () =>
    expect(result.container.innerHTML).toMatchInlineSnapshot(
      Effect
        ? Hello
          ? `"<span class="effect effect--blink effect--emphasis"><h1 class="hello--emphasis">Hello, World!</h1></span>"`
          : `"<span class="effect effect--blink effect--emphasis"></span>"`
        : `"<h1 class="hello--emphasis">Hello, World!</h1>"`
    ));
});
