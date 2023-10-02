/** @jest-environment jsdom */
/// <reference types="@types/jest" />

import { render } from '@testing-library/react';
import React from 'react';

import Spy from '../Spy';
import wrapWith from './wrapWith';

import type { PropsWithChildren } from 'react';

type EffectProps = PropsWithChildren<{ emphasis: boolean }>;

const Effect = (props: EffectProps) => {
  const { children, emphasis } = props;

  return <span className={`effect${emphasis ? ' effect--emphasis' : ''}`}>{children}</span>;
};

type HelloProps = { emphasis?: boolean };

const Hello = ({ emphasis }: HelloProps) => <h1 className={emphasis ? 'hello--emphasis' : ''}>Hello, World!</h1>;

test('simple scenario', () => {
  const BlinkingHello = wrapWith(Effect, { emphasis: Spy })(Hello);

  const result = render(<BlinkingHello emphasis={true} />);

  expect(result.container.innerHTML).toMatchInlineSnapshot(
    `"<span class="effect effect--emphasis"><h1 class="hello--emphasis">Hello, World!</h1></span>"`
  );
});
