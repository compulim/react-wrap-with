import React from 'react';

import wrapWith from '../../../src/wrapWith';

import type { FC } from 'react';

type Props = { className: string };

const Header: FC<Props> = () => <h1>Hello, World!</h1>;

wrapWith(Header);
