import { render, screen } from '@testing-library/react';
import ModalUI from './ModalUI';

jest.mock('next/router', () => ({
    useRouter() {
        return {
            pathname: '',
            asPath: '',
        };
    },
}));

describe('MODALUI SNAPSHOTS TESTS', () => {
    test('ModalUI should not be changed', () => {
        render(<ModalUI>Я модалка</ModalUI>);
        const modal = screen.getByText('Я модалка');
        expect(modal).toMatchSnapshot();
    });
});
