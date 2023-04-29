import { declineWord } from './functions';

describe('DECLENSION OF WORD FROM NUMBER TESTS', () => {
  const array = ['фильм', 'фильма', 'фильмов'];

  test('declineWord should return the [0] value of the array when value == 1', () => {
    const result = declineWord(1, array);
    expect(result).toBe('фильм');
  });

  test('declineWord should return the [1] value of the array when 1 < value < 5', () => {
    const result = declineWord(4, array);
    expect(result).toBe('фильма');
  });

  test('declineWord should return the [2] value of the array when 10 < value < 20', () => {
    const result = declineWord(15, array);
    expect(result).toBe('фильмов');
  });
});
