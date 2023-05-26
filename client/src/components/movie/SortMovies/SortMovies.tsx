import { useEffect, useState } from 'react';
import styles from './SortMovies.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { getSortedMovies } from '@/utils/moviesHelpers';
import IMovies from '@/models/IMovies';

const SortMovies = ({ filteredMovies }: { filteredMovies: IMovies[] }) => {
    const dispatch = useAppDispatch();
    const [isDropdownShown, setIsDropdownShown] = useState(false);
    const [sortingParameter, setSortingParameter] = useState('По количеству оценок');
    console.log('FilteredMovies:', filteredMovies);

    const sortingParamNames = ['По количеству оценок', 'Рейтингу', 'Дате выхода', 'Алфавиту'];

    useEffect(() => {
        getSortedMovies(sortingParameter, [...filteredMovies], dispatch);
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
        sortingParameter === sortingParamNames[0]
            ? sortingParameter
            : `По ${sortingParameter.slice(0, 1).toLowerCase()}${sortingParameter.slice(1)}`;

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
                            {sortingParamNames.map((param) => renderMenuItem(param))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default SortMovies;
