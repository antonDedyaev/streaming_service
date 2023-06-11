import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {Observable} from "rxjs";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "./roles-auth.decorator";
import { AuthService } from "./auth.service";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector,
        private authService: AuthService) {
    }

    async canActivate(context: ExecutionContext) {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ])
            if (!requiredRoles) {
                return true;
            }
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            let data;

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'Пользователь не авторизован'})
            }

            const { refreshToken } = req.cookies;

            if(req.cookies.authenticationType == 'google') {
                 data = await this.authService.validateGoogleToken({accessToken: token, refreshToken: refreshToken});
                req.user = {id: data.user.id, user: data.user.email, roles: data.user.roles};
            } else if(req.cookies.authenticationType == 'email') {
                data = await this.authService.validateEmailToken({refreshToken: refreshToken, accessToken: token});
                req.user = {id: data.user.id, user: data.user.email};
            } else if(req.cookies.authenticationType == 'vk') {
                data = await this.authService.validateVkToken({refreshToken: refreshToken, accessToken: token});
                req.user =  {user: data.user.name, id: data.user.id}
            }
            
            return data.user.roles.some((role: { value: string; }) => requiredRoles.includes(role.value));
        } catch (e) {
            console.log(e);
            throw new HttpException( 'Нет доступа', HttpStatus.FORBIDDEN)
        }
    }

}