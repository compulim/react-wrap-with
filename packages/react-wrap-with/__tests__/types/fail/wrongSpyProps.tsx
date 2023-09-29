import React from 'react';

import wrapWith from '../../../src/wrapWith';

import type { ComponentType, PropsWithChildren } from 'react';

const Content = (_props: { value: number }) => <div>Hello, World!</div>;

const Header: ComponentType<PropsWithChildren<{ value: string }>> = ({ children }) => <h1>{children}</h1>;

const wrapper = wrapWith<typeof Header, never, 'value'>(Header, {}, [], ['value']);

wrapper(Content);
