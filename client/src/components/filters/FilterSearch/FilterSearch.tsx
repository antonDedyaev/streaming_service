import { useEffect, useState } from 'react';
import styles from './FilterSearch.module.scss';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import theme from '../theme.module.scss';
import { useTranslation } from 'next-i18next';
import IPerson from '../../../models/IPerson';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux';
import { actorFilterAdded, addFilteredMovies, directorFilterAdded } from '../../../store/slices/moviesSlice';
import { checkFiltersStatus } from '../../../utils/functions';

interface ISearch {
    suggestionsList: IPerson[];
    category: 'director' | 'actor';
}

const FilterSearch = ({ suggestionsList, category }: ISearch) => {
    const { t } = useTranslation('moviesPage');
    const dispatch = useAppDispatch();
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [searchedPerson, setSearchedPerson] = useState('');

    const personNames: string[] = [];
    suggestionsList.forEach((item) => {
        personNames.push(item.name);
        personNames.push(item.enName);
    });

    const allFilters = useAppSelector((state) => state.movies.filters);
    const joinedQuery = `actor=${allFilters.actor}&director=${allFilters.director}`;

    useEffect(() => {
        category === 'actor' ? dispatch(actorFilterAdded(inputValue)) : dispatch(directorFilterAdded(inputValue));
    }, [inputValue]);

    const searchParam = category === 'director' ? t('filterPanel.searchByDirector') : t('filterPanel.searchByActor');

    const handleEnterPressed = ({ target, key }: KeyboardEvent): void => {
        const searchInput = target as HTMLInputElement;
        if (key === 'Enter') {
            setSearchedPerson(searchInput!.value);
        }
    };

    useEffect(() => {
        const fetchActorMovies = async () => {
            if (searchedPerson.length === 0) {
                return;
            }
            try {
                const response = await axios.get(`http://localhost:6125/movies?${joinedQuery}`);
                dispatch(addFilteredMovies(response.data.docs[0].page));
            } catch (e: any) {
                console.log(e.response?.data?.message);
            }
        };
        fetchActorMovies();
    }, [searchedPerson]);

    useEffect(() => {
        if (checkFiltersStatus(allFilters)) {
            setSearchedPerson('');
        }
    }, [allFilters]);

    return (
        <div className={styles.container__formContent}>
            <div className={styles.container__inputBody} onKeyDown={handleEnterPressed as VoidFunction}>
                <Autosuggest
                    theme={theme}
                    inputProps={{
                        placeholder: searchParam,
                        name: 'person',
                        value: inputValue,
                        onChange: (_event, { newValue }) => {
                            setInputValue(newValue);
                        },
                    }}
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={({ value }) => {
                        if (!value) {
                            setSuggestions([]);
                            return;
                        }
                        const names: string[] = personNames.filter(
                            (person: string) => person && person.toLowerCase().includes(inputValue.toLowerCase()),
                        );
                        setSuggestions(names);
                    }}
                    onSuggestionsClearRequested={() => {
                        setSuggestions([]);
                    }}
                    onSuggestionSelected={(event, { suggestion, method }) => {
                        const target = event.target as HTMLInputElement;
                        if (method === 'enter') {
                            setSearchedPerson(target.value);
                        }
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
    );
};

export default FilterSearch;
