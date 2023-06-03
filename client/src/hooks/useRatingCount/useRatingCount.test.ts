import { renderHook } from '@testing-library/react';
import { useRatingCount } from './useRatingCount';

describe('USE RATING COUNT TESTS', () => {
    test('useRatingCount should return 5 with 1800 windowWidth', () => {
        const { result } = renderHook(() => useRatingCount(1800));
        expect(result.current).toBe(5);
    });

    test('useRatingCount should return 4 with 1100 windowWidth', () => {
        const { result } = renderHook(() => useRatingCount(1100));
        expect(result.current).toBe(4);
    });

    test('useRatingCount should return 3 with 740 windowWidth', () => {
        const { result } = renderHook(() => useRatingCount(740));
        expect(result.current).toBe(3);
    });

    test('useRatingCount should return 2 with 300 windowWidth', () => {
        const { result } = renderHook(() => useRatingCount(300));
        expect(result.current).toBe(2);
    });
});
