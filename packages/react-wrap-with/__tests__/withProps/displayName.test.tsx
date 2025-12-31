import { describeEach } from '@compulim/test-harness/describeEach';
import { expect } from 'expect';
import { test } from 'node:test';
import { type ComponentType } from 'react';
import { withProps } from '../../src/index.ts';
import EffectClass from '../__setup__/Effect.class.tsx';
import FunctionalEffect from '../__setup__/Effect.functional.tsx';
import { type EffectProps } from '../__setup__/Effect.props.ts';

describeEach([
  ['functional component', FunctionalEffect, 'withProps(Effect)'] as const,
  ['component class', EffectClass, 'withProps(Effect)'] as const,
  ['functional component without "displayName"', (_: EffectProps) => undefined, 'withProps(Component)'] as const
])('with a %s', (_, Effect: ComponentType<EffectProps>, displayName) => {
  const BlinkingEffect = withProps(Effect, { effect: 'blink' });

  test('should have a display name', () => expect(BlinkingEffect).toHaveProperty('displayName', displayName));
});
