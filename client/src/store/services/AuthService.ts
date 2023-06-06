import { AxiosResponse } from 'axios';
import axios from 'axios';

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse> {
        return axios.post('http://localhost:6125/auth/login', { email, password });
    }

    static async loginGoogle(): Promise<AxiosResponse> {
        return axios.post('http://localhost:6125/auth/google/redirect');
    }

    static async logout(): Promise<void> {
        return axios.post('http://localhost:6125/auth/logout');
    }
}
