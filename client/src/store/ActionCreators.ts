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

        console.log(response.data);

        localStorage.setItem('token', `Bearer ${response.data}`);
        dispatch(userSlice.actions.setAuth(true));
        /* dispatch(userSlice.actions.setUser(response.data.user));*/
    } catch (e: any) {
        console.log(e.response?.data?.message);

        dispatch(userSlice.actions.setError(e.response?.data?.message));
    }
};
