import { useRouter } from 'next/router';
import styles from './FilterList.module.scss';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { genreFilterAdded, countryFilterAdded, addFilteredMovies } from '@/store/slices/moviesSlice';
import axios from 'axios';

interface IList {
    items: string[];
    category: string;
}

const FilterList = ({ items, category }: IList) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { genre, countries } = useAppSelector((state) => state.movies.filters);

    useEffect(() => {
        const requestBody = category === 'Жанры' ? { genre: genre } : { countries: countries };
        console.log(genre);
        const sendFilters = async () => {
            try {
                const response = await axios.post('http://localhost:6125/movies', requestBody);
                console.log(response.data);
                dispatch(addFilteredMovies(response.data));
            } catch (err) {
                console.log(err);
            }
        };
        sendFilters();
    }, [genre, countries]);

    const handleCheckboxSelected = ({ currentTarget }: React.MouseEvent<HTMLInputElement>) => {
        const filterText = currentTarget?.nextElementSibling?.textContent;
        category === 'Жанры' ? dispatch(genreFilterAdded(filterText)) : dispatch(countryFilterAdded(filterText));

        //router.push('/movies', `/movies/`, { shallow: true });
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
