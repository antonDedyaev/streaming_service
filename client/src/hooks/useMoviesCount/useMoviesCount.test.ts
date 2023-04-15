import { renderHook } from '@testing-library/react'
import { useMoviesCount } from './useMoviesCount'

describe('USE MOVIES COUNT TESTS' ,() => {
    test('useMoviesCount should return 7 with 1800 windowWidth',() => {
        //act
        const { result } = renderHook(() => useMoviesCount(1800))
        
        //assert
        expect(result.current).toBe(7)
    })

    test('useMoviesCount should return 6 with 1200 windowWidth',() => {
        //act
        const { result } = renderHook(() => useMoviesCount(1200))
        
        //assert
        expect(result.current).toBe(6)
    })

    test('useMoviesCount should return 3 with 740 windowWidth',() => {
        //act
        const { result } = renderHook(() => useMoviesCount(740))
        
        //assert
        expect(result.current).toBe(3)
    })

    test('useMoviesCount should return 2 with 300 windowWidth',() => {
        //act
        const { result } = renderHook(() => useMoviesCount(300))
        
        //assert
        expect(result.current).toBe(2)
    })
})