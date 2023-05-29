import { immutableObjSlice } from './slices/immutableObjSlice';
import { AppDispatch } from './store';
import axios from 'axios';

export const fetchGenres = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get('http://localhost:6125/namesgenres');
        dispatch(immutableObjSlice.actions.setGeners(response.data));
    } catch (e: any) {
        console.log(e.response?.data?.message);
    }
};

export const fetchCountries = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get('http://localhost:6125/namesOfCountries');
        dispatch(immutableObjSlice.actions.setCountries(response.data));
    } catch (e: any) {
        console.log(e.response?.data?.message);
    }
};

export const fetchActors = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get('http://localhost:6125/getAllActors');
        dispatch(immutableObjSlice.actions.setActors(response.data));
    } catch (e: any) {
        console.log(e.response?.data?.message);
    }
};

export const fetchDirectors = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get('http://localhost:6125/getAllDirectors');
        dispatch(immutableObjSlice.actions.setDirectors(response.data));
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
