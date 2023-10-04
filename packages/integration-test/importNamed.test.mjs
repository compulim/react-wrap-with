/** @jest-environment jsdom */

import { create } from 'react-test-renderer';
import Extract from 'react-wrap-with/Extract';
import Spy from 'react-wrap-with/Spy';
import wrapWith from 'react-wrap-with/wrapWith';
import React from 'react';

test('simple scenario', () => {
  const HelloWorld = ({ value }) => <span>{value}</span>;
  const Strong = ({ children, effect, value }) => (
    <strong className={`effect effect--${effect} ${value.length > 10 ? 'effect--long' : ''}`}>{children}</strong>
  );
  const withStrong = wrapWith(Strong, { effect: Extract, value: Spy });

  const StrongHelloWorld = withStrong(HelloWorld);

  const renderer = create(<StrongHelloWorld effect="blink" value="Hello, World!" />);

  expect(renderer.toJSON()).toMatchInlineSnapshot(`
<strong
  className="effect effect--blink effect--long"
>
  <span>
    Hello, World!
  </span>
</strong>
`);
});
