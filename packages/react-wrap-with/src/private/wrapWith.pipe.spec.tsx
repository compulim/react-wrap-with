/** @jest-environment jsdom */
/// <reference types="@types/jest" />

import { render } from '@testing-library/react';
import React, { type ReactNode } from 'react';

import wrapWith from './wrapWith';

test('piping props', () => {
  const Effect = ({ children }: { children?: ReactNode | undefined }) => <span className="effect">{children}</span>;

  const Header = ({ value }: { value: string }) => <h1>{value}</h1>;

  const HelloWithEffect = wrapWith(Effect)(Header);

  const result = render(<HelloWithEffect value="Hello, World!" />);

  expect(result.container.innerHTML).toMatchInlineSnapshot(`"<span class="effect"><h1>Hello, World!</h1></span>"`);
});
