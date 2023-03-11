// Notes: to test changes in this file, run "jest" with "--no-cache" argument.

const run = ({ filename }) => {
  const typeScript = require('typescript');

  function compile(...filenames) {
    const program = typeScript.createProgram(filenames, {
      allowSyntheticDefaultImports: true,
      jsx: typeScript.JsxEmit.React,
      noEmit: true,
      skipLibCheck: true,
      strict: true
    });

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

  if (filename.includes('fail')) {
    test(`Compile ${filename} should fail`, () => expect(() => compile(filename)).toThrow());
  } else {
    test(`Compile ${filename} should succeed`, () => compile(filename));
  }
};

module.exports = {
  process(_, filename) {
    return { code: `(${run})(${JSON.stringify({ filename })})` };
  }
};
