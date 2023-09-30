import React from 'react';

import wrapWith, { SpyProp } from '../../../src/wrapWith';

import type { ComponentType, PropsWithChildren } from 'react';

const Content = (_props: { value: number }) => <div>Hello, World!</div>;

const Header: ComponentType<PropsWithChildren<{ value: string }>> = ({ children }) => <h1>{children}</h1>;

const wrapper = wrapWith(Header, { value: SpyProp });

// "xyz" is not a prop of <Header> and cannot be extracted.

// Type 'string' is not assignable to type 'number'.
wrapper(Content);
