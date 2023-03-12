/** @jest-environment jsdom */
/// <reference types="@types/jest" />

import { render } from '@testing-library/react';
import React from 'react';

import wrapWith from './wrapWith';

import type { PropsWithChildren } from 'react';

type ListItemProps = PropsWithChildren<{ className?: string }>;

const ListItem = ({ children, className }: ListItemProps) => (
  <li className={className} role="listitem">
    {children}
  </li>
);

type OrderedListProps = PropsWithChildren<{ className?: string }>;

const OrderedList = ({ children, className }: OrderedListProps) => (
  <ol className={className} role="list">
    {children}
  </ol>
);

describe('Wrapping <ListItem> with <OrderedList>', () => {
  // GIVEN: Wrapping <ListItem> with <OrderedList>.
  const SingleListItem = wrapWith(OrderedList, { className: 'list' })(ListItem);

  test('should render', () => {
    // WHEN: When rendering the wrapped component.
    const result = render(<SingleListItem className="list-item">Hello, World!</SingleListItem>);

    const list = result.getByRole('list');

    // THEN: It should render <OrderedList>.
    expect(list).toBeTruthy();
    expect(list).toHaveProperty('className', 'list');

    const listItem = result.getByRole('listitem');

    // THEN: It should render <ListItem>.
    expect(listItem).toBeTruthy();
    expect(listItem).toHaveProperty('className', 'list-item');
    expect(listItem.textContent).toBe('Hello, World!');

    // THEN: The <OrderedList> should has exactly one <ListItem>.
    expect(list.childElementCount).toBe(1);
    expect(listItem.parentElement).toBe(list);
  });
});

test.each([false, null, undefined] as [false, null, undefined])('wrapping <ListItem> with `%s`', ContainerComponent => {
  // GIVEN: Wrapping <ListItem> with false/null/undefined.
  const Wrapped = wrapWith(ContainerComponent, {})(ListItem);

  // WHEN: When rendering the wrapped component.
  const result = render(<Wrapped>Hello, World!</Wrapped>);

  const listItem = result.getByRole('listitem');

  // THEN: It should render "Hello, World!".
  expect(listItem.textContent).toBe('Hello, World!');

  // THEN: It should only render <ListItem /> in the container.
  expect(result.container.childElementCount).toBe(1);
  expect(listItem.parentElement).toBe(result.container);
});

test.each([false, null, undefined] as [false, null, undefined])('wrapping `%s` with <OrderedList>', wrapping => {
  // GIVEN: Wrapping false/null/undefined with <OrderedList>.
  const Wrapped = wrapWith(OrderedList, {})(wrapping);

  // WHEN: Rendering the wrapped component.
  const result = render(<Wrapped>Hello, World!</Wrapped>);

  const list = result.getByRole('list');

  // THEN: It should not have content.
  //       The wrapped component does not exists, passing `children` props there should render nothing.
  expect(list.textContent).toBeFalsy();

  // THEN: It should only render <OrderedList /> in the container.
  expect(result.container.childElementCount).toBe(1);
  expect(list.parentElement).toBe(result.container);
});

test.each([false, null, undefined] as [false, null, undefined])(
  'wrapping `%s` with the same type of component',
  ComponentComponent => {
    // GIVEN: Wrapping false/null/undefined with false/null/undefined.
    const Wrapped = wrapWith(ComponentComponent, {})(ComponentComponent);

    // WHEN: Rendering the wrapped component.
    const result = render(<Wrapped>Hello, World!</Wrapped>);

    // THEn: It should render nothing.
    expect(result.container.hasChildNodes()).toBe(false);
  }
);
