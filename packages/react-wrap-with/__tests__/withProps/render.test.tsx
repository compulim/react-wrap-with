/** @jest-environment jsdom */
/// <reference types="@types/jest" />

import { render, RenderResult } from '@testing-library/react';
import React, { type ComponentType } from 'react';

import { withProps } from '../../src/index';
import EffectClass from '../__setup__/Effect.class';
import FunctionalEffect from '../__setup__/Effect.functional';

import type { EffectProps } from '../__setup__/Effect.props';

describe.each([
  ['functional component', FunctionalEffect],
  ['component class', EffectClass]
])('with a %s and optional props', (_, Effect: ComponentType<EffectProps>) => {
  let result: RenderResult;

  beforeEach(() => {
    const BlinkEffect = withProps(Effect, { emphasis: true });

    result = render(<BlinkEffect effect="blink">Hello, World!</BlinkEffect>);
  });

  test('should render as expected', () =>
    expect(result.container.innerHTML).toMatchInlineSnapshot(
      '"<span class="effect effect--blink effect--emphasis">Hello, World!</span>"'
    ));
});

describe.each([
  ['functional component', FunctionalEffect],
  ['component class', EffectClass]
])('with a %s and required props', (_, Effect: ComponentType<EffectProps>) => {
  describe.each([
    ['unset optional props', {}],
    ['undefined optional props', { emphasis: undefined }],
    ['falsy optional props', { emphasis: true }],
    ['set optional props', { emphasis: true }]
  ])('%s', (_, props: { emphasis?: boolean | undefined }) => {
    let result: RenderResult;

    beforeEach(() => {
      const BlinkEffect = withProps(Effect, { effect: 'blink' });

      result = render(<BlinkEffect {...props}>Hello, World!</BlinkEffect>);
    });

    test('should render as expected', () =>
      expect(result.container.innerHTML).toMatchInlineSnapshot(
        props.emphasis
          ? '"<span class="effect effect--blink effect--emphasis">Hello, World!</span>"'
          : '"<span class="effect effect--blink">Hello, World!</span>"'
      ));
  });
});
