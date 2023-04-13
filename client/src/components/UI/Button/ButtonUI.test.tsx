import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import ButtonUI from './ButtonUI'

describe('ButtonUI SNAPSHOTS TESTS', () => {
    test('lightRed ButtonUI should not be changed', () => {
        // arrange
        render(
            <ButtonUI
                className='button'
                background='lightRed'
                variant='large'>
                Красная кнопка
            </ButtonUI>
        )
        const button = screen.getByText('Красная кнопка')

        // assert
        expect(button).toMatchSnapshot()
    })

    test('gray ButtonUI should not be changed', () => {
        // arrange
        render(
            <ButtonUI
                className='button'
                background='gray'
                variant='small'>
                Серая кнопка
            </ButtonUI>
        )
        const button = screen.getByText('Серая кнопка')

        // assert
        expect(button).toMatchSnapshot()
    })
})
