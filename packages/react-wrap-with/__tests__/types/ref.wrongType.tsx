import React, { forwardRef } from 'react';

import wrapWith from '../../src/wrapWith';

import type { ReactNode, Ref } from 'react';

const Header = ({ children }: { children?: ReactNode | undefined }) => <h1>{children}</h1>;

const Bold = forwardRef<HTMLDivElement, { children?: ReactNode | undefined }>(({ children }, ref) => (
  <div ref={ref}>{children}</div>
));

const Wrapped = wrapWith(Header)(Bold);

// THEN: It should throw "Type 'HTMLDivElement' is not assignable to type 'string'."

// @ts-expect-error Type '(instance: string | null) => void' is not assignable to type '(instance: HTMLDivElement | null) => void'.
<Wrapped ref={(() => {}) as Ref<string>} />;
