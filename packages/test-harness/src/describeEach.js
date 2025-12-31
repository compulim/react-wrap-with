import { describe } from 'node:test';
import { format } from 'util';

function describeEach(rows) {
  return (message, fn) => {
    for (const row of rows) {
      describe(format(message, ...row), () => fn(...row));
    }
  };
}

exports = { describeEach };
