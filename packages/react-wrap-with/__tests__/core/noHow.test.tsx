/** @jest-environment jsdom */
/// <reference types="@types/jest" />

import { render, RenderResult } from '@testing-library/react';
import React, { type ComponentType, type ReactNode } from 'react';

import { wrapWith } from '../../src/index';
import FunctionalHello from '../__setup__/Hello.functional';
import HelloClass from '../__setup__/Hello.class';

import type { HelloProps } from '../__setup__/Hello.props';

const BlinkingEffect = ({ children }: { children?: ReactNode | undefined }) => (
  <span className="effect effect--blink">{children}</span>
);

describe.each([
  ['with a functional component', FunctionalHello],
  ['with a component class', HelloClass]
])('%s', (_, Hello: ComponentType<HelloProps>) => {
  let BlinkingHello: ComponentType<{ emphasis?: boolean; text: string }>;
  let result: RenderResult;

  beforeEach(() => {
    BlinkingHello = wrapWith(BlinkingEffect)(Hello);

    result = render(<BlinkingHello emphasis={true} text="Hello, World!" />);
  });

  test('should render as expected', () =>
    expect(result.container.innerHTML).toMatchInlineSnapshot(
      Hello
        ? `"<span class="effect effect--blink"><h1 class="hello--emphasis">Hello, World!</h1></span>"`
        : `"<span class="effect effect--blink"></span>"`
    ));
});
