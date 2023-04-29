import { FC, useState } from 'react';
import styles from './SortMovies.module.scss';
import testData from './temp/testData.json';

const SortMovies: FC = () => {
    const [isDropdownShown, setIsDropdownShown] = useState(false);
    const [sortingParameter, setSortingParameter] = useState('По количеству оценок');
    const filteredMovies = testData.movies;

    const sortingParamNames = ['По количеству оценок', 'Рейтингу', 'Дате выхода', 'Алфавиту'];
    switch (sortingParameter) {
        case 'По количеству оценок':
            filteredMovies.sort((a, b) => b.feedback - a.feedback);
            break;
        case 'Рейтингу':
            filteredMovies.sort((a, b) => b.rating - a.rating);
            break;
        case 'Дате выхода':
            filteredMovies.sort((a, b) => new Date(b.release).getTime() - new Date(a.release).getTime());
            break;
        case 'Алфавиту':
            filteredMovies.sort((a, b) => {
                return a.title.toUpperCase() > b.title.toUpperCase()
                    ? 1
                    : b.title.toUpperCase() > a.title.toUpperCase()
                    ? -1
                    : 0;
            });
            break;
        default:
            break;
    }

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
