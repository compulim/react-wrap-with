import { expect } from 'expect';
import { test } from 'node:test';
import Extract from './Extract.ts';

test('Extract symbol should be global', () => {
  expect(Extract).toBe(Symbol.for(Extract.description || ''));
});
