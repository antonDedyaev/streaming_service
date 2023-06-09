import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ArrowButtonUI from './ArrowButtonUI';
import { act } from 'react-dom/test-utils';

describe('ArrowButtonUI SNAPSHOTS TESTS', () => {
    test('right-large ArrowButtonUI should not be changed', () => {
        render(<ArrowButtonUI className="button" direction="right" iconSize="large" />);
        const button = screen.getByRole('button');

        expect(button).toMatchSnapshot();
    });

    test('left-small ButtonUI should not be changed', () => {
        act(() => {
            render(<ArrowButtonUI className="button" direction="left" iconSize="small" />);
        });
        const button = screen.getByRole('button');

        expect(button).toMatchSnapshot();
    });
});
