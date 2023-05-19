import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import IMovies from '@/models/IMovies';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
    const response = await axios.get('http://localhost:6125/filmswithinfo');
    return response.data;
});

interface IFilters {
    genres: string[];
    countries: string[];
    rating: number;
    userRates: number;
    director: string;
    actor: string;
}

interface IMoviesState {
    movies: IMovies[];
    filters: IFilters;
}

const initialState: IMoviesState = {
    movies: [],
    filters: {
        genres: [],
        countries: [],
        rating: 0,
        userRates: 0,
        director: '',
        actor: '',
    },
};

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                console.log('pending');
            })
            .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<any[]>) => {
                const moviesInfo = action.payload.map((item) => {
                    const {
                        id,
                        name,
                        alternativeName,
                        posterpreviewUrl,
                        premiererussia,
                        hasImax,
                        year,
                        ageRating,
                        ratingkp,
                        voteskp,
                        movieLength,
                    } = item.film;
                    return {
                        id,
                        name,
                        enName: alternativeName,
                        posterpreviewUrl: posterpreviewUrl,
                        premiereRussia: premiererussia,
                        hasImax,
                        year,
                        ageRating,
                        ratingKp: ratingkp,
                        votesKp: voteskp,
                        movieLength,
                        genres: item.genres,
                        countries: item.countries,
                    };
                });
                console.log('fullfilled');
                state.movies = moviesInfo;
            });
    },
});

export default moviesSlice.reducer;
