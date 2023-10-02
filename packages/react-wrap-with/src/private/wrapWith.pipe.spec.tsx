/** @jest-environment jsdom */
/// <reference types="@types/jest" />

import { render } from '@testing-library/react';
import React, { type PropsWithChildren } from 'react';

import wrapWith from './wrapWith';

test('piping props', () => {
  const Effect = ({ children, effect }: PropsWithChildren<{ effect: string }>) => (
    <span className={`effect effect--${effect}`}>{children}</span>
  );

  const Header = ({ value }: { value: string }) => <h1>{value}</h1>;

  const HelloWithEffect = wrapWith(Effect, { effect: 'blink' })(Header);

  const result = render(<HelloWithEffect value="Hello, World!" />);

  expect(result.container.innerHTML).toMatchInlineSnapshot(
    `"<span class="effect effect--blink"><h1>Hello, World!</h1></span>"`
  );
});
