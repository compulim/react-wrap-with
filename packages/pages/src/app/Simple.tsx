import { withProps, wrapWith } from 'react-wrap-with';
import React from 'react';

import Effect from './Effect';
import Hello from './Hello';

const withBlink = wrapWith(withProps(Effect, { effect: 'blink' }));

const BlinkingHello = withBlink(Hello);

const Simple = () => {
  return (
    <section>
      <BlinkingHello />
      <pre>{`const Component = wrapWith(Effect, { effect: 'blink' })(Hello);\n\nrender(<Component />);`}</pre>
    </section>
  );
};

export default Simple;
