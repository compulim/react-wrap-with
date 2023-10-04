import Extract from './Extract';

test('Extract symbol should be global', () => {
  expect(Extract).toBe(Symbol.for(Extract.description || ''));
});
