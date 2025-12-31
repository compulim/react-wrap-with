import { describeEach } from '@compulim/test-harness/describeEach';
import { render } from '@testing-library/react';
import { expect } from 'expect';
import { beforeEach, test } from 'node:test';
import React, { type ComponentType, type Ref } from 'react';
import { withProps } from '../../src/index.ts';
import EffectClass from '../__setup__/Effect.class.tsx';
import FunctionalEffect from '../__setup__/Effect.functional.tsx';
import { type EffectProps } from '../__setup__/Effect.props.ts';

const { createRef } = React;

describeEach([['functional component', FunctionalEffect] as const, ['component class', EffectClass] as const])(
  'with a %s',
  (_, Effect: ComponentType<EffectProps>) => {
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
  }
);
