import { describeEach } from '@compulim/test-harness/describeEach';
import { render } from '@testing-library/react';
import { expect } from 'expect';
import { beforeEach, mock, test } from 'node:test';
import React, { type ComponentType } from 'react';
import { withProps } from '../../src/index.ts';
import EffectClass from '../__setup__/Effect.class.tsx';
import FunctionalEffect from '../__setup__/Effect.functional.tsx';
import { type EffectProps } from '../__setup__/Effect.props.ts';

describeEach([['functional component', FunctionalEffect] as const, ['component class', EffectClass] as const])(
  'with a %s',
  (_, Effect: ComponentType<EffectProps>) => {
    const refCallback = mock.fn<(element: HTMLSpanElement) => void>();

    beforeEach(() => {
      refCallback.mock.resetCalls();

      const BlinkEffect = withProps(Effect, { emphasis: true });

      render(
        <BlinkEffect effect="blink" ref={refCallback}>
          Hello, World!
        </BlinkEffect>
      );
    });

    test('should called "refCallback" once', () => expect(refCallback.mock.callCount()).toBe(1));
    test('should have "tagName" of "SPAN"', () =>
      expect(refCallback.mock.calls[0]?.arguments[0]).toHaveProperty('tagName', 'SPAN'));
  }
);
