import React, { Fragment } from 'react';

import Extract from './Extract';
import Simple from './Simple';

const App = () => {
  return (
    <Fragment>
      <Simple />
      <hr />
      <Extract />
    </Fragment>
  );
};

export default App;
