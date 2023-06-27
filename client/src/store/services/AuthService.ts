import { AxiosResponse } from 'axios';
import axios from 'axios';

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse> {
        return axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`, { email, password });
    }

    static async registration(email: string, password: string): Promise<AxiosResponse> {
        return axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/registration`, { email, password });
    }

    static async validateEmail(accessToken: string, refreshToken: string): Promise<AxiosResponse> {
        return axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/validate/email`, { accessToken, refreshToken });
    }
    static async validateVk(accessToken: string, refreshToken: string): Promise<AxiosResponse> {
        return axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/validate/vk`, { accessToken, refreshToken });
    }
    static async validateGoogle(accessToken: string, refreshToken: string): Promise<AxiosResponse> {
        return axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/validate/google`, { accessToken, refreshToken });
    }

    static async getEmailRefreshToken(accessToken: string): Promise<AxiosResponse> {
        return axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/getAccesByRefreshEmail`, { accessToken });
    }
    static async getVkRefreshToken(accessToken: string): Promise<AxiosResponse> {
        return axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/getAccesByRefreshVK`, { accessToken });
    }

    static async getGoogleRefreshToken(accessToken: string): Promise<AxiosResponse> {
        return axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/getAccesByRefreshGoogle`, { accessToken });
    }

    static async loginGoogle(email: string, id: string): Promise<AxiosResponse> {
        return axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/google`, { email, id });
    }

    static async loginVK(name: string, id: string): Promise<AxiosResponse> {
        return axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/vk`, { name, id });
    }

    static async logout(): Promise<void> {
        return axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`);
    }

    static async creatingAdminsAndRoles(): Promise<void> {
        return axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/createAdmin`);
    }
}
