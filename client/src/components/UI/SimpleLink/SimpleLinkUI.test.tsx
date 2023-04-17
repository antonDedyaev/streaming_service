import { render, screen } from '@testing-library/react';
import SimpleLinkUI from './SimpleLinkUI';

describe('SIMPLELINKUI SNAPSHOTS TESTS', () => {
  test('bright SIMPLELINKUI should not be changed', () => {
    render(
      <SimpleLinkUI href="/" option="bright">
        Ссылка
      </SimpleLinkUI>,
    );
    const link = screen.getByRole('link');
    expect(link).toMatchSnapshot();
  });

  test('dim SIMPLELINKUI should not be changed', () => {
    render(
      <SimpleLinkUI href="/" option="dim">
        Ссылка
      </SimpleLinkUI>,
    );
    const link = screen.getByRole('link');
    expect(link).toMatchSnapshot();
  });
});
