import React, { ReactNode, useEffect, useState } from 'react';
import styles from './Slider.module.scss';
import { useWindowSize } from '@/hooks/useWindowResize/useWindowSize';
import ArrowButton from '../UI/ArrowButton/ArrowButtonUI';
import { useMoviesCount } from '@/hooks/useMoviesCount/useMoviesCount';
import { useRatingCount } from '@/hooks/useRatingCount/useRatingCount';

interface SliderProps {
    itemType: 'actor' | 'preview' | 'rating' | 'promo' | 'other'
    children: ReactNode
    length: number
}

function Slider({ itemType, children, length }: SliderProps) {
    const windowWidth = useWindowSize();
    const [position, setPosition] = useState<number>(0);

    const listCount = 
        itemType === 'actor' || itemType === 'preview' 
            ? useMoviesCount(windowWidth) :
        itemType === 'rating'
            ? useRatingCount(windowWidth) :
        itemType === 'promo'
            ? 1 : 2

    const minPosition = 0;
    const maxPosition = (-100 / listCount) * length + 100;

    const leftHandler = () => {
        const newPosition = 
            itemType !== 'promo' 
                ? position + (100 / listCount) * (listCount - 1)
                : position + 100

        if (newPosition > minPosition) {
            setPosition(minPosition);
        } else {
            setPosition(newPosition);
        }
    };

    const rightHandler = () => {
        const newPosition = 
            itemType !== 'promo' 
                ? position - (100 / listCount) * (listCount - 1)
                : position - 100

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
        <div className="container">
            <div className={styles.container}>
                {position < minPosition && (
                    <ArrowButton
                        className={[styles.container__button, styles.container__button_left].join(' ')}
                        diarection="left"
                        iconSize={windowWidth > 1200 ? 'large' : 'medium'}
                        onClick={leftHandler}
                    />
                )}

                <div className={[styles.container__contentContainer].join(' ')}>
                    <div className={[styles.container__content, 'content'].join(' ')}>
                        {children}
                    </div>
                </div>

                {position > maxPosition && (
                    <ArrowButton
                        className={[styles.container__button, styles.container__button_right].join(' ')}
                        diarection="right"
                        iconSize={windowWidth > 1200 ? 'large' : 'medium'}
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
        </div>
    );
}

export default Slider;
