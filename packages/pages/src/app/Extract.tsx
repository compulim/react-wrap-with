import React from 'react';
import { Extract, wrapWith } from 'react-wrap-with';

import Effect from './Effect.tsx';
import Hello from './Hello.tsx';

const withBlink = wrapWith(Effect, { effect: Extract });

const BlinkingHello = withBlink(Hello);

const ExtractSection = () => {
  return (
    <section>
      <BlinkingHello effect="blink" />
      <pre>{`const Component = wrapWith(Effect, { effect: Extract })(Hello);\n\nrender(<Component effect="blink" />);`}</pre>
    </section>
  );
};

export default ExtractSection;
