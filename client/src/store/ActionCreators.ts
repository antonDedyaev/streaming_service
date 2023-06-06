import AuthService from './services/AuthService';
import { staticDataSlice } from './slices/staticDataSlice';
import { userSlice } from './slices/userSlice';
import { AppDispatch } from './store';
import axios from 'axios';

export const fetchGenres = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get('http://localhost:6125/namesgenres');
        dispatch(staticDataSlice.actions.setGenres(response.data));
    } catch (e: any) {
        console.log(e.response?.data?.message);
    }
};

export const fetchCountries = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get('http://localhost:6125/namesOfCountries');
        dispatch(staticDataSlice.actions.setCountries(response.data));
    } catch (e: any) {
        console.log(e.response?.data?.message);
    }
};

export const fetchActors = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get('http://localhost:6125/getAllActors');
        dispatch(staticDataSlice.actions.setActors(response.data));
    } catch (e: any) {
        console.log(e.response?.data?.message);
    }
};

export const fetchDirectors = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get('http://localhost:6125/getAllDirectors');
        dispatch(staticDataSlice.actions.setDirectors(response.data));
    } catch (e: any) {
        console.log(e.response?.data?.message);
    }
};

export const getAllStaticData = () => async (dispatch: AppDispatch) => {
    dispatch(fetchGenres());
    dispatch(fetchCountries());
    dispatch(fetchActors());
    dispatch(fetchDirectors());
};

export const getGenresAndCountries = () => async (dispatch: AppDispatch) => {
    dispatch(fetchGenres());
    dispatch(fetchCountries());
};

export const getActorsAndDirectors = () => async (dispatch: AppDispatch) => {
    dispatch(fetchActors());
    dispatch(fetchDirectors());
};

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await AuthService.login(email, password);

        const obj = {
            user: response.data.email,
            role: response.data.roles[0].value,
        };

        localStorage.setItem('token', `Bearer ${response.data.accessToken}`);
        localStorage.setItem('currentUser', JSON.stringify(obj));
        dispatch(userSlice.actions.setAuth(true));
        dispatch(
            userSlice.actions.setUser({
                user: response.data.email,
                token: response.data.accessToken,
                role: response.data.roles[0].value,
            }),
        );
    } catch (e: any) {
        console.log(e.response?.data?.message);
        dispatch(userSlice.actions.setError(e.response?.data?.message));
    }
};

export const registration = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await AuthService.registration(email, password);
        const obj = {
            user: response.data.email,
            role: response.data.roles[0].value,
        };

        localStorage.setItem('token', `Bearer ${response.data.accessToken}`);
        localStorage.setItem('currentUser', JSON.stringify(obj));
        dispatch(userSlice.actions.setAuth(true));
        dispatch(
            userSlice.actions.setUser({
                user: response.data.email,
                token: response.data.accessToken,
                role: response.data.roles[0].value,
            }),
        );
    } catch (e: any) {
        console.log(e.response?.data?.message);
        dispatch(userSlice.actions.setError(e.response?.data?.message));
    }
};

export const loginGoogle = () => async (dispatch: AppDispatch) => {
    try {
        const response = await AuthService.loginGoogle();
        console.log(response);

        /* const obj = {
            user: response.data.email,
            role: response.data.roles[0].value,
        };

        localStorage.setItem('token', `Bearer ${response.data.accessToken}`);
        localStorage.setItem('currentUser', JSON.stringify(obj));
        dispatch(userSlice.actions.setAuth(true));
        dispatch(
            userSlice.actions.setUser({
                user: response.data.email,
                token: response.data.accessToken,
                role: response.data.roles[0].value,
            }),
        );*/
    } catch (e: any) {
        dispatch(userSlice.actions.setError(e.response?.data?.message));
    }
};

export const loginVK = () => async (dispatch: AppDispatch) => {
    try {
        const response = await AuthService.loginVK();
        console.log(response);

        /* const obj = {
            user: response.data.email,
            role: response.data.roles[0].value,
        };

        localStorage.setItem('token', `Bearer ${response.data.accessToken}`);
        localStorage.setItem('currentUser', JSON.stringify(obj));
        dispatch(userSlice.actions.setAuth(true));
        dispatch(
            userSlice.actions.setUser({
                user: response.data.email,
                token: response.data.accessToken,
                role: response.data.roles[0].value,
            }),
        );*/
    } catch (e: any) {
        console.log(e.response?.data?.message);
        dispatch(userSlice.actions.setError(e.response?.data?.message));
    }
};

export const logout = () => async (dispatch: AppDispatch) => {
    try {
        await AuthService.logout();
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        dispatch(userSlice.actions.setAuth(false));
        dispatch(userSlice.actions.setUser({} as IUser));
    } catch (e: any) {
        dispatch(userSlice.actions.setError(e.response?.data?.message));
    }
};

export const getDataFromLocalStorage = () => async (dispatch: AppDispatch) => {
    if (localStorage.getItem('token') && localStorage.getItem('currentUser')) {
        const data = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const token = (localStorage.getItem('token') || '').split(' ');

        dispatch(
            userSlice.actions.setUser({
                user: data.user,
                token: token[1],
                role: data.role,
            }),
        );
        dispatch(userSlice.actions.setAuth(true));
    }
};
