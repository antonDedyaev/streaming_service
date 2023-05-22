import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import IPerson from '@/models/IPerson';

export const fetchActors = createAsyncThunk('movies/fetchActors', async () => {
    const response = await axios.get('http://localhost:6125/personswithinfo');
    return response.data;
});

interface IActorsState {
    actors: IPerson[];
}

const initialState: IActorsState = {
    actors: [],
};

const actorsSlice = createSlice({
    name: 'actors',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchActors.pending, (state) => {
                console.log('pending');
            })
            .addCase(fetchActors.fulfilled, (state, action: PayloadAction<any[]>) => {
                const actors = action.payload.map((item) => {
                    const { id, name, enName, photo } = item.person;
                    const { profession, enProfession } = item.movies[0];
                    return {
                        id: id,
                        name: name,
                        enName: enName,
                        photo: photo,
                        profession,
                        enProfession,
                        movies: item.movies,
                    };
                });
                state.actors = actors;
            });
    },
});

export default actorsSlice.reducer;
