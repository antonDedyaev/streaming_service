import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import IMovies from '@/models/IMovies';
import IGenre from '@/models/IGenre';
import ICountry from '@/models/ICountry';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
    const response = await axios.get('http://localhost:6125/filmswithinfo');
    return response.data;
});

export const fetchCountries = createAsyncThunk('movies/fetchCountries', async () => {
    const response = await axios.get('http://localhost:6125/namesOfCountries');
    return response.data;
});

export const fetchGenres = createAsyncThunk('movies/fetchGenres', async () => {
    const response = await axios.get('http://localhost:6125/namesgenres');
    return response.data;
});

export interface IFilters {
    genres: string[];
    countries: string[];
    ratingKp: number;
    votesKp: number;
    director: string;
    actor: string;
}

interface IMoviesState {
    movies: IMovies[];
    genres: IGenre[];
    countries: ICountry[];
    filtersApplied: boolean;
    filters: IFilters;
    filteredMovies: IMovies[];
}

const initialState: IMoviesState = {
    movies: [],
    genres: [],
    countries: [],
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
    extraReducers: (builder) => {
        builder
            // .addCase(fetchMovies.pending, (state) => {
            //     console.log('pending');
            // })
            .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<IMovies[]>) => {
                state.movies = action.payload;
            })
            .addCase(fetchCountries.fulfilled, (state, action: PayloadAction<ICountry[]>) => {
                state.countries = action.payload;
            })
            .addCase(fetchGenres.fulfilled, (state, action: PayloadAction<IGenre[]>) => {
                state.genres = action.payload;
            });
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
