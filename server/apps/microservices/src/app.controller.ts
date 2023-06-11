import { Controller, Get,Inject,Post,Body, UseGuards, Put,Param ,Delete, Patch, Req,Query, Res, UseInterceptors } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { IsEmail, IsString } from 'class-validator';

import { FilteDto } from 'apps/films/src/dto/filtre.dto';
import { AuthService } from './auth.service';
import { CommentsService } from './comments.service';
import { CreateUserDto } from './dto/createuser.dto';
import { AddRoleDto } from './dto/addRole.dto';
import { Roles } from './roles-auth.decorator';
import { RolesGuard } from './roles.guard';
import { CreateGoogleUserDto } from './dto/googleUser.dto';
import { CreateVkUserDto } from './dto/createVkUser.dto';




@Controller()
export class AppController {
  constructor(
          private authService: AuthService,
          private commentService: CommentsService,
  @Inject('FILM_SERVICE') private rabbitFilmsService: ClientProxy,
  @Inject('PERSONS_SERVICE') private rabbitPersonsFilmsService: ClientProxy,
  @Inject('NAMESOFGENRES_SERVICE') private rabbitnamesofGenresService: ClientProxy,
  @Inject('COUNTRIESNAMES_SERVICE') private rabbitnamesofCountriesService: ClientProxy,
  @Inject('AUTH_SERVICE') private rabbitUserService: ClientProxy,
  @Inject('COMMENT_SERVICE') private client: ClientProxy,
  @Inject('AUTH_SERVICE') private authServiceRabbit: ClientProxy) {}



    
  
  
  @ApiOperation({summary: 'Сделать запрос к api на информацию о фильмах с сайта "Кинопоиск"'})
  @ApiTags('Данные с api kinopoisk')
  @Get('admin/films/parsing')
  async parsingFilms() {
    return await this.rabbitFilmsService.send({
      cmd: 'parser-films',
    },
    {});

  }





@ApiOperation({summary: 'Получить сохраненные данные о фильмах используя фильтры. Доступные поля {limit, type, page ,genres, countries, ratingKp, votesKp, director,actor, SortField,SortType}. Пример ввода :localhost:6125/movies?genres=драма&genres=фантастика'}) ////// Фильтр сортировка
@ApiTags('(Фильры) Данные с сайта kinopoisk')
@Get('movies')
async getFilmsUseFiltres(
  @Query() queryParams: any
) {
  return await this.rabbitFilmsService.send(
    {
      cmd: 'get-films-use-filtres',
    },
    {queryParams:queryParams},
  );
}
@ApiOperation({summary: 'Получить все сохраненные данные о фильмах'}) /////////////////////////////////////////////////////////////(Суммарные данные)//////////////////////
@ApiTags('(Суммарные данные) Данные с сайта kinopoisk')
@Get('filmswithinfo')
async getAllFilmsWithInfo() {
  return await this.rabbitFilmsService.send({
    cmd: 'get-all-films-with-info',
  },
  {});

}
@ApiOperation({summary: 'Получить все сохраненные данные о фильмах c IMAX'}) 
@ApiTags('(Суммарные данные) Данные с сайта kinopoisk')
@Get('filmsHasIMAX')
async getAllFilmsWithInfowUTHiMAX() {
  return await this.rabbitFilmsService.send({
    cmd: 'get-all-films-with-info-withImax',
  },
  {});

}

@ApiOperation({summary: 'Получить сохраненный фильм по id'})
@ApiTags('(Суммарные данные) Данные с сайта kinopoisk')
@Get('film/:id')
async getFilm(
  @Param('id') id: number) {
    return await this.rabbitFilmsService.send(
        {
         cmd: 'get-film-by-id',
        },
        {id:id},
        );
}
@ApiOperation({summary: 'Получить список фильмов по id фильмов. {movies:[301]}'})
  @ApiTags('(Суммарные данные) Данные с сайта kinopoisk')
  @Post('moveisbyid')
  async getMoviesByMoviesId(
    @Body('movies') movies: number[]) {
      return await this.rabbitFilmsService.send(
          {
           cmd: 'get-film-by-movies-id',
          },
          {movies:movies},
          );
  }

  @ApiOperation({summary: 'Получить всю инфомрацию о персоне по id'})
  @ApiTags('(Суммарные данные) Данные с сайта kinopoisk')
  @Get('personswithinfo/:id')
  async getPersonWithAllInfo(
    @Param('id') id: number) {
    return await this.rabbitFilmsService.send(
      {
        cmd: 'get-all-info-personsoffilms-by-personid',
      },
      {id:id},
    );
  }





@ApiOperation({summary: 'Получить сохраненную информацию о жанрах фильмов данные о которых были получены ранее'})
  @ApiTags('Данные с сайта kinopoisk')
  @Get('namesgenres')
  async GetnamesGenres() {
    return await this.rabbitnamesofGenresService.send({
      cmd: 'get-namesofgenres',
    },
    {});

  }
 

  
  
    
    @ApiOperation({summary: 'Добавить (Пример: {"id":301, "name":"Матрица","enName":"Matrix"}) (все поля из базового запроса к фильмам)'})  //////////////////// CRUD фИЛЬМОВ
    @ApiTags('(Редактирвоание данных) Данные с сайта kinopoisk')
    @Post('film')
    async createFilm(
      @Body('id') id: number,
      @Body('type') type: string,
      @Body('name') name: string,
      @Body('enName') enName: string,
      @Body('posterUrl') posterUrl: string,
      @Body('posterPreviewURL') posterPreviewURL: string,
      @Body('premiereRussia') premiereRussia: string,
      @Body('hasIMAX') hasIMAX: boolean,
      @Body('year') year: number,
      @Body('description') description: string,
      @Body('shortDescription') shortDescription: string,
      @Body('ageRating') ageRating: number,
      @Body('ratingKp') ratingKp: number,
      @Body('votesKp') votesKp: number,
      @Body('movieLength') movieLength: number,) {
      return await this.rabbitFilmsService.send(
        {
          cmd: 'post-film',
        },
        {
          id,
          type,
          name,
          enName,
          posterUrl,
          posterPreviewURL,
          premiereRussia,
          hasIMAX,
          year,
          description,
          shortDescription,
          ageRating,
          ratingKp,
          votesKp,
          movieLength,
          
        },
      );
  }
  
  @ApiOperation({summary: 'Удалить фильм'})                  
  @ApiTags('(Редактирвоание данных) Данные с сайта kinopoisk')
  @Delete('film/:id')
  async deleteFilmById(
    @Param('id') id: number) {
    return await this.rabbitFilmsService.send(
      {
        cmd: 'delete-film-by-id',
      },
      {
        id
      },
    );
  }
  
  @ApiOperation({summary: 'Удалить жанр'})
  @ApiTags('(Редактирвоание данных) Данные с сайта kinopoisk')
  @Delete('namesofgenre/:id')
  async deleteGenreOfMovie(
    @Param('id') id: number) {
    return await this.rabbitnamesofGenresService.send(
      {
        cmd: 'delete-genre-by-id',
      },
      {
        id
      },
    );
  }
  
  
  @ApiOperation({summary: 'Изменить название фильма (Пример: {"id":301, "name":"Матрица","enName":"Matrix"})'}) 
  @ApiTags('(Редактирвоание данных) Данные с сайта kinopoisk')
  @Patch('film')
  async updateNameOfMovie(
    @Body('id') id: number,
    @Body('name') name: string,
    @Body('enName') enName: string) {
    return await this.rabbitFilmsService.send(
      {
        cmd: 'update-nameoffilm',
      },
      {
        id,
        name,
        enName
      },
    );
  }
  
  @ApiOperation({summary: 'Добавить название жанра (Пример: {"id":1, "name:"драма","enName":"drame"})'})
  @ApiTags('(Редактирвоание данных) Данные с сайта kinopoisk')
  @Post('namesofgenre')
  async postGenreOfMovie(
    @Body('name') name: string,
    @Body('enName') enName: string) {
    return await this.rabbitnamesofGenresService.send(
      {
        cmd: 'post-namesgenres',
      },
      {
        name,
        enName
      },
    );
  }
  
  @ApiOperation({summary: 'Изменить название жанра (Пример: {"id":1, "name:"драма","enName":"drame"})'}) //////////////////// CRUD ЖАНРОВ
  @ApiTags('(Редактирвоание данных) Данные с сайта kinopoisk')
  @Patch('namesofgenre')
  async updateGenreOfMovie(
    @Body('id') id: number,
    @Body('name') name: string,
    @Body('enName') enName: string) {
    return await this.rabbitnamesofGenresService.send(
      {
        cmd: 'update-namesgenres',
      },
      {
        id,
        name,
        enName
      },
    );
  }
  
  
  @ApiOperation({summary: 'Удалить страну'})          //////////////////// CRUD СТРАН
  @ApiTags('(Редактирвоание данных) Данные с сайта kinopoisk')
  @Delete('namesofcountry/:id')
  async deleteCountry(
    @Param('id') id: number) {
    return await this.rabbitnamesofCountriesService.send(
      {
        cmd: 'delete-country-by-id',
      },
      {
        id
      },
    );
  }
  
  @ApiOperation({summary: 'Добавить название жанра (Пример: {"id":1, "name:"драма","enName":"drame"})'})     
  @ApiTags('(Редактирвоание данных) Данные с сайта kinopoisk')
  @Post('namesofcountry')
  async postCountry(
    @Body('name') name: string,
    @Body('enName') enName: string) {
    return await this.rabbitnamesofCountriesService.send(
      {
        cmd: 'post-country',
      },
      {
        name,
        enName
      },
    );
  }
  
  @ApiOperation({summary: 'Изменить название страны (Пример: {"id":1, "name:"Франция","enName":"France"})'})
  @ApiTags('(Редактирвоание данных) Данные с сайта kinopoisk')
  @Patch('namesofcountry')
  async updateCountriesOfMovie(
    @Body('id') id: number,
    @Body('name') name: string,
    @Body('enName') enName: string) {
    return await this.rabbitnamesofCountriesService.send(
      {
        cmd: 'update-namesofcountry',
      },
      {
        id,
        name,
        enName
      },
    );
  }


  
  @ApiOperation({summary: 'Получить все страны'}) 
  @ApiTags('Данные с сайта kinopoisk')
  @Get('namesOfCountries')
  async getCountriesNames() {
    return await this.rabbitnamesofCountriesService.send({
      cmd: 'get-all-countries-names',
    },
    {});

  }
  
  @ApiOperation({summary: 'Получить всех режисеров'})
  @ApiTags('Данные с сайта kinopoisk')
  @Get('getAllDirectors')
  async getAllDirectors() {
    return await this.rabbitPersonsFilmsService.send({
      cmd: 'get-all-directors',
    },
    {});

}
@ApiOperation({summary: 'Получить всех актеров'})
@ApiTags('Данные с сайта kinopoisk')
@Get('getAllActors')
async getAllActors() {
  return await this.rabbitPersonsFilmsService.send({
    cmd: 'get-all-actors',
  },
  {});

}
@ApiOperation({summary: 'Регистрация через email'})
@ApiTags('Email')
@Post('/auth/registration')
async registration(@Body() userDto: CreateUserDto, @Res({ passthrough: true }) res: Response, @Req() req) {
    const data = await this.authService.registration(userDto);
    res.cookie('authenticationType', 'email', {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
    res.cookie('refreshToken', data.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}).send({accessToken: data.accessToken, email: data.user.email, 
            roles: data.user.roles});
}
    
@ApiOperation({summary: 'Авторизация через email'})
@ApiTags('Email')
@Post('/auth/login')
async login(@Body() userDto: CreateUserDto, @Res({ passthrough: true }) res: Response, @Req() req) {
    const data = await this.authService.login(userDto);
    
    res.cookie('authenticationType', 'email', {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
    res.cookie('refreshToken', data.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}).send({accessToken: data.accessToken, email: data.user.email, 
            roles: data.user.roles});
}
@ApiOperation({summary: 'Валидация'})
@ApiTags('Email')
@Post('/validate/email')
async validateEmailToken(@Body('accessToken')  accessToken: string,@Body('refreshToken')  refreshToken: string) {
        const userData =  await this.authService.validateEmailToken({accessToken: accessToken, refreshToken: refreshToken});
        return {email: userData.user.email, roles: userData.user.roles};
     
}
@ApiOperation({summary: 'Получить RefreshToken используя AccessToken'})
  @ApiTags('Email')
  @Post('getAccesByRefreshEmail')
  async getAccessByRefreshVk(
    @Body('accessToken') accessToken: string) {
    return await this.authServiceRabbit.send(
      {
        cmd: 'get-refresh-by-access-email',
      },
      {
        accessToken
      },
    );
  }

@ApiOperation({summary: 'Авторизация через google'})
@ApiTags('Google')
@Post('auth/google')
async googleLogin(@Body() googleUserDto: CreateGoogleUserDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.createGoogleUser(googleUserDto);
    res.cookie('authenticationType', 'google', {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
    res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
    return {type: 'google', user: user.email, roles: user.roles, accessToken: user.accessToken,refreshToken:user.refreshToken};
}
@ApiOperation({summary: 'Валидация'})
@ApiTags('Google')
@Post('/validate/google')
async validateGoogleToken(@Body('accessToken')  accessToken: string,@Body('refreshToken') refreshToken: string) {
        const userData =  await this.authService.validateGoogleToken({accessToken: accessToken, refreshToken: refreshToken});
        return {email: userData.user.email, roles: userData.user.roles};
     
}
@ApiOperation({summary: 'Получить RefreshToken используя AccessToken'})
  @ApiTags('Google')
  @Post('getAccesByRefreshGoogle')
  async getAccessByRefreshGoogle(
    @Body('accessToken') accessToken: string) {
    return await this.authServiceRabbit.send(
      {
        cmd: 'get-refresh-by-access-google',
      },
      {
        accessToken
      },
    );
  }

  @ApiOperation({summary: 'Авторизация через ВК'})
  @ApiTags('VK')
  @Post('auth/vk')
  async VKlogin(@Body() vkUserDto: CreateVkUserDto, @Res({ passthrough: true }) res: Response) {
      const user = await this.authService.createVKUser(vkUserDto);
      res.cookie('authenticationType', 'vk', {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
      res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
      return {type: 'vk', user: user.name, roles: user.roles, accessToken: user.accessToken, refreshToken:user.refreshToken};
  }
@ApiOperation({summary: 'Валидация'})
@ApiTags('VK')
@Post('/validate/vk')
async validateVkToken(@Body('accessToken')  accessToken: string,@Body('refreshToken')  refreshToken: string) {
        const userData =  await this.authService.validateVkToken({accessToken: accessToken, refreshToken: refreshToken});
        return {name: userData.user.name, roles: userData.user.roles};
     
}

@ApiOperation({summary: 'Получить RefreshToken используя AccessToken'})
  @ApiTags('VK')
  @Post('getAccesByRefreshVK')
  async getAccessByRefreshEmail(
    @Body('accessToken') accessToken: string) {
    return await this.authServiceRabbit.send(
      {
        cmd: 'get-refresh-by-access-vk',
      },
      {
        accessToken
      },
    );
  }


@ApiOperation({summary: 'Публикация комментария к фильму'})
@ApiTags('Комментарии')
@Post('/comment/film')
async publishCommentToFilm(
  @Body() commentDto: any, 
  @Req() req) {
    
    const date = String(new Date());

    const comment = await this.commentService.publishCommentToFilm({date: date, user: commentDto.user, text: commentDto.text,  movieid:  commentDto.movieid});
    return comment;
}

@ApiOperation({summary: 'Публикация комментария к другому комментарию'})
@ApiTags('Комментарии')
@Post('/comment/childComment')
async publishChildComment(@Body() commentInfo: any, @Req() req) {
    const date = String(new Date());
        
        const comment = await this.commentService.publishChildComment({date: date, user: commentInfo.user, text: commentInfo.text,
                                                                         parentId: commentInfo.parentId, movieid:commentInfo.movieid});
        return comment;
}

@ApiOperation({summary: 'Получить комментарий по id'})
@ApiTags('Комментарии')
@Get('/comment/:id')
async getComment(@Param() data) {
    const comment = await this.commentService.getComment(data.id);
    return comment;
}
@ApiOperation({summary: 'Получить все ChildComments комментария по его id'})
@ApiTags('Комментарии')
@Get('getChildComments/:parentId')
async getChildComments(
  @Param('parentId') parentId: number) {
  return await this.client.send(
    {
      cmd: 'get-comments-by-parentId'
    },
    {parentId:parentId},
  );
}

@ApiOperation({summary: 'Создать роль'})
@ApiTags('Роли')
@Post('/role')
    async createRole(@Body('value') value: string) {
        return await this.rabbitUserService.send('create.role', {value:value});
    }

@ApiOperation({summary: 'Добавить роль пользователю используя почту'})
@ApiTags('Роли')
@Post('/addRole')
    async addRoleToUser(@Body() data: AddRoleDto) {
        return await this.rabbitUserService.send('add.role.toUser', data);
}

@ApiOperation({summary: 'Создание пользователя с ролью администратор и добавление двух ролей'})
@ApiTags('Создание пользователя с ролью администратор и добавление двух ролей')
@Post('/createAdmin')
    async createAdminUser() {
        const user = await this.authService.createAdmin();
        return user;
    }




  @ApiOperation({summary: 'Выход из аккаунта и очищение cookies'})
  @ApiTags('Очищение cookies и выход из аккаунта')
  @Post('/auth/logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
      res.clearCookie('refreshToken');
      res.clearCookie('authenticationType');
      return {message: "cookies has been cleared"};
  }
}
