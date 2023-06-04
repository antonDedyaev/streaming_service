/*import React from 'react'
import '@testing-library/jest-dom'*/
import { render, renderHook } from '@testing-library/react';
import { useWindowSize } from './useWindowSize';
import HomePage from '@/pages/index';
import { moviesTest } from '../../testAsserts/testItems';
import * as reduxHooks from '../../store/hooks/redux';

jest.mock('../../store/hooks/redux');
const mockedSelector = jest.spyOn(reduxHooks, 'useAppSelector');
const genres = [{ id: 1, name: 'Жанр', enName: 'Genre' }];
const useDispatch = jest.spyOn(reduxHooks, 'useAppDispatch');
const mockDispatch = jest.fn();

jest.mock('next-i18next', () => ({
    useTranslation: () => {
        return {
            t: (str: string) => str,
            i18n: {
                changeLanguage: () => new Promise(() => {}),
            },
        };
    },
}));

jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            pathname: '/',
            asPath: '/',
            query: { keyword: '/' },
        };
    },
}));

describe('USE WINDOW SIZE TESTS', () => {
    test('useWindowSize should return defined value', () => {
        mockedSelector.mockReturnValue({ genres });
        useDispatch.mockReturnValue(mockDispatch);
        render(<HomePage movies={moviesTest} />);
        const { result } = renderHook(() => useWindowSize());
        expect(result.current).toBeDefined();
    });
});
