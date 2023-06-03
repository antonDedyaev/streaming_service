import { render, screen } from '@testing-library/react';
import FilterPlank from './FilterPlank';
import * as reduxHooks from '../../../store/hooks/redux';

jest.mock('../../../store/hooks/redux');
const mockedSelector = jest.spyOn(reduxHooks, 'useAppSelector');
const genres = [{ id: 1, name: 'Жанр', enName: 'Genre' }];

describe('FILTERPLANK SNAPSHOTS TESTS', () => {
    test('FilterPlank should not be changed', () => {
        mockedSelector.mockReturnValue({ genres });
        render(<FilterPlank children="children" title="Жанры" />);

        const div = screen.getByTestId('filterPlank');
        expect(div).toMatchSnapshot();
    });
});
