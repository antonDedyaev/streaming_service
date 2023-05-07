import Image from 'next/image';
import styles from './FilterRange.module.scss';
import { useState } from 'react';
import greaterThan from '../../../public/icons/greater-than.svg';

interface IRating {
    image: string;
    limit: number;
    step: number;
}

const FilterRange = ({ image, limit, step }: IRating) => {
    const [ratingValue, setRatingValue] = useState(0);

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
                    <span>{ratingValue === 0 ? 'не выбрано' : ratingValue.toLocaleString()}</span>
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
