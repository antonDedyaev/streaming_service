import { useEffect, useState } from 'react';
import styles from './SortMovies.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { getSortedMovies } from '@/utils/moviesHelpers';
import IMovies from '@/models/IMovies';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

export interface ISortParams {
    userRates: string;
    rating: string;
    releaseDate: string;
    movieName: string;
}

const SortMovies = ({ filteredMovies }: { filteredMovies: IMovies[] }) => {
    const { t } = useTranslation('moviesPage');
    const { locale } = useRouter();
    const dispatch = useAppDispatch();
    const [isDropdownShown, setIsDropdownShown] = useState(false);

    const sortParams: ISortParams = {
        userRates: t('sorting.userRates'),
        rating: t('sorting.rating'),
        releaseDate: t('sorting.releaseDate'),
        movieName: t('sorting.name'),
    };
    const [sortingParameter, setSortingParameter] = useState(sortParams.userRates);

    //const sortingParamNames = ['По количеству оценок', 'Рейтингу', 'Дате выхода', 'Алфавиту'];
    const sortingParamNames = [
        t('sorting.userRates'),
        t('sorting.rating'),
        t('sorting.releaseDate'),
        t('sorting.name'),
    ];

    useEffect(() => {
        getSortedMovies(sortParams, sortingParameter, [...filteredMovies], locale!, dispatch);
    }, [sortingParameter]);

    const handleSortTypeSelection = ({ currentTarget }: React.MouseEvent<HTMLDivElement>) => {
        setSortingParameter(currentTarget.textContent!);
        currentTarget
            .parentElement!.querySelector(`.${styles.container__dropdownItem_selected}`)
            ?.classList.remove(styles.container__dropdownItem_selected);
        currentTarget.classList.add(styles.container__dropdownItem_selected);
    };

    const renderMenuItem = (paramName: string) => {
        return (
            <div className={styles.container__dropdownItem} key={paramName} onClick={handleSortTypeSelection}>
                <div className={styles.container__itemStripe}></div>
                <div className={styles.container__itemText}>{paramName}</div>
            </div>
        );
    };

    const selectedParam =
        sortingParameter === sortParams.userRates
            ? sortingParameter
            : `${t('sorting.by')} ${sortingParameter.slice(0, 1).toLowerCase()}${sortingParameter.slice(1)}`;

    return (
        <section>
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
                            <div className={styles.container__sortParameter}>{selectedParam}</div>
                            <div className={styles.container__sortArrow}></div>
                        </div>
                        <div className={styles.container__dropdown}>
                            <div className={styles.container__itemTitle}>Сортировать</div>
                            {Object.values(sortParams).map((param) => renderMenuItem(param))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default SortMovies;
