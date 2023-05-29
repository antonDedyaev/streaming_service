import ICountry from '@/models/ICountry';
import IGenre from '@/models/IGenre';
import IPerson from '@/models/IPerson';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface immutableObjState {
    geners: IGenre[];
    countries: ICountry[];
    actors: IPerson[];
    directors: IPerson[];
}

const initialState: immutableObjState = {
    geners: [],
    countries: [],
    actors: [],
    directors: [],
};

export const immutableObjSlice = createSlice({
    name: 'immutableObj',
    initialState,
    reducers: {
        setGeners(state, action: PayloadAction<IGenre[]>) {
            state.geners = action.payload;
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

export default immutableObjSlice.reducer;
