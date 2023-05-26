import { useEffect, useState } from 'react';
import styles from './FilterSearch.module.scss';
import Autosuggest from 'react-autosuggest';
import axios, { AxiosResponse } from 'axios';
import theme from './theme.module.scss';
import { useTranslation } from 'next-i18next';
import IPerson from '../../models/IPerson';

interface ISearch {
    searchBy: string;
}

const FilterSearch = ({ searchBy }: ISearch) => {
    const { t } = useTranslation('moviesPage');
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [searchedPerson, setSearchedPerson] = useState('');

    const searchParam = searchBy === 'Режиссер' ? t('filterPanel.searchByDirector') : t('filterPanel.searchByActor');

    useEffect(() => {}, [searchedPerson]);

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
            <div className={styles.container__formContent}>
                <div className={styles.container__inputBody}>
                    <Autosuggest
                        theme={theme}
                        inputProps={{
                            placeholder: searchParam,
                            name: 'person',
                            id: searchBy.toLowerCase(),
                            value: inputValue,
                            onChange: (_event, { newValue }) => {
                                setInputValue(newValue);
                            },
                        }}
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={async ({ value }) => {
                            if (!value) {
                                setSuggestions([]);
                                return;
                            }
                            try {
                                const query = searchBy === 'Актер' ? 'actors' : 'directors';
                                const result = await axios.get(`http://localhost:3000/persons/${query}`);
                                const names: string[] = result.data
                                    .map((person: IPerson) => person.name)
                                    .filter((person: string[]) => person && person.includes(inputValue));
                                setSuggestions(names);
                            } catch (error) {
                                console.log(error);
                            }
                        }}
                        onSuggestionsClearRequested={() => {
                            setSuggestions([]);
                        }}
                        getSuggestionValue={(suggestion) => suggestion}
                        renderSuggestion={(suggestion) => <div>{suggestion}</div>}
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
                </div>
            </div>
        </form>
    );
};

export default FilterSearch;
