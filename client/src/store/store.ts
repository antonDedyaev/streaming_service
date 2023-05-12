import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { loginAPI } from './services/LoginService';

const rootReducer = combineReducers({
    [loginAPI.reducerPath]: loginAPI.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat(loginAPI.middleware);
        },
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
