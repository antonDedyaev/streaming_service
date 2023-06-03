import { render, screen } from '@testing-library/react';
import EditForm from './EditForm';

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
            pathname: '',
            asPath: '/admin/movies',
        };
    },
}));

describe('EDITFORM SNAPSHOTS TESTS', () => {
    test('EditForm should not be changed', () => {
        render(<EditForm item={{ id: 1, name: 'Название', enName: 'Name' }} deletable={true} />);

        const div = screen.getByTestId('editForm');
        expect(div).toMatchSnapshot();
    });
});
