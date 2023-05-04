import styles from './MoviePersonsItem.module.scss';
import { IMovie } from '../movieMedallion/MovieMedallionsList/Temp/IMovie';
import ActorList from '@/components/actor/ActorList/ActorList';
import ButtonUI from '@/components/UI/buttons/Button/ButtonUI';
import { useState } from 'react';

interface MoviePersonsItemProps {
    movie: IMovie;
    title: string;
}

const MoviePersonsItem = ({ movie, title }: MoviePersonsItemProps) => {
    const [showButton, setShowButton] = useState(true);
    const [quantity, setQuantity] = useState(16);
    const showMore = () => {
        setQuantity(movie.actors.length);
        setShowButton(false);
    };

    return (
        <div className={styles.container}>
            <span className={styles.container__title}>{title}</span>

            <div className={styles.container__spoiler}>
                <div className={styles.container__item}>
                    <ActorList actors={movie.actors.slice(0, quantity)} size="medium" />
                </div>
                {showButton && (
                    <ButtonUI
                        className={styles.container__spoilerButton}
                        background="transparent"
                        onClick={() => showMore()}
                    >
                        Показать ещё
                    </ButtonUI>
                )}
            </div>
        </div>
    );
};

export default MoviePersonsItem;
