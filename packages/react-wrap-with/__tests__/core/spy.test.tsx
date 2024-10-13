/** @jest-environment jsdom */
/// <reference types="@types/jest" />

import { render, RenderResult } from '@testing-library/react';
import React, { type ComponentType } from 'react';

import { Extract, type HowOf, Spy, wrapWith } from '../../src/index.ts';
import EffectClass from '../__setup__/Effect.class.tsx';
import FunctionalEffect from '../__setup__/Effect.functional.tsx';
import { type EffectProps } from '../__setup__/Effect.props.ts';
import HelloClass from '../__setup__/Hello.class.tsx';
import FunctionalHello from '../__setup__/Hello.functional.tsx';
import { type HelloProps } from '../__setup__/Hello.props.ts';

describe.each([
  ['functional component', FunctionalEffect, FunctionalHello],
  ['component class', EffectClass, HelloClass]
])('with a %s', (_, Effect: ComponentType<EffectProps>, Hello: ComponentType<HelloProps>) => {
  let BlinkingHello: ComponentType<{ effect: 'blink'; emphasis?: boolean; text: string }>;
  let result: RenderResult;

  beforeEach(() => {
    BlinkingHello = wrapWith(Effect, { effect: Extract, emphasis: Spy } satisfies HowOf<typeof Effect>)(Hello);

    result = render(<BlinkingHello effect="blink" emphasis={true} text="Hello, World!" />);
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
