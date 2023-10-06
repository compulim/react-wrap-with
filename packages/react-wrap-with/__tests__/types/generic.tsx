import React from 'react';

import { Extract, Spy, wrapWith } from '../../src/index';

import type { PropsWithChildren } from 'react';

type HeaderProps = PropsWithChildren<{ className?: string | undefined; value?: string | undefined }>;

const Header = ({ children, className }: HeaderProps) => <h1 className={className}>{children}</h1>;

const withHeader = wrapWith<typeof Header, 'className', 'value'>(Header, {
  className: Extract,
  value: Spy
});

const Component = withHeader(({ value }: { value: string }) => <div>{value}</div>);

<Component className="header" value="Hello, World!" />;
