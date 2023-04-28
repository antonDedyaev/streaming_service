import { render, screen } from '@testing-library/react';
import ActorItem from './ActorItem';

export interface IData {
    id: number;
    img: string;
    amtMovies: number;
    firstName: string;
    lastName: string;
    role: string;
}

const data: IData = {
    id: 1,
    img: require('../../../testAsserts/img/BG554460.jpg'),
    amtMovies: 4,
    firstName: 'Имя',
    lastName: 'Фамилия',
    role: 'Роль',
};

describe('ACTORITEM SNAPSHOTS TESTS', () => {
    test('large ActorItem should not be changed', () => {
        render(<ActorItem actor={data} size="large" />);
        const link = screen.getByRole('link');
        expect(link).toMatchSnapshot();
    });

    test('medium ActorItem should not be changed', () => {
        render(<ActorItem actor={data} size="medium" />);
        const link = screen.getByRole('link');
        expect(link).toMatchSnapshot();
    });

    test('small ActorItem should not be changed', () => {
        render(<ActorItem actor={data} size="small" />);
        const link = screen.getByRole('link');
        expect(link).toMatchSnapshot();
    });
});
