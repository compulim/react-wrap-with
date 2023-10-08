/** @jest-environment jsdom */
/// <reference types="@types/jest" />

import { render } from '@testing-library/react';
import React, { type ComponentType } from 'react';

import { withProps } from '../../src/index';
import EffectClass from '../__setup__/Effect.class';
import FunctionalEffect from '../__setup__/Effect.functional';

import type { EffectProps } from '../__setup__/Effect.props';

describe.each([
  ['functional component', FunctionalEffect],
  ['component class', EffectClass]
])('with a %s', (_, Effect: ComponentType<EffectProps>) => {
  const refCallback = jest.fn<void, [HTMLSpanElement]>();

  beforeEach(() => {
    refCallback.mockReset();

    const BlinkEffect = withProps(Effect, { emphasis: true });

    render(
      <BlinkEffect effect="blink" ref={refCallback}>
        Hello, World!
      </BlinkEffect>
    );
  });

  test('should called "refCallback" once', () => expect(refCallback).toHaveBeenCalledTimes(1));
  test('should have "tagName" of "SPAN"', () => expect(refCallback.mock.calls[0][0]).toHaveProperty('tagName', 'SPAN'));
});
