/** @jest-environment jsdom */

const { create } = require('react-test-renderer');
const { default: wrapWith } = require('react-wrap-with/wrapWith');
const React = require('react');

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
