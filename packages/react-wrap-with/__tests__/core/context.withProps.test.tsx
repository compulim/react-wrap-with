import { describeEach } from '@compulim/test-harness/describeEach';
import { render, RenderResult } from '@testing-library/react';
import { expect } from 'expect';
import { beforeEach, test } from 'node:test';
import React, { type ComponentClass, type ComponentType, type ReactNode } from 'react';
import { withProps, wrapWith } from '../../src/index.ts';

const { Component, createContext, useContext } = React;

const ThemeContext = createContext<{ accent: string }>({ accent: 'default' });

ThemeContext.displayName = 'ThemeContext';

type Props = { children?: ReactNode | undefined };

const FunctionalAloha = ({ children }: Props) => {
  const { accent } = useContext(ThemeContext);

  return <h1 className={`themed themed--${accent}`}>{children}</h1>;
};

FunctionalAloha.displayName = 'Aloha';

class AlohaClass extends Component<Props> {
  declare context: React.ContextType<typeof ThemeContext>;

  render() {
    return <h1 className={`themed themed--${this.context.accent}`}>{this.props.children}</h1>;
  }
}

AlohaClass.contextType = ThemeContext;
(AlohaClass as ComponentClass<Props>).displayName = 'Aloha';

describeEach([['functional component', FunctionalAloha] as const, ['component class', AlohaClass] as const])(
  'with a %s',
  (_, Aloha: ComponentType<Props>) => {
    let BlueThemedAloha: ComponentType<Props>;
    let result: RenderResult;

    beforeEach(() => {
      const BlueThemeContextProvider = withProps(ThemeContext.Provider, { value: { accent: 'blue' } });

      BlueThemedAloha = wrapWith(BlueThemeContextProvider)(Aloha);

      result = render(<BlueThemedAloha>Hello, World!</BlueThemedAloha>);
    });

    test('should render as expected', () =>
      expect(result.container.innerHTML).toBe(Aloha ? '<h1 class="themed themed--blue">Hello, World!</h1>' : ''));

    test(`should have 'displayName'`, () =>
      expect(BlueThemedAloha).toHaveProperty('displayName', 'wrapWith(withProps(Component))(Aloha)'));
  }
);
