import { render, screen } from '@testing-library/react';
import TrailerModal from './TrailerModal';

jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            asPath: '/',
        };
    },
}));

describe('TRAILERMODAL SNAPSHOTS TESTS', () => {
    test('TrailerModal should not be changed', () => {
        render(<TrailerModal trailer="" />);

        const trailer = screen.getByTestId('trailerModal');
        expect(trailer).toMatchSnapshot();
    });
});
