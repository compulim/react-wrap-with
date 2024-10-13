import React, { forwardRef, type ReactNode, type Ref } from 'react';

import { wrapWith } from '../../src/index.ts';

const Header = ({ children }: { children?: ReactNode | undefined }) => <h1>{children}</h1>;

const Bold = forwardRef<HTMLDivElement, { children?: ReactNode | undefined }>(({ children }, ref) => (
  <div ref={ref}>{children}</div>
));

// WHEN: Creating a component with ref of HTMLDivElement.
const Wrapped = wrapWith(Header)(Bold);

// THEN: It should compile.
<Wrapped ref={(() => {}) as Ref<HTMLDivElement>} />;
