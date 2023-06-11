import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { UserService } from "../user.service";
dotenv.config();

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private userService: UserService) {}
    async use(req, res, next) {
        try { 
            let tokens;
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
                return next(new UnauthorizedException());
            }
            const accessToken = authorizationHeader.split(' ')[1];
            if (!accessToken) {   
                return next(new UnauthorizedException());
            }

            const userData = await this.userService.validateAccessToken(accessToken);
            if(userData instanceof Error) {
                if(userData instanceof jwt.TokenExpiredError) {
                    const {refrershToken} = req.cookies;
                    tokens = await this.userService.refresh(refrershToken);
                    console.log('TOKENS HAS BEEN UPDATED');
                     
                    res.cookie('refrershToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
                    req.headers.authorization = tokens.accessToken;
                } else {
                    return next(new UnauthorizedException());
                }
            }

            req.user = await this.userService.validateAccessToken(tokens.accessToken);
            next();
        } catch(e) {

            return next(new UnauthorizedException());
        }
    }
}