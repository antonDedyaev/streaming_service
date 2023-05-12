import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ILoginData } from '../models/ILoginData';

export const loginAPI = createApi({
    reducerPath: 'loginAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    endpoints: (build) => ({
        fetchLogin: build.mutation<{ token: string }, ILoginData>({
            query: (loginData) => ({
                url: '/auth/login',
                method: 'POST',
                body: loginData,
            }),
        }),
        fetchRegistration: build.mutation<{ token: string }, ILoginData>({
            query: (loginData) => ({
                url: '/auth/registration',
                method: 'POST',
                body: loginData,
            }),
        }),
        fetchAuthWithVK: build.query<{ token: string }, null>({
            query: () => ({
                url: '/vkontakte',
            }),
        }),
        fetchAuthWithGoogle: build.query<{ token: string }, null>({
            query: () => ({
                url: '/google',
            }),
        }),
    }),
});
