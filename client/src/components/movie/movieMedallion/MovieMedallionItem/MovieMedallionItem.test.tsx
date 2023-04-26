import { render, screen } from '@testing-library/react';
import MovieMedallionItem from './MovieMedallionItem';

describe('MOVIEMEDALLIONITEM SNAPSHOTS TESTS', () => {
    test('active MovieMedallionItem should not be changed', () => {
        render(
            <MovieMedallionItem text="Текст">
                <div></div>
            </MovieMedallionItem>,
        );

        const div = screen.getByTestId('div-MedallionItem');
        expect(div).toMatchSnapshot();
    });

    test('inactive MovieMedallionItem should not be changed', () => {
        render(
            <MovieMedallionItem text="Текст" disabled={true}>
                <div></div>
            </MovieMedallionItem>,
        );
        const div = screen.getByTestId('div-MedallionItem');
        expect(div).toMatchSnapshot();
    });
});
