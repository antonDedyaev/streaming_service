import Image from 'next/image';
import styles from './FilterPanel.module.scss';
import closeIcon from '../../../../public/icons/close.svg';
import { ReactNode } from 'react';
import TransparentButton from '../../UI/buttons/TransparentButton/TransparentButton';

import { useTranslation } from 'next-i18next';
import { useAppDispatch } from '../../../store/hooks/redux';
import { filtersRemoved } from '../../../store/slices/moviesSlice';

interface IPanel {
    className?: string;
    isFilterApplied: boolean;
    children: ReactNode;
}

const FilterPanel = ({ className, children, isFilterApplied }: IPanel) => {
    const { t } = useTranslation('moviesPage');
    const dispatch = useAppDispatch();

    const handleRemoveFilters = () => {
        dispatch(filtersRemoved({ genres: [], countries: [], ratingKp: 0, votesKp: 0, director: '', actor: '' }));
    };

    return (
        <div className={[styles.container, className].join(' ')} data-testid={'filterPanel'}>
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
                            onClick={handleRemoveFilters}
                        >
                            <Image src={closeIcon} height={16} width={16} alt="Иконка-крестик" />
                            {t('filterPanel.removeFilters')}
                        </TransparentButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;
