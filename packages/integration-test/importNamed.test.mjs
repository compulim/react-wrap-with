/** @jest-environment jsdom */

import { create } from 'react-test-renderer';
import React from 'react';
import wrapWith from 'react-wrap-with/wrapWith';

test('simple scenario', () => {
  const HelloWorld = () => <div>Hello, World!</div>;
  const Strong = ({ children }) => <strong>{children}</strong>;
  const withStrong = wrapWith(Strong);

  const StrongHelloWorld = withStrong(HelloWorld);

  const renderer = create(<StrongHelloWorld />);

  expect(renderer.toJSON()).toMatchInlineSnapshot(`
<strong>
  <div>
    Hello, World!
  </div>
</strong>
`);
});
