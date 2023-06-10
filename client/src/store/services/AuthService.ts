import { AxiosResponse } from 'axios';
import axios from 'axios';

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse> {
        return axios.post('http://localhost:6125/auth/login', { email, password });
    }

    static async registration(email: string, password: string): Promise<AxiosResponse> {
        return axios.post('http://localhost:6125/auth/registration', { email, password });
    }

    static async validateEmail(accessToken: string, refreshToken: string): Promise<AxiosResponse> {
        return axios.post('http://localhost:6125/validate/email', { accessToken, refreshToken });
    }
    static async validateVk(accessToken: string, refreshToken: string): Promise<AxiosResponse> {
        return axios.post('http://localhost:6125/validate/vk', { accessToken, refreshToken });
    }
    static async validateGoogle(accessToken: string, refreshToken: string): Promise<AxiosResponse> {
        return axios.post('http://localhost:6125/validate/google', { accessToken, refreshToken });
    }

    static async getEmailRefreshToken(accessToken: string): Promise<AxiosResponse> {
        return axios.post('http://localhost:6125/getAccesByRefreshEmail', { accessToken });
    }
    static async getVkRefreshToken(accessToken: string): Promise<AxiosResponse> {
        return axios.post('http://localhost:6125/getAccesByRefreshVK', { accessToken });
    }

    static async getGoogleRefreshToken(accessToken: string): Promise<AxiosResponse> {
        return axios.post('http://localhost:6125/getAccesByRefreshGoogle', { accessToken });
    }

    static async loginGoogle(email: string, id: string): Promise<AxiosResponse> {
        return axios.post('http://localhost:6125/auth/google', { email, id });
    }

    static async loginVK(name: string, id: string): Promise<AxiosResponse> {
        return axios.post('http://localhost:6125/auth/vk', { name, id });
    }

    static async logout(): Promise<void> {
        return axios.post('http://localhost:6125/auth/logout');
    }

    static async creatingAdminsAndRoles(): Promise<void> {
        return axios.post('http://localhost:6125/createAdmin');
    }
}
