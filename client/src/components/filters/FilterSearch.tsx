import { useEffect, useState } from 'react';
import styles from './FilterSearch.module.scss';

interface ISearch {
    searchBy: string;
}

const FilterSearch = ({ searchBy }: ISearch) => {
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        const input = document.getElementById(searchBy);

        const handleSubmit = (e: KeyboardEvent) => {
            if (inputValue !== '' && e.key === 'Enter') {
                e.preventDefault();
                setInputValue('');
            }
        };
        input?.addEventListener('keypress', handleSubmit);

        return () => input?.removeEventListener('keypress', handleSubmit);
    });

    return (
        <form autoComplete="off" className={styles.container}>
            <div
                className={[
                    styles.container__formContent,
                    isFocused ? styles.container__formContent_focused : null,
                ].join(' ')}
            >
                <div className={styles.container__inputBody}>
                    <input
                        id={searchBy}
                        className={styles.container__inputField}
                        type="text"
                        value={inputValue}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <div className={styles.container__fieldButton}>
                        <div
                            className={[
                                styles.container__buttonIcon,
                                inputValue === ''
                                    ? styles.container__buttonIcon_search
                                    : styles.container__buttonIcon_remove,
                            ].join(' ')}
                            onClick={() => setInputValue('')}
                        ></div>
                    </div>
                    <div className={styles.container__placeholder}>{searchBy}</div>
                </div>
            </div>
        </form>
    );
};

export default FilterSearch;
