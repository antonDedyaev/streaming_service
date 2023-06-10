import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UserState {
    user: IUser;
    isAuth: boolean;
    authorizationType: 'mail' | 'vk' | 'google';
    error: string;
}

const initialState: UserState = {
    user: {} as IUser,
    isAuth: false,
    authorizationType: 'mail',
    error: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload;
        },

        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
            state.error = '';
        },

        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
        setAuthorizationType(state, action: PayloadAction<'mail' | 'vk' | 'google'>) {
            state.authorizationType = action.payload;
        },
    },
});

export default userSlice.reducer;
