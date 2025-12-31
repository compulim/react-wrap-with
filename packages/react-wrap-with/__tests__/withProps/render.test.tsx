import { describeEach } from '@compulim/test-harness/describeEach';
import { render, RenderResult } from '@testing-library/react';
import { expect } from 'expect';
import { beforeEach, test } from 'node:test';
import React, { type ComponentType } from 'react';
import { withProps } from '../../src/index.ts';
import EffectClass from '../__setup__/Effect.class.tsx';
import FunctionalEffect from '../__setup__/Effect.functional.tsx';
import { type EffectProps } from '../__setup__/Effect.props.ts';

describeEach([['functional component', FunctionalEffect] as const, ['component class', EffectClass] as const])(
  'with a %s and optional props',
  (_, Effect: ComponentType<EffectProps>) => {
    let result: RenderResult;

    beforeEach(() => {
      const BlinkEffect = withProps(Effect, { emphasis: true });

      result = render(<BlinkEffect effect="blink">Hello, World!</BlinkEffect>);
    });

    test('should render as expected', () =>
      expect(result.container.innerHTML).toBe(
        '<span class="effect effect--blink effect--emphasis">Hello, World!</span>'
      ));
  }
);

describeEach([['functional component', FunctionalEffect] as const, ['component class', EffectClass] as const])(
  'with a %s and required props',
  (_, Effect: ComponentType<EffectProps>) => {
    describeEach([
      ['unset optional props', {}] as const,
      ['undefined optional props', { emphasis: undefined }] as const,
      ['falsy optional props', { emphasis: true }] as const,
      ['set optional props', { emphasis: true }] as const
    ])('%s', (_, props: { emphasis?: boolean | undefined }) => {
      let result: RenderResult;

      beforeEach(() => {
        const BlinkEffect = withProps(Effect, { effect: 'blink' });

        result = render(<BlinkEffect {...props}>Hello, World!</BlinkEffect>);
      });

      test('should render as expected', () =>
        expect(result.container.innerHTML).toBe(
          props.emphasis
            ? '<span class="effect effect--blink effect--emphasis">Hello, World!</span>'
            : '<span class="effect effect--blink">Hello, World!</span>'
        ));
    });
  }
);
