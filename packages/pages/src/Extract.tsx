import { wrapWith } from 'react-wrap-with';
import React from 'react';

import Effect from './Effect';
import Hello from './Hello';

const withBlink = wrapWith(Effect, {}, ['effect']);

const BlinkingHello = withBlink(Hello);

const Extract = () => {
  return (
    <section>
      <BlinkingHello effect="blink" />
      <pre>{`const Component = wrapWith(Effect, {}, ['effect'])(Hello);\n\nrender(<Component effect="blink" />);`}</pre>
    </section>
  );
};

export default Extract;
