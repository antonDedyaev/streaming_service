import { render, screen } from '@testing-library/react';
import SquareCard from './SquareCard';
import img from '../../../testAsserts/img/BG554460.jpg';

describe('SQUARECARD SNAPSHOTS TESTS', () => {
  test('active SquareCard should not be changed', () => {
    render(<SquareCard href="/" src="/../../../testAsserts/img/BG554460.jpg" alt="fff" caption="Имя Фамилия" />);
    const link = screen.getByRole('link');
    expect(link).toMatchSnapshot();
  });

  test('static SquareCard should not be changed', () => {
    render(<SquareCard disabled={true} mainValue={6.2} caption="Рейтинг" />);
    const link = screen.getByRole('link');
    expect(link).toMatchSnapshot();
  });

  test('staticGood SquareCard should not be changed', () => {
    render(<SquareCard disabled={true} mainValue={9.5} caption="Рейтинг" />);
    const link = screen.getByRole('link');
    expect(link).toMatchSnapshot();
  });
});
