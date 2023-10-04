import Spy from './Spy';

test('Spy symbol should be global', () => {
  expect(Spy).toBe(Symbol.for(Spy.description || ''));
});
