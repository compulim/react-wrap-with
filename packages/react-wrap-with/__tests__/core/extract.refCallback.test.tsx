import { describeEach } from '@compulim/test-harness/describeEach';
import { render } from '@testing-library/react';
import { expect } from 'expect';
import { beforeEach, mock, test } from 'node:test';
import React, { type ComponentType } from 'react';
import { Extract, type HowOf, wrapWith } from '../../src/index.ts';
import EffectClass from '../__setup__/Effect.class.tsx';
import FunctionalEffect from '../__setup__/Effect.functional.tsx';
import { type EffectProps } from '../__setup__/Effect.props.ts';
import HelloClass from '../__setup__/Hello.class.tsx';
import FunctionalHello from '../__setup__/Hello.functional.tsx';
import { type HelloProps } from '../__setup__/Hello.props.ts';

describeEach([
  ['functional component', FunctionalEffect, FunctionalHello] as const,
  ['component class', EffectClass, HelloClass] as const
])('with a %s', (_, Effect: ComponentType<EffectProps>, Hello: ComponentType<HelloProps>) => {
  let refCallback = mock.fn<(element: HTMLHeadingElement) => void>();

  beforeEach(() => {
    refCallback = mock.fn();

    // "ref" is extracted, so it is pointing to <Effect> instead of <Hello>.
    const BlinkingHello = wrapWith(Effect, { effect: Extract, emphasis: Extract, ref: Extract } satisfies HowOf<
      typeof Effect
    >)(Hello);

    render(<BlinkingHello effect="blink" ref={refCallback} text="Hello, World!" />);
  });

  if (Effect) {
    test('should called "refCallback" once', () => expect(refCallback.mock.callCount()).toBe(1));
    test('should have "tagName" of "H1"', () =>
      expect(refCallback.mock.calls[0].arguments[0]).toHaveProperty('tagName', 'SPAN'));
  } else {
    test('should not called "refCallback"', () => expect(refCallback.mock.callCount()).toBe(0));
  }
});
