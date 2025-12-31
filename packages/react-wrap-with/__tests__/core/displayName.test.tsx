import { describeEach } from '@compulim/test-harness/describeEach';
import { expect } from 'expect';
import { test } from 'node:test';
import { type ComponentType } from 'react';
import { Extract, type HowOf, Spy, wrapWith } from '../../src/index.ts';
import EffectClass from '../__setup__/Effect.class.tsx';
import FunctionalEffect from '../__setup__/Effect.functional.tsx';
import { type EffectProps } from '../__setup__/Effect.props.ts';
import FunctionalHello from '../__setup__/Hello.functional.tsx';

describeEach([
  ['with a functional component', FunctionalEffect, 'wrapWith(Effect)(Hello)'] as const,
  ['with a component class', EffectClass, 'wrapWith(Effect)(Hello)'] as const
])('%s', (_, Effect: ComponentType<EffectProps>, displayName) => {
  const wrappedComponent = wrapWith(Effect, { effect: Extract, emphasis: Spy } satisfies HowOf<typeof Effect>)(
    FunctionalHello
  );

  test('should have "displayName" property', () => expect(wrappedComponent).toHaveProperty('displayName', displayName));
});
