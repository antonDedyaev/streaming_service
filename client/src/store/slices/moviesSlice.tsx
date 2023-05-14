import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import IMovie from '@/models/IMovie';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
    const response = await axios.get('http://localhost:6125/filmswithinfo');
    console.log('successfull');
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
    movies: IMovie[];
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
            .addCase(fetchMovies.fulfilled, (state, action) => {
                const complete = action.payload.map((item) => {
                    return { ...item.film, genres: item.genres, countries: item.countries };
                });
                console.log('fullfilled');
                state.movies = complete;
            });
    },
});

export default moviesSlice.reducer;
