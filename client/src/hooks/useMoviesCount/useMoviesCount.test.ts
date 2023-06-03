import { renderHook } from '@testing-library/react';
import { useMoviesCount } from './useMoviesCount';

describe('USE MOVIES COUNT TESTS', () => {
    test('useMoviesCount should return 7 with 1800 windowWidth', () => {
        const { result } = renderHook(() => useMoviesCount(1800));
        expect(result.current).toBe(7);
    });

    test('useMoviesCount should return 6 with 1200 windowWidth', () => {
        const { result } = renderHook(() => useMoviesCount(1200));
        expect(result.current).toBe(6);
    });

    test('useMoviesCount should return 3 with 740 windowWidth', () => {
        const { result } = renderHook(() => useMoviesCount(740));
        expect(result.current).toBe(3);
    });

    test('useMoviesCount should return 2 with 300 windowWidth', () => {
        const { result } = renderHook(() => useMoviesCount(300));
        expect(result.current).toBe(2);
    });
});
