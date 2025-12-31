import { describeEach } from '@compulim/test-harness/describeEach';
import { expect } from 'expect';
import { beforeEach, test } from 'node:test';
import { render, type RenderResult } from '@testing-library/react';
import React, { type ComponentType, type ReactNode } from 'react';
import { wrapWith } from '../../src/index.ts';
import HelloClass from '../__setup__/Hello.class.tsx';
import FunctionalHello from '../__setup__/Hello.functional.tsx';
import { type HelloProps } from '../__setup__/Hello.props.ts';

const BlinkingEffect = ({ children }: { children?: ReactNode | undefined }) => (
  <span className="effect effect--blink">{children}</span>
);

describeEach([
  ['with a functional component', FunctionalHello] as const,
  ['with a component class', HelloClass] as const
])('%s', (_, Hello: ComponentType<HelloProps>) => {
  let BlinkingHello: ComponentType<{ emphasis?: boolean; text: string }>;
  let result: RenderResult;

  beforeEach(() => {
    BlinkingHello = wrapWith(BlinkingEffect)(Hello);

    result = render(<BlinkingHello emphasis={true} text="Hello, World!" />);
  });

  test('should render as expected', () =>
    expect(result.container.innerHTML).toBe(
      Hello
        ? '<span class="effect effect--blink"><h1 class="hello--emphasis">Hello, World!</h1></span>'
        : '<span class="effect effect--blink"></span>'
    ));
});
