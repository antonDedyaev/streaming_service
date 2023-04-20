import React from 'react'
import '@testing-library/jest-dom'
import { render, renderHook } from '@testing-library/react'
import { useWindowSize } from './useWindowSize'
import HomePage from '@/pages/index'

describe('USE WINDOW SIZE TESTS' ,() => {
    test('useWindowSize should return defined value', () => {
        // arrange
        render(
            <HomePage/>
        )
        const { result } = renderHook(() => useWindowSize())
        
        //assert
        expect(result.current).toBeDefined()
    })
})