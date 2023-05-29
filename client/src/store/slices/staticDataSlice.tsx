import ICountry from '@/models/ICountry';
import IGenre from '@/models/IGenre';
import IPerson from '@/models/IPerson';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface staticDataState {
    genres: IGenre[];
    countries: ICountry[];
    actors: IPerson[];
    directors: IPerson[];
}

const initialState: staticDataState = {
    genres: [],
    countries: [],
    actors: [],
    directors: [],
};

export const staticDataSlice = createSlice({
    name: 'staticData',
    initialState,
    reducers: {
        setGenres(state, action: PayloadAction<IGenre[]>) {
            state.genres = action.payload;
        },
        setCountries(state, action: PayloadAction<ICountry[]>) {
            state.countries = action.payload;
        },
        setActors(state, action: PayloadAction<IPerson[]>) {
            state.actors = action.payload;
        },
        setDirectors(state, action: PayloadAction<IPerson[]>) {
            state.directors = action.payload;
        },
    },
});

export default staticDataSlice.reducer;
