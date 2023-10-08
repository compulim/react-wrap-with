/** @jest-environment jsdom */
/// <reference types="@types/jest" />

import { render, RenderResult } from '@testing-library/react';
import React, { createRef, type ComponentType, type Ref, RefAttributes } from 'react';

import { Extract, type HowOf, Spy, wrapWith } from '../../src/index';
import EffectClass from '../__setup__/Effect.class';
import FunctionalEffect from '../__setup__/Effect.functional';
import FunctionalHello from '../__setup__/Hello.functional';
import HelloClass from '../__setup__/Hello.class';

import type { EffectProps } from '../__setup__/Effect.props';
import type { HelloProps } from '../__setup__/Hello.props';

describe.each([
  ['functional component', FunctionalEffect, FunctionalHello],
  ['component class', EffectClass, HelloClass]
])(
  'with a %s',
  (_, Effect: ComponentType<EffectProps>, Hello: ComponentType<HelloProps & RefAttributes<HTMLHeadingElement>>) => {
    let BlinkingHello: ComponentType<
      { effect: 'blink'; emphasis?: boolean; text: string } & RefAttributes<HTMLHeadingElement>
    >;
    let result: RenderResult;
    let ref: Ref<HTMLHeadingElement>;

    beforeEach(() => {
      ref = createRef<HTMLHeadingElement>();

      BlinkingHello = wrapWith(Effect, { effect: Extract, emphasis: Spy } satisfies HowOf<typeof Effect>)(Hello);

      result = render(<BlinkingHello effect="blink" ref={ref} text="Hello, World!" />);
    });

    test('should render as expected', () =>
      expect(result.container.innerHTML).toMatchInlineSnapshot(
        Effect
          ? Hello
            ? `"<span class="effect effect--blink"><h1>Hello, World!</h1></span>"`
            : `"<span class="effect effect--blink"></span>"`
          : `"<h1>Hello, World!</h1>"`
      ));

    if (Hello) {
      test('should have "tagName" of "H1"', () => expect(ref).toHaveProperty('current.tagName', 'H1'));
    } else {
      test('should not have ref', () => expect(ref).toHaveProperty('current', null));
    }
  }
);
