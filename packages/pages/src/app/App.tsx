import './AutoResizeTextArea.css';

import React, { Fragment, useState } from 'react';

import Extract from './Extract.tsx';
import Simple from './Simple.tsx';
import TextArea from './TextArea.tsx';
import withDoppelganger from './withDoppelganger.tsx';

const AutoResizeTextArea = withDoppelganger(TextArea);

const App = () => {
  const [value, setValue] = useState(
    'Do enim adipisicing ex qui adipisicing minim anim id et aute incididunt ad. Eu labore elit tempor Lorem voluptate. Voluptate culpa cupidatat ipsum officia commodo mollit dolore eiusmod sit ut reprehenderit sint. Reprehenderit non ipsum culpa eiusmod tempor esse esse ut nulla occaecat tempor. Consequat irure excepteur veniam occaecat occaecat dolor ex est laborum cillum cupidatat cillum ea sit. Occaecat eiusmod sunt consequat dolor proident tempor elit id commodo fugiat deserunt commodo dolor consequat.'
  );

  return (
    <Fragment>
      <Simple />
      <hr />
      <Extract />
      <hr />
      <h2>Auto-resize text area</h2>
      <label>
        <div>Enter a message</div>
        <AutoResizeTextArea
          className="auto-resize-text-area__text-area"
          containerClassName="auto-resize-text-area"
          doppelgangerClassName="auto-resize-text-area__doppelganger"
          onInput={setValue}
          suffix={'\u200b'} // Zero-width space is required to capture the last newline in <textarea>.
          value={value}
        />
      </label>
    </Fragment>
  );
};

export default App;
