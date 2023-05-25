import styles from './MoviePersonsItem.module.scss';
import ActorList from '@/components/actor/ActorList/ActorList';
import ButtonUI from '@/components/UI/buttons/Button/ButtonUI';
import IMovie from '@/models/IMovie';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

interface MoviePersonsItemProps {
    movie: IMovie;
    title: string;
}

const MoviePersonsItem = ({ movie, title }: MoviePersonsItemProps) => {
    const [showButton, setShowButton] = useState(true);
    const [quantity, setQuantity] = useState(16);
    const showMore = () => {
        setQuantity(movie.persons.length);
        setShowButton(false);
    };

    const { t } = useTranslation('movie');

    return (
        <div className={styles.container}>
            <span className={styles.container__title}>{title}</span>

            <div className={styles.container__spoiler}>
                <div className={styles.container__item}>
                    <ActorList persons={movie.persons.slice(0, quantity)} size="medium" />
                </div>
                {showButton && (
                    <ButtonUI
                        className={styles.container__spoilerButton}
                        background="transparent"
                        onClick={() => showMore()}
                    >
                        {t('showMore')}
                    </ButtonUI>
                )}
            </div>
        </div>
    );
};

export default MoviePersonsItem;
