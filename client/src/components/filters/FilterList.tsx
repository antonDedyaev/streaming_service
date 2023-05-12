import { useRouter } from 'next/router';
import styles from './FilterList.module.scss';
import { useRef } from 'react';

interface IList {
    items: string[];
}

const FilterList = ({ items }: IList) => {
    const router = useRouter();

    const handleCheckboxSelected = ({ currentTarget }: React.MouseEvent<HTMLInputElement>) => {
        console.log(currentTarget?.nextElementSibling);
        router.push('/movies', `/movies/`, { shallow: true });
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
