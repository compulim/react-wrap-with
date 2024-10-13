import React, { forwardRef, type ReactNode, type Ref } from 'react';

import { wrapWith } from '../../src/index.ts';

const Header = ({ children }: { children?: ReactNode | undefined }) => <h1>{children}</h1>;

const Bold = forwardRef<HTMLDivElement, { children?: ReactNode | undefined }>(({ children }, ref) => (
  <div ref={ref}>{children}</div>
));

const Wrapped = wrapWith(Header)(Bold);

// @ts-expect-error Type 'HTMLDivElement' is not assignable to type 'string'.
<Wrapped ref={(() => {}) as Ref<string>} />;
