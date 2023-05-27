import Image from 'next/image';
import styles from './FilterRange.module.scss';
import { useEffect, useState } from 'react';
import greaterThan from '../../../public/icons/greater-than.svg';
import { useTranslation } from 'next-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { checkFiltersStatus } from '@/utils/functions';
import axios from 'axios';
import { addFilteredMovies } from '@/store/slices/moviesSlice';

interface IRating {
    category: 'ratingKp' | 'votesKp';
    image: string;
    limit: number;
    step: number;
}

const FilterRange = ({ category, image, limit, step }: IRating) => {
    const { t } = useTranslation('moviesPage');
    const dispatch = useAppDispatch();
    const [ratingValue, setRatingValue] = useState(0);

    const filters = useAppSelector((state) => state.movies.filters);

    useEffect(() => {
        const fetchRating = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/films?${category}=${ratingValue}`);
                dispatch(addFilteredMovies(response.data));
            } catch (err) {
                console.log(err);
            }
        };
        ratingValue !== 0 && fetchRating();
    }, [ratingValue]);

    useEffect(() => {
        if (checkFiltersStatus(filters)) {
            setRatingValue(0);
        }
    }, [filters]);
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
