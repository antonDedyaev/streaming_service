import IComment from '@/models/IComment';
import AuthService from './services/AuthService';
import { commentsSlice } from './slices/commentsSlice';
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

        localStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
        localStorage.setItem('currentUser', JSON.stringify(obj));
        localStorage.setItem('authorization', 'mail');
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

        localStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
        localStorage.setItem('currentUser', JSON.stringify(obj));
        localStorage.setItem('authorization', 'mail');
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

export const getRefreshToken = async (accessToken: string, authorization: string) => {
    const getRefreshFunc = (authorization: string) => {
        switch (authorization) {
            case 'mail':
                return AuthService.getEmailRefreshToken(accessToken.split(' ')[1]);
            case 'vk':
                return AuthService.getVkRefreshToken(accessToken.split(' ')[1]);
            case 'google':
                return AuthService.getGoogleRefreshToken(accessToken.split(' ')[1]);
            default:
                break;
        }
    };
    try {
        const response = await getRefreshFunc(authorization);
        return response?.data;
    } catch (e: any) {
        console.log(e.response?.data?.message);
    }
};

export const validateUser =
    (accessToken: string, refreshToken: string, authorization: string) => async (dispatch: AppDispatch) => {
        const getValidationFunc = (authorization: string) => {
            switch (authorization) {
                case 'mail':
                    return AuthService.validateEmail(accessToken.split(' ')[1], refreshToken);
                case 'vk':
                    return AuthService.validateVk(accessToken.split(' ')[1], refreshToken);
                case 'google':
                    return AuthService.validateGoogle(accessToken.split(' ')[1], refreshToken);
                default:
                    break;
            }
        };

        try {
            const response = await getValidationFunc(authorization);

            const obj = {
                user: authorization === 'vk' ? response?.data.name : response?.data.email,
                role: response?.data.roles[0].value,
            };

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('currentUser', JSON.stringify(obj));
            localStorage.setItem('authorization', authorization);
            dispatch(userSlice.actions.setAuth(true));
            dispatch(
                userSlice.actions.setUser({
                    user: authorization === 'vk' ? response?.data.name : response?.data.email,
                    token: accessToken.split(' ')[1],
                    role: response?.data.roles[0].value,
                }),
            );
        } catch (e: any) {
            console.log(e.response?.data?.message);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('currentUser');
            localStorage.removeItem('authorization');
            dispatch(userSlice.actions.setError(e.response?.data?.message));
        }
    };

export const loginGoogle = (email: string, id: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await AuthService.loginGoogle(email, id);
        console.log('data', response.data);

        const obj = {
            user: response.data.user,
            role: response.data.roles[0].value,
        };

        localStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
        localStorage.setItem('currentUser', JSON.stringify(obj));
        localStorage.setItem('authorization', 'google');
        dispatch(userSlice.actions.setAuth(true));
        dispatch(
            userSlice.actions.setUser({
                user: response.data.email,
                token: response.data.accessToken,
                role: response.data.roles[0].value,
            }),
        );
    } catch (e: any) {
        dispatch(userSlice.actions.setError(e.response?.data?.message));
    }
};

export const loginVK = (name: string, id: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await AuthService.loginVK(name, id);

        const obj = {
            user: response.data.user,
            role: response.data.roles[0].value,
        };

        localStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
        localStorage.setItem('currentUser', JSON.stringify(obj));
        localStorage.setItem('authorization', 'vk');
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

export const logout = () => async (dispatch: AppDispatch) => {
    try {
        await AuthService.logout();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authorization');
        dispatch(userSlice.actions.setAuth(false));
        dispatch(userSlice.actions.setUser({} as IUser));
    } catch (e: any) {
        dispatch(userSlice.actions.setError(e.response?.data?.message));
    }
};

export const getDataFromLocalStorage = () => async (dispatch: AppDispatch) => {
    if (localStorage.getItem('accessToken') && localStorage.getItem('currentUser')) {
        const data = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const token = (localStorage.getItem('accessToken') || '').split(' ');

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

export const setComments = (comments: IComment[]) => (dispatch: AppDispatch) => {
    dispatch(commentsSlice.actions.setComments(comments));
};

export const addNewComment =
    (comment: { text: string; movieid: number; user: string }) => async (dispatch: AppDispatch) => {
        const token = localStorage.getItem('accessToken');

        try {
            const response = await axios.post('http://localhost:6125/comment/film', comment, {
                headers: {
                    Authorization: token,
                },
            });

            dispatch(
                commentsSlice.actions.addNewComment({
                    ...response.data,
                    childComment: [],
                }),
            );
        } catch (err) {
            console.log(err);
        }
    };

export const addChildComment =
    (comment: { text: string; movieid: number; parentId: number; user: string }) => async (dispatch: AppDispatch) => {
        const token = localStorage.getItem('accessToken');

        try {
            const response = await axios.post('http://localhost:6125/comment/childComment', comment, {
                headers: {
                    Authorization: token,
                },
            });

            dispatch(
                commentsSlice.actions.addChildComment({
                    ...response.data,
                    parentId: response.data.parentId[0],
                }),
            );
        } catch (err) {
            console.log(err);
        }
    };
