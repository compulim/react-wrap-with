/** @jest-environment jsdom */
/// <reference types="@types/jest" />

import { render } from '@testing-library/react';
import React, { type PropsWithChildren } from 'react';

import Extract from '../Extract';
import wrapWith from './wrapWith';

import type { HowOf } from '../HowOf';

type FormProps = PropsWithChildren<{ action?: string; className?: string; method?: string }>;

const Form = ({ action, children, className, method }: FormProps) => (
  <form action={action} className={className} method={method} role="form">
    {children}
  </form>
);

type TextBoxProps = { className?: string };

const TextBox = ({ className }: TextBoxProps) => <input className={className} data-testid="input" type="text" />;

describe('Wrapping <TextBox> with <Form method="post"> and extract "action" props', () => {
  const SingleFormInput = wrapWith(Form, { action: Extract, method: 'post' } satisfies HowOf<typeof Form>)(TextBox);

  test('should render', () => {
    // WHEN: Rendering the wrapped component.
    const result = render(<SingleFormInput action="https://example.com/" className="text-input" />);

    const form = result.getByRole('form');

    // THEN: It should render <form action="https://example.com/" method="post">.
    expect(form).toBeTruthy();
    expect(form).toHaveProperty('action', 'https://example.com/');
    expect(form).toHaveProperty('method', 'post');
    expect(form).toHaveProperty('tagName', 'FORM');

    const textBox = result.getByTestId('input');

    // THEN: It should render <input className="text-input" data-testid="input" type="text">.
    expect(textBox).toBeTruthy();
    expect(textBox).toHaveProperty('className', 'text-input');
    expect(textBox).toHaveProperty('type', 'text');

    // THEN: The <form> should has exactly one <input>.
    expect(form.childElementCount).toBe(1);
    expect(textBox.parentElement).toBe(form);
  });
});

describe('Wrapping <TextBox> with <Form> and extract "classname" props', () => {
  const Wrapped = wrapWith(Form, { className: Extract } satisfies HowOf<typeof Form>)(TextBox);

  test('should extract "className"', () => {
    // WHEN: Rendering the wrapped component.
    const result = render(<Wrapped className="container" data-testid="input" />);

    const form = result.getByRole('form');

    // THEN: It should render <form className="container">.
    expect(form).toBeTruthy();
    expect(form.classList.contains('container')).toBe(true);

    const textBox = result.getByTestId('input');

    // THEN: It should render <input type="text">.
    expect(textBox).toBeTruthy();

    // THEN: The textbox should not contains any class as the `className` prop is extracted out.
    expect(textBox.className).toBeFalsy();
  });
});
