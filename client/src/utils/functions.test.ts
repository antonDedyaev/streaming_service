import { declineWord, firstCapitalLetter, minutesToHours, professionInTheSingular } from './functions';

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

describe('MINUTES TO HOURS TESTS', () => {
    test('minutesToHours should return h and m with value 215', () => {
        const result = minutesToHours(215, ['ч.', 'мин.']);
        expect(result).toBe('3 ч. 35 мин.');
    });

    test('minutesToHours should return h value 120', () => {
        const result = minutesToHours(120, ['ч.', 'мин.']);
        expect(result).toBe('2 ч.');
    });

    test('minutesToHours should return m value 58', () => {
        const result = minutesToHours(58, ['ч.', 'мин.']);
        expect(result).toBe('58 мин.');
    });
});

describe('FIRST CAPITAL LETTER TESTS', () => {
    test('firstCapitalLetter should return the word capitalized', () => {
        const result = firstCapitalLetter('слово');
        expect(result).toBe('Слово');
    });

    test('firstCapitalLetter should return empty string', () => {
        const result = firstCapitalLetter(undefined);
        expect(result).toBe('');
    });
});

describe('PROFESSION IN THE SINGULAR TESTS', () => {
    test('professionInTheSingular should return a valid word in the singular', () => {
        const result = professionInTheSingular('композиторы');
        expect(result).toBe('Композитор');
    });

    test('professionInTheSingular should return an empty string if the value is not in the list', () => {
        const result = professionInTheSingular('слово');
        expect(result).toBe('');
    });
});
