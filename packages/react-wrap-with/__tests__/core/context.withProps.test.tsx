/** @jest-environment jsdom */
/// <reference types="@types/jest" />

import { render, RenderResult } from '@testing-library/react';
import React, {
  Component,
  type ComponentClass,
  type ComponentType,
  createContext,
  type ReactNode,
  useContext
} from 'react';

import { withProps, wrapWith } from '../../src/index.ts';

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

describe.each([
  ['functional component', FunctionalAloha],
  ['component class', AlohaClass]
])('with a %s', (_, Aloha: ComponentType<Props>) => {
  let BlueThemedAloha: ComponentType<Props>;
  let result: RenderResult;

  beforeEach(() => {
    const BlueThemeContextProvider = withProps(ThemeContext.Provider, { value: { accent: 'blue' } });

    BlueThemedAloha = wrapWith(BlueThemeContextProvider)(Aloha);

    result = render(<BlueThemedAloha>Hello, World!</BlueThemedAloha>);
  });

  test('should render as expected', () =>
    expect(result.container.innerHTML).toMatchInlineSnapshot(
      Aloha ? `"<h1 class="themed themed--blue">Hello, World!</h1>"` : '""'
    ));

  test(`should have 'displayName'`, () =>
    expect(BlueThemedAloha).toHaveProperty('displayName', 'wrapWith(withProps(Component))(Aloha)'));
});
