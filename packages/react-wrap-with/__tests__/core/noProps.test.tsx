/** @jest-environment jsdom */
/// <reference types="@types/jest" />

import { render, RenderResult } from '@testing-library/react';
import React, { Component, type ComponentType } from 'react';

import { Extract, type HowOf, Spy, wrapWith } from '../../src/index.ts';
import EffectClass from '../__setup__/Effect.class.tsx';
import FunctionalEffect from '../__setup__/Effect.functional.tsx';
import { type EffectProps } from '../__setup__/Effect.props.ts';

class AlohaClass extends Component {
  render() {
    return <h1>Aloha!</h1>;
  }
}

const FunctionalAloha = () => <h1>Aloha!</h1>;

describe.each([
  ['functional component', FunctionalEffect, FunctionalAloha],
  ['component class', EffectClass, AlohaClass]
])('with a %s', (_, Effect: ComponentType<EffectProps>, Aloha: ComponentType) => {
  let BlinkingAloha: ComponentType<{ effect: 'blink' }>;
  let result: RenderResult;

  beforeEach(() => {
    BlinkingAloha = wrapWith(Effect, { effect: Extract, emphasis: Spy } satisfies HowOf<typeof Effect>)(Aloha);

    result = render(<BlinkingAloha effect="blink" />);
  });

  test('should render as expected', () =>
    expect(result.container.innerHTML).toMatchInlineSnapshot(
      Effect
        ? Aloha
          ? `"<span class="effect effect--blink"><h1>Aloha!</h1></span>"`
          : `"<span class="effect effect--blink"></span>"`
        : `"<h1>Aloha!</h1>"`
    ));
});
