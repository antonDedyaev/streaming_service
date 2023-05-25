import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import IMovies from '@/models/IMovies';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
    const response = await axios.get('http://localhost:3000/api/films');
    return response.data;
});

interface IFilters {
    genres: string[];
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
            const moviesInfo = action.payload.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    enName: item.enName,
                    posterPreviewURL: item.posterPreviewURL,
                    premiereRussia: item.premiereRussia,
                    hasImax: item.hasImax,
                    year: item.year,
                    ageRating: item.ageRating,
                    ratingKp: item.ratingKp,
                    votesKp: item.votesKp,
                    movieLength: item.movieLength,
                    genres: item.genres,
                    countries: item.countries,
                };
            });
            state.filteredMovies = moviesInfo;
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
            .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<IMovies[]>) => {
                const moviesInfo = action.payload.map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                        enName: item.enName,
                        posterPreviewURL: item.posterPreviewURL,
                        premiereRussia: item.premiereRussia,
                        hasImax: item.hasImax,
                        year: item.year,
                        ageRating: item.ageRating,
                        ratingKp: item.ratingKp,
                        votesKp: item.votesKp,
                        movieLength: item.movieLength,
                        genres: item.genres,
                        countries: item.countries,
                    };
                });
                state.movies = moviesInfo;
            });
    },
});

export const {
    addFilteredMovies,
    genresFilterAdded,
    countriesFilterAdded,
    actorFilterAdded,
    directorFilterAdded,
    filtersRemoved,
} = moviesSlice.actions;

export default moviesSlice.reducer;
