import { test } from 'node:test';
import { expect } from 'expect';
import { createElement } from 'react';
import { create } from 'react-test-renderer';
import { Extract, Spy, wrapWith } from 'react-wrap-with';

test('simple scenario', () => {
  const HelloWorld = ({ value }) => createElement('span', {}, value);
  const Strong = ({ children, effect, value }) =>
    createElement(
      'strong',
      {
        className: `effect effect--${effect} ${value.length > 10 ? 'effect--long' : ''}`
      },
      children
    );
  const withStrong = wrapWith(Strong, { effect: Extract, value: Spy });

  const StrongHelloWorld = withStrong(HelloWorld);

  const renderer = create(createElement(StrongHelloWorld, { effect: 'blink', value: 'Hello, World!' }));

  expect(renderer.toJSON()).toEqual({
    type: 'strong',
    props: {
      className: 'effect effect--blink effect--long'
    },
    children: [
      {
        type: 'span',
        props: {},
        children: ['Hello, World!']
      }
    ]
  });
});
