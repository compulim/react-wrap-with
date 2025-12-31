import { describeEach } from '@compulim/test-harness/describeEach';
import { render, type RenderResult } from '@testing-library/react';
import { expect } from 'expect';
import { beforeEach, test } from 'node:test';
import React, { type ComponentType, type Ref, type RefAttributes } from 'react';
import { Extract, type HowOf, Spy, wrapWith } from '../../src/index.ts';
import EffectClass from '../__setup__/Effect.class.tsx';
import FunctionalEffect from '../__setup__/Effect.functional.tsx';
import { type EffectProps } from '../__setup__/Effect.props.ts';
import HelloClass from '../__setup__/Hello.class.tsx';
import FunctionalHello from '../__setup__/Hello.functional.tsx';
import { type HelloProps } from '../__setup__/Hello.props.ts';

const { createRef } = React;

describeEach([
  ['functional component', FunctionalEffect, FunctionalHello] as const,
  ['component class', EffectClass, HelloClass] as const
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
      expect(result.container.innerHTML).toBe(
        Effect
          ? Hello
            ? '<span class="effect effect--blink"><h1>Hello, World!</h1></span>'
            : '<span class="effect effect--blink"></span>'
          : '<h1>Hello, World!</h1>'
      ));

    if (Hello) {
      test('should have "tagName" of "H1"', () => expect(ref).toHaveProperty('current.tagName', 'H1'));
    } else {
      test('should not have ref', () => expect(ref).toHaveProperty('current', null));
    }
  }
);
