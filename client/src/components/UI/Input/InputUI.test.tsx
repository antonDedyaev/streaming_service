import { render, screen } from '@testing-library/react';
import InputUI from './InputUI';

jest.mock('next/router', () => ({
    useRouter() {
        return {
            pathname: '',
            asPath: '',
        };
    },
}));

describe('INPUTUI SNAPSHOTS TESTS', () => {
    test('type="search" InputUI should not be changed', () => {
        render(
            <InputUI
                type="search"
                inputType="search"
                placeholder="search"
                value="value"
                focus={false}
                onChange={() => 'value'}
            />,
        );
        const input = screen.getByTestId('input');
        expect(input).toMatchSnapshot();
    });

    test('type="email" InputUI should not be changed', () => {
        render(
            <InputUI
                type="email"
                inputType="email"
                placeholder="email"
                value="value"
                focus={false}
                onChange={() => 'value'}
            />,
        );
        const input = screen.getByTestId('input');
        expect(input).toMatchSnapshot();
    });

    test('type="password" InputUI should not be changed', () => {
        render(
            <InputUI
                type="password"
                inputType="password"
                placeholder="password"
                value="value"
                focus={false}
                onChange={() => 'value'}
            />,
        );
        const input = screen.getByTestId('input');
        expect(input).toMatchSnapshot();
    });

    test('type="comment" InputUI should not be changed', () => {
        render(
            <InputUI
                type="comment"
                inputType="text"
                placeholder="comment"
                value="value"
                focus={false}
                onChange={() => 'value'}
            />,
        );
        const input = screen.getByTestId('input');
        expect(input).toMatchSnapshot();
    });
});
