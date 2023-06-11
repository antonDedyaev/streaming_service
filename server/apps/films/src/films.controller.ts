import { Controller, Get } from '@nestjs/common';
import { FilmsService } from './films.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { FilmDto } from './dto/film.dto';
import { FilteDto } from './dto/filtre.dto';
import { CreateFilmDto } from './dto/create-film.dto';


@Controller()
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}


  @MessagePattern({ cmd: 'parser-films'})
  async getFilms(@Ctx() context: RmqContext){
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return await this.filmsService.formDatabase()
  }
  
  

  @MessagePattern({ cmd: 'get-all-info-personsoffilms-by-personid' })  //////////// GET
  async getPersonsByPersonId(
    @Ctx() context: RmqContext,
    @Payload() person: { id: number },) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return await this.filmsService.getPersonInfoByiD(person.id);
  }

  @MessagePattern({ cmd: 'get-all-directors'})
  async getAllDirectors(@Ctx() context: RmqContext){
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return await this.filmsService.getAllDirectors()
  }
  @MessagePattern({ cmd: 'get-all-actors'})
  async getAllActors(@Ctx() context: RmqContext){
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return await this.filmsService.getAllActors()
  }
 
  @MessagePattern({ cmd: 'get-all-films-with-info'})
  async getAllFilmsWithInfo(@Ctx() context: RmqContext){
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return await this.filmsService.getAllFilmsWithAllInfo()
  }
  @MessagePattern({ cmd: 'get-all-films-with-info-withImax'})
  async getAllFilmsWithInfoWuthImax(@Ctx() context: RmqContext){
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return await this.filmsService.getAllFilmsWithAllInfoWithImax()
  }

  @MessagePattern({ cmd: 'get-all-films'})
  async getAllFilms(@Ctx() context: RmqContext){
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return await this.filmsService.getAllFilms()
  }

  @MessagePattern({ cmd: 'get-film-by-id' })
  async getFilmById(
    @Ctx() context: RmqContext,
    @Payload() film: { id: number },) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return await this.filmsService.getFilmById(film.id);
  }
  @MessagePattern({ cmd: 'get-film-by-movies-id' })
  async getFilmByMoviesId(
    @Ctx() context: RmqContext,
    @Payload() film: { movies: number[] },) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return await this.filmsService.getMoviesByMoviesId(film.movies);
  }

  @MessagePattern({ cmd: 'get-movies-by-director' })
  async getMoviesByDirector(
    @Ctx() context: RmqContext,
    @Payload() director: {director:string}, ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.filmsService.getFilmsByDirector(director.director);
  
  }

  @MessagePattern({ cmd: 'get-movies-by-actor' })
  async getMoviesByActor(
    @Ctx() context: RmqContext,
    @Payload() actor: {actor:string}, ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.filmsService.getFilmsByActor(actor.actor);
  
  }
  @MessagePattern({ cmd: 'get-film-by-rating-kp' })
  async getMoviesByRatingKp(
    @Ctx() context: RmqContext,
    @Payload() film: { rating: number },) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return await this.filmsService.getMoviesByRatingKp(film.rating);
  }
 
  @MessagePattern({ cmd: 'get-film-by-votesKinopoisk' })
  async getMoviesByVotesKp(
    @Ctx() context: RmqContext,
    @Payload() film: { voteskp: number },) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return await this.filmsService.getMoviesByVotesKinopoisk(film.voteskp);
  }
  @MessagePattern({ cmd: 'get-all-persons-with-film-info' })
  async getAllPersonsWithInfo(
    @Ctx() context: RmqContext ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return await this.filmsService.getAllPersonsWithInfo();
  }
  @MessagePattern({ cmd: 'get-films-use-filtres' })
  async filtre(
    @Ctx() context: RmqContext, 
    @Payload() queryParams: any) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.filmsService.getFilmsUseFiltre(queryParams);
  }


  @MessagePattern({ cmd: 'post-film' }) 
  async PostFilm(                           /////////////РЕДАКТИРВАОНИЕ, УДАЛЕНИЕ
    @Ctx() context: RmqContext,
    @Payload() film: CreateFilmDto) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return await this.filmsService.postFilm(film);
  }
  @MessagePattern({ cmd: 'update-nameoffilm' })        
  async UpdateFilm(
    @Ctx() context: RmqContext,
    @Payload() film: FilmDto) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return await this.filmsService.updateNameMovie(film);
  }
  @MessagePattern({ cmd: 'delete-film-by-id' })
  async deleteFilmById(
    @Ctx() context: RmqContext,
    @Payload() film: { id: number },) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return await this.filmsService.deleteFilm(film.id);
  }
  
}
