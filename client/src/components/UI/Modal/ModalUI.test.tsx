import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import ModalUI from './ModalUI'

describe('ModalUI SNAPSHOTS TESTS', () => {
    test('ModalUI should not be changed', () => {
        // arrange
        render(
            <ModalUI onClick={() => ''}>
                Я модалка
            </ModalUI>
        )
        const modal = screen.getByText('Я модалка')

        // assert
        expect(modal).toMatchSnapshot()
    })
})
