/** @jest-environment jsdom */
/// <reference types="@types/jest" />

import { type ComponentType } from 'react';

import { withProps } from '../../src/index.ts';
import EffectClass from '../__setup__/Effect.class.tsx';
import FunctionalEffect from '../__setup__/Effect.functional.tsx';
import { type EffectProps } from '../__setup__/Effect.props.ts';

describe.each([
  ['functional component', FunctionalEffect, 'withProps(Effect)'],
  ['component class', EffectClass, 'withProps(Effect)'],
  ['functional component without "displayName"', (_: EffectProps) => undefined, 'withProps(Component)']
])('with a %s', (_, Effect: ComponentType<EffectProps>, displayName) => {
  const BlinkingEffect = withProps(Effect, { effect: 'blink' });

  test('should have a display name', () => expect(BlinkingEffect).toHaveProperty('displayName', displayName));
});
