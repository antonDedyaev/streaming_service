import IUser from '@/models/IUser';
import { mockAdmin } from '@/pages/api/mocks/mockAdmin';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UserState {
    user: IUser;
    isAuth: boolean;
    error: string;
}

const initialState: UserState = {
    user: mockAdmin,
    isAuth: true,
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
    },
});

export default userSlice.reducer;
