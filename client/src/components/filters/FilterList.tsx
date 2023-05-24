import styles from './FilterList.module.scss';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { genresFilterAdded, countriesFilterAdded, addFilteredMovies } from '../../store/slices/moviesSlice';
import axios from 'axios';

interface IList {
    items: string[];
    category: 'genres' | 'countries';
}

const FilterList = ({ items, category }: IList) => {
    const dispatch = useAppDispatch();

    const filters = useAppSelector((state) => state.movies.filters[category]);

    useEffect(() => {
        const sendFilters = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/films?${category}=${filters.join(',')}`);
                console.log('фильтр:', filters);
                dispatch(addFilteredMovies(filters.length !== 0 ? response.data : []));
            } catch (err) {
                console.log(err);
            }
        };
        sendFilters();
    }, [filters]);

    const handleCheckboxSelected = async ({ currentTarget }: React.MouseEvent<HTMLInputElement>) => {
        const filterText = currentTarget?.nextElementSibling?.textContent;
        category === 'genres' ? dispatch(genresFilterAdded(filterText)) : dispatch(countriesFilterAdded(filterText));
    };

    return (
        <div className={styles.container}>
            <ul className={styles.container__list}>
                {items.map((item) => (
                    <li className={styles.container__listItem} key={item}>
                        <label className={styles.container__itemLabel}>
                            <input
                                className={styles.container__itemInput}
                                type="checkbox"
                                name="list-items"
                                onClick={handleCheckboxSelected}
                            />
                            <div className={styles.container__inputText}>{item}</div>
                            <div className={styles.container__checkbox}>
                                <div className={styles.container__checkIcon}></div>
                            </div>
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default FilterList;
