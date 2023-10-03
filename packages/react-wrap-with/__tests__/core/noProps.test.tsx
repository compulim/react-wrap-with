/** @jest-environment jsdom */
/// <reference types="@types/jest" />

import { render, RenderResult } from '@testing-library/react';
import React, { Component, type ComponentType } from 'react';

import { Extract, type HowOf, wrapWith } from '../../src/index';
import EffectClass from './__setup__/Effect.class';
import FunctionalEffect from './__setup__/Effect.functional';

import type { EffectProps } from './__setup__/Effect.props';

class AlohaClass extends Component {
  render() {
    return <h1>Aloha!</h1>;
  }
}

const FunctionalAloha = () => <h1>Aloha!</h1>;

describe.each([
  ['functional component', FunctionalEffect, FunctionalAloha],
  ['component class', EffectClass, AlohaClass],
  ['functional component without container', false as const, FunctionalAloha],
  ['component class without container', false as const, AlohaClass],
  ['functional component without content', FunctionalEffect, false as const],
  ['component class without content', EffectClass, false as const]
])('with a %s', (_, Effect: ComponentType<EffectProps> | false, Aloha: ComponentType | false) => {
  let BlinkingAloha: ComponentType<{ effect: 'blink' }>;
  let result: RenderResult;

  beforeEach(() => {
    BlinkingAloha = wrapWith(Effect, { effect: Extract } satisfies HowOf<typeof Effect>)(Aloha);

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
