import { Controller, Get } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';



@Controller()
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}
  
  @MessagePattern({ cmd: 'parser-persons'})
  async getPersons(@Ctx() context: RmqContext){
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.personsService.formDatabase()
  }
  
  @MessagePattern({ cmd: 'get-all-persons'})
  async getAllPersons(@Ctx() context: RmqContext){
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.personsService.getAllPersons()
  }


  

  @MessagePattern({ cmd: 'get-personsoffilms-by-moveid' })
  async getUserById(
    @Ctx() context: RmqContext,
    @Payload() movie: { id: number },) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.personsService.getPersonsOfMovieByMovieId(movie.id);
  }
  @MessagePattern({ cmd: 'get-personsoffilms-by-movesid' })
  async getGetPersonsWithAllInfoByMoviesId(
    @Ctx() context: RmqContext,
    @Payload() movie: { moviesid: number[] },) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.personsService.getPersonsByMoviesId(movie.moviesid);
  }
  @MessagePattern({ cmd: 'get-all-info-personsoffilms-by-personid' })
  async getAllInfoPersonBypersonId(
    @Ctx() context: RmqContext,
    @Payload() person: { id: number },) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.personsService.getAllInfoOfPersonsByPersonId(person.id);
  }

  @MessagePattern({ cmd: 'get-movies-by-director-and-actor' })
  async getMoviesByDirectorandActor(
    @Ctx() context: RmqContext,
    @Payload() str: {str:string}, ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.personsService.getMoviesByDirectorAndActor(str.str);
  
  }

  @MessagePattern({ cmd: 'get-movies-by-director' })
  async getMoviesByDirector(
    @Ctx() context: RmqContext,
    @Payload() director: {director:string}, ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.personsService.getAllMoviesByDirector(director.director);
  
  }

  @MessagePattern({ cmd: 'get-movies-by-actor' })
  async getMoviesByActor(
    @Ctx() context: RmqContext,
    @Payload() actor: {actor:string}, ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.personsService.getAllMoviesByActor(actor.actor);
  
  }

  @MessagePattern({ cmd: 'get-all-directors'})
  async getAllDirectorso(@Ctx() context: RmqContext){
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.personsService.getAllDirectors()
  }
  @MessagePattern({ cmd: 'get-all-actors'})
  async getAllActors(@Ctx() context: RmqContext){
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.personsService.getAllActors()
  }

  @MessagePattern({ cmd: 'clear-persons'}) ////////////////////// Очищение данных после удаления фильма
  async clearCountries(@Ctx() context: RmqContext){
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.personsService.clearPersons()
  }

}
