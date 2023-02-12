import { wrapWith } from 'react-wrap-with';
import React from 'react';

import Effect from './Effect';
import Hello from './Hello';

const withBlink = wrapWith(Effect, { effect: 'blink' });

const BlinkingHello = withBlink(Hello);

const App = () => {
  return <BlinkingHello />;
};

export default App;
