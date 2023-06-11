import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import * as dotenv from 'dotenv';
import { Request } from 'express';
import { AuthService } from "../auth.service";


dotenv.config();

@Injectable()
export class CommentsMiddleware implements NestMiddleware {
    constructor(private authService: AuthService) {}

    async use(req, res, next) {
        try {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
                return next(new UnauthorizedException());
            }
            const accessToken = authorizationHeader.split(' ')[1];
            if (!accessToken) {   
                return next(new UnauthorizedException());
            }

            const { refreshToken } = req.cookies;

            if(req.cookies.authenticationType == 'google') {
                const data = await this.authService.validateGoogleToken({accessToken: accessToken, refreshToken: refreshToken});
                res.cookie('refreshToken', data.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
                req.headers.authorization = `Bearer ${data.access_token}`;
                req.user = {id: data.user.id, user: data.user.email, roles: data.user.roles};
            } else if(req.cookies.authenticationType == 'email') {
                const data = await this.authService.validateEmailToken({refreshToken: refreshToken, accessToken: accessToken});
                req.user = {id: data.user.id, user: data.user.email};
                req.headers.authorization = `Bearer ${data.accessToken}`;
                res.cookie('refreshToken', data.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            } else if(req.cookies.authenticationType == 'vk') {
                const data = await this.authService.validateVkToken({refreshToken: refreshToken, accessToken: accessToken});
                req.user =  {user: data.user.name, id: data.user.id}
                req.headers.authorization = `Bearer ${data.refreshToken}`;
                res.cookie('refreshToken', data.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            }
         
            next(); 
        } catch(e) {
            return next(new UnauthorizedException());
        }
    }
}