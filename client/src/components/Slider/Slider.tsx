import { useEffect, useState } from 'react';
import styles from './Slider.module.scss';
import { useWindowSize } from '@/hooks/useWindowResize/useWindowSize';
import ArrowButton from '../UI/ArrowButton/ArrowButtonUI';
import { useMoviesCount } from '@/hooks/useMoviesCount/useMoviesCount';
import IActor from '@/models/IActor';
import ActorList from '@/components/actor/ActorList/ActorList';
import PostersList from '@/components/posters/PostersList/PostersList';
import RatingPostersList from '@/components/posters/PostersList/PostersList';
import IMovie from '@/models/IMovie';

interface SliderProps {
    actors?: IActor[];
    movies?: IMovie[];
    posters?: IMovie[];
}

function Slider({ actors, movies, posters }: SliderProps) {
    const list = actors ?? movies ?? posters!;

    const windowWidth = useWindowSize();
    const [position, setPosition] = useState<number>(0);
    const listCount = useMoviesCount(windowWidth);

    const minPosition = 0;
    const maxPosition = (-100 / listCount) * list.length + 100;

    const leftHandler = () => {
        const newPosition = position + (100 / listCount) * (listCount - 1);

        if (newPosition > minPosition) {
            setPosition(minPosition);
        } else {
            setPosition(newPosition);
        }
    };

    const rightHandler = () => {
        const newPosition = position - (100 / listCount) * (listCount - 1);

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
                        {actors && <ActorList actors={actors} className={styles.container__item} />}
                        {movies && (
                            <PostersList posterType="preview" movies={movies} className={styles.container__item} />
                        )}
                        {posters && (
                            <RatingPostersList
                                posterType="rating"
                                movies={posters}
                                className={styles.container__item}
                            />
                        )}
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
