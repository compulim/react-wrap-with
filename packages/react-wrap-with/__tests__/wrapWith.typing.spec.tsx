import { join } from 'path';

import typeScript, { JsxEmit } from 'typescript';

function compile(...filenames) {
  const program = typeScript.createProgram(
    filenames.map(filename => join(__dirname, filename)),
    {
      allowSyntheticDefaultImports: true,
      jsx: JsxEmit.React,
      noEmit: true,
      skipLibCheck: true,
      strict: true
    }
  );

  const emitResult = program.emit();
  const allDiagnostics = typeScript.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

  allDiagnostics.forEach(({ file, messageText, start }) => {
    if (file && start) {
      const { line, character } = file.getLineAndCharacterOfPosition(start);
      const message = typeScript.flattenDiagnosticMessageText(messageText, '\n');

      throw new Error(`Failed to compile ${file.fileName} (${line + 1},${character + 1}): ${message}`);
    } else {
      throw new Error(typeScript.flattenDiagnosticMessageText(messageText, '\n'));
    }
  });
}

test('should succeed when mergeProps argument is not passed on component without props', () =>
  compile('./__types__/noProps.tsx'));

test('should succeed when undefined is passed to component without props', () =>
  compile('./__types__/noProps.undefined.tsx'));

test('should succeed when empty object is passed to component without props', () =>
  compile('./__types__/noProps.empty.tsx'));

test.failing('should fail when mergeProps is not passed on component requires props', () =>
  compile('./__types__/failing/requireProps.tsx')
);

test.failing('should fail when wrong props is passed', () => compile('./__types__/failing/wrongProps.tsx'));

test.failing('should fail when props is passed to component which do not need props', () =>
  compile('./__types__/failing/extraneousProps.tsx')
);

test.failing('should fail when wrapper component does not allow children', () => compile('./__types__/failing/noChildren.tsx'));
