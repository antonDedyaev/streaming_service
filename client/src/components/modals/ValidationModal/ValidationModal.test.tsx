import { render, screen } from '@testing-library/react';
import ValidationModal from './ValidationModal';

jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            asPath: '/',
        };
    },
}));

describe('VALIDATIONMODAL SNAPSHOTS TESTS', () => {
    test('ValidationModal should not be changed', () => {
        render(<ValidationModal />);

        const validation = screen.getByTestId('validationModal');
        expect(validation).toMatchSnapshot();
    });
});
