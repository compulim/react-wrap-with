/** @jest-environment jsdom */
/// <reference types="@types/jest" />

import { render } from '@testing-library/react';
import React, { createRef, type ComponentType, type Ref, RefAttributes } from 'react';

import { Extract, type HowOf, wrapWith } from '../../src/index';
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
  let BlinkingHello: ComponentType<{ emphasis?: boolean; text: string } & RefAttributes<HTMLSpanElement>>;
  let ref: Ref<HTMLSpanElement>;

  beforeEach(() => {
    ref = createRef<HTMLSpanElement>();

    BlinkingHello = wrapWith(Effect, { effect: 'blink', ref: Extract } satisfies HowOf<typeof Effect>)(Hello);

    render(<BlinkingHello ref={ref} text="Hello, World!" />);
  });

  if (Effect) {
    test('should have "tagName" of "SPAN"', () => expect(ref).toHaveProperty('current.tagName', 'SPAN'));
  } else {
    test('should not have ref', () => expect(ref).toHaveProperty('current', null));
  }
});
