import { AxiosResponse } from 'axios';
import axios from 'axios';

const $api = axios.create({
    withCredentials: true, //автоматическое прицепление куков
    baseURL: 'http://localhost:6125',
});

export default class AuthService {
    /*static async registration(
    email: string,
    password: string
  ): Promise<AxiosResponse<IUser>> {
    return 'http://localhost:6125'.post<AuthResponse>("/registration", {
      email,
      password,
      fullName,
    }); //для отправки запроса
  }*/

    static async login(email: string, password: string): Promise<AxiosResponse<IUser>> {
        return axios.post<IUser>('http://localhost:6125/auth/login', { email, password }); //для отправки запроса
    }

    /*static async logout(): Promise<void> {
    return $api.post("/logout"); //для отправки запроса
  }*/
}
