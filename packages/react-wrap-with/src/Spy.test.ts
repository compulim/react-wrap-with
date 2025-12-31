import { expect } from 'expect';
import { test } from 'node:test';
import Spy from './Spy.ts';

test('Spy symbol should be global', () => {
  expect(Spy).toBe(Symbol.for(Spy.description || ''));
});
