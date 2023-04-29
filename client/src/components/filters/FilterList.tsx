import styles from './FilterList.module.scss';

interface IList {
    items: string[];
}

const FilterList = ({ items }: IList) => {
    return (
        <div className={styles.container}>
            <ul className={styles.container__list}>
                {items.map((item) => (
                    <li className={styles.container__listItem}>
                        <label className={styles.container__itemLabel}>
                            <input className={styles.container__itemInput} type="checkbox" name="list-items" />
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
