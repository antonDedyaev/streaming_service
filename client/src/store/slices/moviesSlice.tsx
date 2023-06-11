import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IMovies from '@/models/IMovies';
import IFilters from '@/models/IFilters';

interface IMoviesState {
    movies: IMovies[];
    filtersApplied: boolean;
    filters: IFilters;
    filteredMovies: IMovies[];
}

const initialState: IMoviesState = {
    movies: [],
    filtersApplied: false,
    filters: {
        genres: [],
        countries: [],
        ratingKp: 0,
        votesKp: 0,
        director: '',
        actor: '',
    },
    filteredMovies: [],
};

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        addFilteredMovies: (state, action: PayloadAction<IMovies[]>) => {
            state.filteredMovies = action.payload;
        },
        genresFilterAdded: (state, action) => {
            const indexOfItem = state.filters.genres.indexOf(action.payload);
            indexOfItem < 0 ? state.filters.genres.push(action.payload) : state.filters.genres.splice(indexOfItem, 1);
        },
        countriesFilterAdded: (state, action) => {
            const indexOfItem = state.filters.countries.indexOf(action.payload);
            indexOfItem < 0
                ? state.filters.countries.push(action.payload)
                : state.filters.countries.splice(indexOfItem, 1);
        },
        votesFilterAdded: (state, action: PayloadAction<number>) => {
            state.filters.votesKp = action.payload;
        },
        ratingFilterAdded: (state, action: PayloadAction<number>) => {
            state.filters.ratingKp = action.payload;
        },
        actorFilterAdded: (state, action: PayloadAction<string>) => {
            state.filters.actor = action.payload;
        },
        directorFilterAdded: (state, action: PayloadAction<string>) => {
            state.filters.director = action.payload;
        },
        filtersRemoved: (state, action) => {
            state.filters = action.payload;
        },
    },
});

export const {
    addFilteredMovies,
    genresFilterAdded,
    countriesFilterAdded,
    ratingFilterAdded,
    votesFilterAdded,
    actorFilterAdded,
    directorFilterAdded,
    filtersRemoved,
} = moviesSlice.actions;

export default moviesSlice.reducer;
