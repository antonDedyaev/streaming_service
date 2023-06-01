import Image from 'next/image';
import styles from './FilterRange.module.scss';
import { useEffect, useState } from 'react';
import greaterThan from '../../../public/icons/greater-than.svg';
import { useTranslation } from 'next-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { checkFiltersStatus } from '../../utils/functions';
import axios from 'axios';
import { addFilteredMovies, ratingFilterAdded, votesFilterAdded } from '../../store/slices/moviesSlice';
import IMovies from '@/models/IMovies';
import IGenre from '@/models/IGenre';
import ICountry from '@/models/ICountry';
interface IRating {
    category: 'ratingKp' | 'votesKp';
    image: string;
    limit: number;
    step: number;
}

interface IFiltered {
    film: IMovies;
    genres: IGenre[];
    countries: ICountry[];
}

const FilterRange = ({ category, image, limit, step }: IRating) => {
    const { t } = useTranslation('moviesPage');
    const dispatch = useAppDispatch();
    const [ratingValue, setRatingValue] = useState(0);
    const allFilters = useAppSelector((state) => state.movies.filters);
    const joinedQuery = `votesKp=${allFilters.votesKp}&ratingKp=${allFilters.ratingKp}`;

    useEffect(() => {
        category === 'ratingKp' ? dispatch(ratingFilterAdded(ratingValue)) : dispatch(votesFilterAdded(ratingValue));
    }, [ratingValue]);

    useEffect(() => {
        const fetchRating = async () => {
            try {
                const response = await axios.get(`http://localhost:6125/movies?${joinedQuery}&limit=1000`);
                dispatch(addFilteredMovies(response.data.docs[0].page));
            } catch (err) {
                console.log(err);
            }
        };
        ratingValue !== 0 && fetchRating();
    }, [ratingValue]);

    useEffect(() => {
        if (checkFiltersStatus(allFilters)) {
            setRatingValue(0);
        }
    }, [allFilters]);
    return (
        <div className={styles.container}>
            <div className={styles.container__ratingContent}>
                <div
                    className={[
                        styles.container__ratingValue,
                        ratingValue === 0 || ratingValue === limit ? styles.container__ratingValue_notSelected : null,
                    ].join(' ')}
                >
                    <Image src={image} height={26} width={26} alt="Рейтинг" />
                    <Image src={greaterThan} height={18} width={18} alt="Знак больше" />
                    <span>{ratingValue === 0 ? t('filterPanel.notSelected') : ratingValue.toLocaleString()}</span>
                </div>
                <div>
                    <input
                        type="range"
                        max={limit}
                        value={ratingValue}
                        step={step}
                        onChange={(e) => setRatingValue(e.target.valueAsNumber)}
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterRange;
