import styles from './MoviePersonsItem.module.scss';
import ActorList from '@/components/actor/ActorList/ActorList';
import BorderedButton from '@/components/UI/buttons/BorderedButton/BorderedButton';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import IPerson from '@/models/IPerson';

interface MoviePersonsItemProps {
    persons: IPerson[];
    title: string;
}

const MoviePersonsItem = ({ persons, title }: MoviePersonsItemProps) => {
    const [showButton, setShowButton] = useState(persons.length > 16 ? true : false);
    const [quantity, setQuantity] = useState(16);
    const showMore = () => {
        setQuantity(persons.length);
        setShowButton(false);
    };

    const { t } = useTranslation('movie');

    return (
        <div className={styles.container}>
            <span className={styles.container__title}>{title}</span>

            <div className={styles.container__spoiler}>
                <div className={styles.container__item}>
                    <ActorList persons={persons.slice(0, quantity)} size="medium" />
                </div>
                {showButton && (
                    <BorderedButton
                        className={styles.container__spoilerButton}
                        size='large'
                        onClick={() => showMore()}
                    >
                        {t('showMore')}
                    </BorderedButton>
                )}
            </div>
        </div>
    );
};

export default MoviePersonsItem;
