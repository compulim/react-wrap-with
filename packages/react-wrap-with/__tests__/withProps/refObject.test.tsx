/** @jest-environment jsdom */
/// <reference types="@types/jest" />

import { render } from '@testing-library/react';
import React, { type ComponentType, createRef, type Ref } from 'react';

import { withProps } from '../../src/index';
import EffectClass from '../__setup__/Effect.class';
import FunctionalEffect from '../__setup__/Effect.functional';

import type { EffectProps } from '../__setup__/Effect.props';

describe.each([
  ['functional component', FunctionalEffect],
  ['component class', EffectClass]
])('with a %s', (_, Effect: ComponentType<EffectProps>) => {
  let ref: Ref<HTMLSpanElement>;

  beforeEach(() => {
    ref = createRef();

    const BlinkEffect = withProps(Effect, { emphasis: true });

    render(
      <BlinkEffect effect="blink" ref={ref}>
        Hello, World!
      </BlinkEffect>
    );
  });

  test('should have "tagName" of "SPAN"', () => expect(ref).toHaveProperty('current.tagName', 'SPAN'));
});
