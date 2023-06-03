import { useEffect, useState } from 'react';
import styles from './SortMovies.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { getSortedMovies } from '@/utils/moviesHelpers';
import IMovies from '@/models/IMovies';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export interface ISortParams {
    userRates: string;
    rating: string;
    releaseDate: string;
    name: string;
}

const SortMovies = ({ filteredMovies }: { filteredMovies: IMovies[] }) => {
    const { t } = useTranslation('moviesPage');
    const { locale } = useRouter();
    const dispatch = useAppDispatch();
    const [isDropdownShown, setIsDropdownShown] = useState(false);

    const sortParams: string[] = ['userRates', 'rating', 'releaseDate', 'name'];

    const [sortingParameter, setSortingParameter] = useState('userRates');

    useEffect(() => {
        getSortedMovies(sortingParameter, [...filteredMovies], locale!, dispatch);
    }, [sortingParameter]);

    const handleSortTypeSelection = ({ currentTarget }: React.MouseEvent<HTMLDivElement>, key: string) => {
        setSortingParameter(key);
        currentTarget
            .parentElement!.querySelector(`.${styles.container__dropdownItem_selected}`)
            ?.classList.remove(styles.container__dropdownItem_selected);
        currentTarget.classList.add(styles.container__dropdownItem_selected);
    };

    const renderMenuItem = (param: string) => {
        return (
            <div
                className={styles.container__dropdownItem}
                key={param}
                onClick={(e) => handleSortTypeSelection(e, param)}
            >
                <div className={styles.container__itemStripe}></div>
                <div className={styles.container__itemText}>
                    {param !== 'userRates'
                        ? t(`sorting.${param}`)
                        : `${t('sorting.by')} ${t(`sorting.${param}`).slice(0, 1).toLowerCase()}${t(
                              `sorting.${param}`,
                          ).slice(1)}`}
                </div>
            </div>
        );
    };

    return (
        <section data-testid={'sortMovies'}>
            <div className={styles.container}>
                <div className={styles.container__sortingControl}>
                    <div
                        className={[
                            styles.container__sorting,
                            isDropdownShown ? styles.container__sorting_active : null,
                        ].join(' ')}
                        onClick={() => setIsDropdownShown(!isDropdownShown)}
                    >
                        <div className={styles.container__sortingPanel}>
                            <div className={styles.container__sortIcon}></div>
                            <div className={styles.container__sortParameter}>{`${t('sorting.by')} ${t(
                                `sorting.${sortingParameter}`,
                            )
                                .slice(0, 1)
                                .toLowerCase()}${t(`sorting.${sortingParameter}`).slice(1)}`}</div>
                            <div className={styles.container__sortArrow}></div>
                        </div>
                        <div className={styles.container__dropdown}>
                            <div className={styles.container__itemTitle}>{t('sorting.sort')}</div>
                            {sortParams.map((param) => renderMenuItem(param))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default SortMovies;
