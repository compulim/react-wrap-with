/** @jest-environment jsdom */
/// <reference types="@types/jest" />

import { render } from '@testing-library/react';
import React from 'react';

import Spy from '../Spy';
import wrapWith from './wrapWith';

type HelloProps = { emphasis?: boolean };

const Hello = ({ emphasis }: HelloProps) => <h1 className={emphasis ? 'hello--emphasis' : ''}>Hello, World!</h1>;

test('simple scenario', () => {
  const BlinkingHello = wrapWith(false, { emphasis: Spy })(Hello);

  const result = render(<BlinkingHello emphasis={true} />);

  expect(result.container.innerHTML).toMatchInlineSnapshot(`"<h1 class="hello--emphasis">Hello, World!</h1>"`);
});
