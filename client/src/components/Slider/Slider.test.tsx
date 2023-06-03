import { render, screen } from '@testing-library/react';
import Slider from './Slider';
import Image from 'next/image';

const Img = <Image src={require('../../../testAsserts/img/BG554460.jpg')} alt="Img" width={25} height={25} />;
describe('SLIDER SNAPSHOTS TESTS', () => {
    test('Slider should not be changed', () => {
        render(
            <Slider
                itemType="other"
                children={
                    <div>
                        {Img}
                        {Img}
                        {Img}
                        {Img}
                        {Img}
                        {Img}
                    </div>
                }
                length={5}
            />,
        );

        const id = screen.getByTestId('slider');
        expect(id).toMatchSnapshot();
    });
});
