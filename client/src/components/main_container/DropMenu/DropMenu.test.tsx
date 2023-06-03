import { render, screen } from '@testing-library/react';
import DropMenu from './DropMenu';

describe('DROPMENU SNAPSHOTS TESTS', () => {
    test('DropMenu should not be changed', () => {
        render(
            <DropMenu
                className="container__dropMenu"
                content={[
                    {
                        title: 'title',
                        links: [
                            {
                                text: 'Ссылка 1',
                                href: '/link1',
                            },
                            {
                                text: 'Ссылка 2',
                                href: '/link2',
                            },
                            {
                                text: 'Ссылка 3',
                                href: '/link3',
                            },
                        ],
                    },
                ]}
            />,
        );

        const div = screen.getByTestId('dropMenu');
        expect(div).toMatchSnapshot();
    });
});
