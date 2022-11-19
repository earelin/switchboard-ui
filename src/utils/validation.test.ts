import { isBlank } from './validation';

describe('Validation utils', () => {
  describe('isBlank', () => {
    test.each([
      ['', true],
      [null, true],
      ['  ', true],
      [undefined, true],
      [' abc ', false],
      ['abc ', false],
      [' abc', false],
    ])('%p is blank: %s', (input, expected) => {
      expect(isBlank(input)).toBe(expected);
    });
  });
});
