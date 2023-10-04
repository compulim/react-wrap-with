/** @jest-environment jsdom */
/// <reference types="@types/jest" />

import { render, RenderResult } from '@testing-library/react';
import React, { Component, type ComponentType, createContext, useContext } from 'react';

import { Extract, type HowOf, wrapWith } from '../../src/index';

const Context = createContext<string>('');

Context.displayName = 'Context';

type Props = { effect?: string };

const FunctionalAloha = ({ effect }: Props) => {
  const value = useContext(Context);

  return <h1 className={`effect effect--${effect}`}>{value}</h1>;
};

class AlohaClass extends Component<Props> {
  render() {
    return <h1 className={`effect effect--${this.props.effect}`}>{this.context as string}</h1>;
  }
}

AlohaClass.contextType = Context;

describe.each([
  ['functional component', FunctionalAloha],
  ['component class', AlohaClass],
  ['functional component without content', false as const],
  ['component class without content', false as const]
])('with a %s', (_, Aloha: ComponentType<Props> | false) => {
  let BlinkingAloha: ComponentType<{ effect?: string; value: string }>;
  let result: RenderResult;

  beforeEach(() => {
    BlinkingAloha = wrapWith(Context.Provider, { value: Extract } satisfies HowOf<typeof Context.Provider>)(Aloha);

    result = render(<BlinkingAloha effect="blink" value="Hello, World!" />);
  });

  test('should render as expected', () =>
    expect(result.container.innerHTML).toMatchInlineSnapshot(Aloha ? `"<h1>Hello, World!</h1>"` : '""'));

  test(`should have 'displayName'`, () => expect(BlinkingAloha.displayName).toBe('WrappedWithComponent'));
});
