import React, { ReactNode, useEffect, useState } from 'react';
import styles from './Slider.module.scss';
import ArrowButton from '../UI/buttons/ArrowButton/ArrowButtonUI';
import { useWindowSize } from '@/hooks/useWindowSize/useWindowSize';
import { useMoviesCount } from '@/hooks/useMoviesCount/useMoviesCount';
import { useRatingCount } from '@/hooks/useRatingCount/useRatingCount';

interface SliderProps {
    itemType: 'actor' | 'preview' | 'rating' | 'promo' | 'other';
    children: ReactNode;
    length: number;
}

export const Slider = ({ itemType, children, length }: SliderProps) => {
    const windowWidth = useWindowSize();
    const [position, setPosition] = useState<number>(0);

    const listCount =
        itemType === 'actor' || itemType === 'preview'
            ? useMoviesCount(windowWidth)
            : itemType === 'rating'
            ? useRatingCount(windowWidth)
            : itemType === 'promo'
            ? 1
            : 2;

    const minPosition = 0;
    const maxPosition = (-100 / listCount) * length + 100;

    const leftHandler = () => {
        const newPosition = itemType !== 'promo' ? position + (100 / listCount) * (listCount - 1) : position + 100;

        if (newPosition > minPosition) {
            setPosition(minPosition);
        } else {
            setPosition(newPosition);
        }
    };

    const rightHandler = () => {
        const newPosition = itemType !== 'promo' ? position - (100 / listCount) * (listCount - 1) : position - 100;

        if (newPosition < maxPosition) {
            setPosition(maxPosition);
        } else {
            setPosition(newPosition);
        }
    };

    useEffect(() => {
        setPosition(minPosition);
    }, [listCount]);

    return (
        <>
            <div className={[styles.container, styles[`container_${itemType}`]].join(' ')}>
                {position < minPosition && (
                    <ArrowButton
                        className={[styles.container__button, styles.container__button_left].join(' ')}
                        diarection="left"
                        iconSize={windowWidth > 1380 ? 'large' : 'medium'}
                        onClick={leftHandler}
                    />
                )}

                <div className={[styles.container__contentContainer].join(' ')}>
                    <div className={[styles.container__content, 'content'].join(' ')}>{children}</div>
                </div>

                {position > maxPosition && (
                    <ArrowButton
                        className={[styles.container__button, styles.container__button_right].join(' ')}
                        diarection="right"
                        iconSize={windowWidth > 1380 ? 'large' : 'medium'}
                        onClick={rightHandler}
                    />
                )}
            </div>

            <style jsx>
                {`
                    .content {
                        left: calc(0% + ${position}%);
                    }
                `}
            </style>
        </>
    );
};

export default Slider;
