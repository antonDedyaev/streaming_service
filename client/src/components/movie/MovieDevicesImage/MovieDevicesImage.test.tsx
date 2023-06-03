import { render, screen } from '@testing-library/react';
import MovieDevicesImage from './MovieDevicesImage';

describe('MOVIEDEVICESIMAGE SNAPSHOTS TESTS', () => {
    test('MovieDevicesImage should not be changed', () => {
        render(<MovieDevicesImage poster={require('../../../testAsserts/img/BG554460.jpg')} title="poster" />);

        const div = screen.getByTestId('movieDevicesImage');
        expect(div).toMatchSnapshot();
    });
});
