import { render, screen } from '@testing-library/react';
import LinksList from './LinksList';

const links = [
    {
        href: '/',
        text: 'Ссылка 1',
    },
    {
        href: '/',
        text: 'Ссылка 2',
    },
    {
        href: '/',
        text: 'Ссылка 3',
    },
    {
        href: '/',
        text: 'Ссылка 4',
    },
    {
        href: '/',
        text: 'Ссылка 5',
    },
];

describe('LINKSLIST SNAPSHOTS TESTS', () => {
    test('direction row LinksList should not be changed', () => {
        render(<LinksList direction="row" links={links} />);

        const list = screen.getByRole('list');
        expect(list).toMatchSnapshot();
    });

    test('direction column LinksList should not be changed', () => {
        render(<LinksList direction="column" links={links} />);

        const list = screen.getByRole('list');
        expect(list).toMatchSnapshot();
    });
});
