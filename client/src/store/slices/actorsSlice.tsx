import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import IPerson from '@/models/IPerson';

export const fetchActors = createAsyncThunk('movies/fetchActors', async () => {
    const response = await axios.get('http://localhost:6125/getAllActors');
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
    reducers: {
        actorsAdded: (state, action: PayloadAction<IPerson[]>) => {
            state.actors = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchActors.pending, (state) => {
                console.log('pending');
            })
            .addCase(fetchActors.fulfilled, (state, action: PayloadAction<IPerson[]>) => {
                console.log('персоны', action.payload);
                const actors = action.payload.map((item) => {
                    const { id, name, enName, photo, profession, movies } = item;
                    return {
                        id,
                        name,
                        enName,
                        photo,
                        profession,
                        movies,
                    };
                });
                state.actors = action.payload;
            });
    },
});

export const { actorsAdded } = actorsSlice.actions;

export default actorsSlice.reducer;
