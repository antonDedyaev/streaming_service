import styles from './FilterList.module.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { genresFilterAdded, countriesFilterAdded, addFilteredMovies } from '../../store/slices/moviesSlice';
import axios from 'axios';
import { checkFiltersStatus } from '@/utils/functions';
import IMovies from '@/models/IMovies';
import IGenre from '@/models/IGenre';
import ICountry from '@/models/ICountry';

interface IList {
    items: string[];
    category: 'genres' | 'countries';
}

interface IFiltered {
    film: IMovies;
    genres: IGenre[];
    countries: ICountry[];
}

const FilterList = ({ items, category }: IList) => {
    const dispatch = useAppDispatch();
    const allFilters = useAppSelector((state) => state.movies.filters);
    const genres = allFilters.genres.map((genre) => `genres=${genre}`);
    const countries = allFilters.countries.map((country) => `countries=${country}`);
    const joinedQuery = [...genres, ...countries].join('&');

    const listFilter = useAppSelector((state) => state.movies.filters[category]);

    useEffect(() => {
        const sendFilters = async () => {
            try {
                const response = await axios.get(`http://localhost:6125/movies?${joinedQuery}&limit=500`);
                //console.log('listFilters:', response.data.docs[0].page);
                // const prepared = response.data.docs[0].page.map((movie: IMovies[]) => {
                //     return { ...film, genres, countries };
                // });
                dispatch(addFilteredMovies(joinedQuery !== '' ? response.data.docs[0].page : []));
            } catch (err) {
                console.log(err);
            }
        };
        sendFilters();

        if (checkFiltersStatus(allFilters)) {
            const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach((checkbox) => (checkbox.checked = false));
            dispatch(addFilteredMovies([]));
        }
    }, [listFilter]);

    const handleCheckboxSelected = async ({ currentTarget }: React.MouseEvent<HTMLInputElement>) => {
        const filterText = currentTarget?.nextElementSibling?.textContent;
        category === 'genres' ? dispatch(genresFilterAdded(filterText)) : dispatch(countriesFilterAdded(filterText));
    };

    return (
        <div className={styles.container}>
            <ul className={styles.container__list}>
                {items.map((item, index) => (
                    <li className={styles.container__listItem} key={index}>
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
