import { describeEach } from '@compulim/test-harness/describeEach';
import { render, type RenderResult } from '@testing-library/react';
import { expect } from 'expect';
import { beforeEach, test } from 'node:test';
import React, { type ComponentType } from 'react';
import { Extract, type HowOf, Spy, wrapWith } from '../../src/index.ts';
import EffectClass from '../__setup__/Effect.class.tsx';
import FunctionalEffect from '../__setup__/Effect.functional.tsx';
import { type EffectProps } from '../__setup__/Effect.props.ts';

const { Component } = React;

class AlohaClass extends Component {
  render() {
    return <h1>Aloha!</h1>;
  }
}

const FunctionalAloha = () => <h1>Aloha!</h1>;

describeEach([
  ['functional component', FunctionalEffect, FunctionalAloha] as const,
  ['component class', EffectClass, AlohaClass] as const
])('with a %s', (_, Effect: ComponentType<EffectProps>, Aloha: ComponentType) => {
  let BlinkingAloha: ComponentType<{ effect: 'blink' }>;
  let result: RenderResult;

  beforeEach(() => {
    BlinkingAloha = wrapWith(Effect, { effect: Extract, emphasis: Spy } satisfies HowOf<typeof Effect>)(Aloha);

    result = render(<BlinkingAloha effect="blink" />);
  });

  test('should render as expected', () =>
    expect(result.container.innerHTML).toBe(
      Effect
        ? Aloha
          ? '<span class="effect effect--blink"><h1>Aloha!</h1></span>'
          : '<span class="effect effect--blink"></span>'
        : '<h1>Aloha!</h1>'
    ));
});
