import { describeEach } from '@compulim/test-harness/describeEach';
import { render, RenderResult } from '@testing-library/react';
import { expect } from 'expect';
import { beforeEach, test } from 'node:test';
import React, { type ComponentClass, type ComponentType } from 'react';
import { Extract, type HowOf, wrapWith } from '../../src/index.ts';

const { Component, createContext, useContext } = React;

const Context = createContext<string>('');

Context.displayName = 'Context';

type Props = { effect?: string };

const FunctionalAloha = ({ effect }: Props) => {
  const value = useContext(Context);

  return <h1 className={`effect effect--${effect}`}>{value}</h1>;
};

FunctionalAloha.displayName = 'Aloha';

class AlohaClass extends Component<Props> {
  render() {
    return <h1 className={`effect effect--${this.props.effect}`}>{this.context as string}</h1>;
  }
}

AlohaClass.contextType = Context;
(AlohaClass as ComponentClass<Props>).displayName = 'Aloha';

// describeEach<string, ComponentClass | FunctionComponent, string>([
// describeEach<['functional component', FunctionComponent, string] | ['component class', ComponentClass, string]>([
describeEach([
  ['functional component', FunctionalAloha, 'wrapWith(Component)(Aloha)'] as const,
  ['component class', AlohaClass, 'wrapWith(Component)(Aloha)'] as const
])('with a %s', (_, Aloha: ComponentType<Props>, displayName) => {
  let BlinkingAloha: ComponentType<{ effect?: string; value: string }>;
  let result: RenderResult;

  beforeEach(() => {
    BlinkingAloha = wrapWith(Context.Provider, { value: Extract } satisfies HowOf<typeof Context.Provider>)(Aloha);

    result = render(<BlinkingAloha effect="blink" value="Hello, World!" />);
  });

  test('should render as expected', () =>
    expect(result.container.innerHTML).toBe(Aloha ? '<h1 class="effect effect--blink">Hello, World!</h1>' : ''));

  test(`should have 'displayName'`, () => expect(BlinkingAloha.displayName).toBe(displayName));
});
