import React, { forwardRef } from 'react';

import { type HelloProps } from './Hello.props';

const Hello = forwardRef<HTMLHeadingElement, HelloProps>(({ emphasis, text }: HelloProps, ref) => (
  <h1 className={emphasis ? 'hello--emphasis' : undefined} ref={ref}>
    {text}
  </h1>
));

Hello.displayName = 'Hello';

export default Hello;
