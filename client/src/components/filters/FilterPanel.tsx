import Image from 'next/image';
import styles from './FilterPanel.module.scss';
import closeIcon from '../../../public/icons/close.svg';
import { ReactNode, useEffect, useState } from 'react';
import TransparentButton from '../UI/buttons/TransparentButton/TransparentButton';

import { useTranslation } from 'next-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { filtersRemoved } from '../../store/slices/moviesSlice';
interface IPanel {
    className?: string;
    isFilterApplied: boolean;
    children: ReactNode;
}

const FilterPanel = ({ className, children, isFilterApplied }: IPanel) => {
    const { t } = useTranslation('moviesPage');
    const dispatch = useAppDispatch();

    const HandleRemoveFilters = () => {
        dispatch(filtersRemoved({ genres: [], countries: [], ratingKp: 0, votesKp: 0, director: '', actor: '' }));
    };

    return (
        <section className={[styles.container, className].join(' ')}>
            <div className={styles.container__body}>
                <div className={styles.container__content}>
                    <div className={styles.container__filterList}>{children}</div>
                    <div className={styles.container__buttonContainer}>
                        <TransparentButton
                            className={[
                                styles.container__resetButton,
                                !isFilterApplied ? styles.container__resetButton_disabled : null,
                            ].join(' ')}
                            textColor="bright"
                            onClick={HandleRemoveFilters}
                        >
                            <Image src={closeIcon} height={16} width={16} alt="Иконка-крестик" />
                            {t('filterPanel.removeFilters')}
                        </TransparentButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FilterPanel;
