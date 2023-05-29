import { useEffect, useState } from 'react';
import styles from './FilterSearch.module.scss';
import Autosuggest from 'react-autosuggest';
import axios, { AxiosResponse } from 'axios';
import theme from './theme.module.scss';
import { useTranslation } from 'next-i18next';
import IPerson from '../../models/IPerson';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { addFilteredMovies } from '@/store/slices/moviesSlice';

interface ISearch {
    category: 'director' | 'actor';
    //searchBy: string;
}

const FilterSearch = ({ category }: ISearch) => {
    const { t } = useTranslation('moviesPage');
    const dispatch = useAppDispatch();
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [searchedPerson, setSearchedPerson] = useState('');

    const searchParam = category === 'director' ? t('filterPanel.searchByDirector') : t('filterPanel.searchByActor');

    const actors = useAppSelector((state) => state.actors.actors);

    const handleEnterPressed = ({ target, key }: KeyboardEvent): void => {
        const searchInput = target as HTMLInputElement;
        if (key === 'Enter') {
            setSearchedPerson(searchInput!.value);
        }
    };

    useEffect(() => {
        const fetchActorMovies = async () => {
            try {
                const response = await axios.get(`http://localhost:6125/movies?actor=${searchedPerson}`);
                console.log('actorMovies:', response.data.docs[0].page);
                //     const names: string[] = result.data
                //         .map((person: IPerson) => person.name)
                //         .filter((person: string[]) => person && person.includes(inputValue));
                dispatch(addFilteredMovies(response.data.docs[0].page));
            } catch (err) {
                console.log(err);
            }
        };
        fetchActorMovies();
    }, [searchedPerson]);

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
                        const names: string[] = actors
                            .map((person: IPerson) => person.name)
                            .filter((person: string) => person && person.includes(inputValue));
                        setSuggestions(names);
                        // try {
                        //     const query = searchBy === 'Актер' ? 'getAllActors' : 'getAllDirectors';
                        //     const result = await axios.get(`http://localhost:6125/${query}`);
                        //     const names: string[] = result.data
                        //         .map((person: IPerson) => person.name)
                        //         .filter((person: string[]) => person && person.includes(inputValue));
                        //     setSuggestions(names);
                        // } catch (error) {
                        //     console.log(error);
                        // }
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
