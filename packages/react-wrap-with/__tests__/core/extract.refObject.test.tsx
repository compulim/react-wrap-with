/** @jest-environment jsdom */
/// <reference types="@types/jest" />

import { render } from '@testing-library/react';
import React, { createRef, type ComponentType, type Ref } from 'react';

import { Extract, Spy, wrapWith, type HowOf } from '../../src/index.ts';
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
  let ref: Ref<HTMLSpanElement>;

  beforeEach(() => {
    ref = createRef<HTMLSpanElement>();

    // "ref" is extracted, so it is pointing to <Effect> instead of <Hello>.
    const BlinkingHello = wrapWith(Effect, { effect: Extract, emphasis: Spy, ref: Extract } satisfies HowOf<
      typeof Effect
    >)(Hello);

    render(<BlinkingHello effect="blink" ref={ref} text="Hello, World!" />);
  });

  if (Effect) {
    test('should have "tagName" of "SPAN"', () => expect(ref).toHaveProperty('current.tagName', 'SPAN'));
  } else {
    test('should not have ref', () => expect(ref).toHaveProperty('current', null));
  }
});
