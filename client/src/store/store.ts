import { combineReducers, configureStore } from '@reduxjs/toolkit';
import moviesSliceReducer from './slices/moviesSlice';
import staticDataSliceReducer from './slices/staticDataSlice';
import userSliceReducer from './slices/userSlice';
import commentsSlice from './slices/commentsSlice';

const rootReducer = combineReducers({
    movies: moviesSliceReducer,
    staticData: staticDataSliceReducer,
    user: userSliceReducer,
    comments: commentsSlice,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
