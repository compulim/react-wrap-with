/** @jest-environment jsdom */
/// <reference types="@types/jest" />

import { render } from '@testing-library/react';
import PropTypes from 'prop-types';
import React from 'react';

import Extract from '../Extract';
import wrapWith from './wrapWith';

const Hello = ({ className }: { className?: string }) => <h1 className={className}>Hello, World!</h1>;

Hello.propTypes = { className: PropTypes.string };

test('extract props without a container', () => {
  // GIVEN: Wrapping <Hello> with false and extract "className" prop.
  const BlinkingHello = wrapWith(false, { className: Extract })(Hello);

  // WHEN: Render.
  const result = render(<BlinkingHello className="blink" />);

  // THEN: It should produce HTML without class name because it is already extracted.
  expect(result.container.innerHTML).toMatchInlineSnapshot(`"<h1>Hello, World!</h1>"`);
});
