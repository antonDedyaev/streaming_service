import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import IMovies from '@/models/IMovies';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
    const response = await axios.get('http://localhost:6125/filmswithinfo');
    return response.data;
});

interface IFilters {
    genre: string[];
    countries: string[];
    ratingKp: number;
    votesKp: number;
    director: string;
    actor: string;
}

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
        genre: [],
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
        addFilteredMovies: (state, action: PayloadAction<any[]>) => {
            const moviesInfo = action.payload.map(({ film, countries, genres }) => {
                return {
                    id: film.id,
                    name: film.name,
                    enName: film.alternativeName,
                    posterpreviewUrl: film.posterpreviewUrl,
                    premiereRussia: film.premiererussia,
                    hasImax: film.hasImax,
                    year: film.year,
                    ageRating: film.ageRating,
                    ratingKp: film.ratingkp,
                    votesKp: film.voteskp,
                    movieLength: film.moviesLength,
                    genres,
                    countries,
                };
            });
            state.filteredMovies = moviesInfo;
        },
        genreFilterAdded: (state, action) => {
            const indexOfItem = state.filters.genre.indexOf(action.payload);
            indexOfItem < 0 ? state.filters.genre.push(action.payload) : state.filters.genre.splice(indexOfItem, 1);
        },
        countryFilterAdded: (state, action) => {
            const indexOfItem = state.filters.countries.indexOf(action.payload);
            indexOfItem < 0
                ? state.filters.countries.push(action.payload)
                : state.filters.countries.splice(indexOfItem, 1);
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
            .addCase(fetchMovies.pending, (state) => {
                console.log('pending');
            })
            .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<any[]>) => {
                const moviesInfo = action.payload.map(({ film, countries, genres }) => {
                    return {
                        id: film.id,
                        name: film.name,
                        enName: film.alternativeName,
                        posterpreviewUrl: film.posterpreviewUrl,
                        premiereRussia: film.premiererussia,
                        hasImax: film.hasImax,
                        year: film.year,
                        ageRating: film.ageRating,
                        ratingKp: film.ratingkp,
                        votesKp: film.voteskp,
                        movieLength: film.moviesLength,
                        genres,
                        countries,
                    };
                });
                state.movies = moviesInfo;
            });
    },
});

export const {
    addFilteredMovies,
    genreFilterAdded,
    countryFilterAdded,
    actorFilterAdded,
    directorFilterAdded,
    filtersRemoved,
} = moviesSlice.actions;

export default moviesSlice.reducer;
