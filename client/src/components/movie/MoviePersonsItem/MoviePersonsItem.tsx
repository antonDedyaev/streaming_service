import styles from './MoviePersonsItem.module.scss';

import BorderedButton from '@/components/UI/buttons/BorderedButton/BorderedButton';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import IPerson from '@/models/IPerson';
import PersonList from '@/components/person/PersonList/PersonList';

interface MoviePersonsItemProps {
    persons: IPerson[];
    title: string;
    closeModal?: (close: boolean) => void;
}

const MoviePersonsItem = ({ persons, title, closeModal }: MoviePersonsItemProps) => {
    const [showButton, setShowButton] = useState(persons.length > 16 ? true : false);
    const [quantity, setQuantity] = useState(16);
    const showMore = () => {
        setQuantity(persons.length);
        setShowButton(false);
    };

    const { t } = useTranslation('movie');
    const close = (value: boolean) => {
        closeModal?.(value);
    };

    return (
        <div className={styles.container} data-testid={'moviePersonsItem'}>
            <span className={styles.container__title}>{title}</span>

            <div className={styles.container__spoiler}>
                <div className={styles.container__item}>
                    <PersonList persons={persons.slice(0, quantity)} size="medium" closeModal={close} />
                </div>
                {showButton && (
                    <BorderedButton className={styles.container__spoilerButton} size="large" onClick={() => showMore()}>
                        {t('showMore')}
                    </BorderedButton>
                )}
            </div>
        </div>
    );
};

export default MoviePersonsItem;
