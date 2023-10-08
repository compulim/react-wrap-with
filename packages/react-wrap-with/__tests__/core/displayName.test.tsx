/** @jest-environment jsdom */
/// <reference types="@types/jest" />

import { type ComponentType } from 'react';

import { Extract, type HowOf, Spy, wrapWith } from '../../src/index';
import EffectClass from '../__setup__/Effect.class';
import FunctionalEffect from '../__setup__/Effect.functional';
import FunctionalHello from '../__setup__/Hello.functional';

import type { EffectProps } from '../__setup__/Effect.props';

describe.each([
  ['with a functional component', FunctionalEffect, 'wrapWith(Effect)(Hello)'],
  ['with a component class', EffectClass, 'wrapWith(Effect)(Hello)']
])('%s', (_, Effect: ComponentType<EffectProps>, displayName) => {
  const wrappedComponent = wrapWith(Effect, { effect: Extract, emphasis: Spy } satisfies HowOf<typeof Effect>)(
    FunctionalHello
  );

  test('should render as expected', () => expect(wrappedComponent).toHaveProperty('displayName', displayName));
});
