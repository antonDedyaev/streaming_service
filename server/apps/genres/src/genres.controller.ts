import { Controller, Get } from '@nestjs/common';
import { GenresService } from './genres.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class GenresController {
  constructor(private readonly genresService: GenresService) {}
  
  @MessagePattern({ cmd: 'parser-genres'})
  async getPersons(@Ctx() context: RmqContext){
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.genresService.formDatabase()
  }
 
  @MessagePattern({ cmd: 'get-all-genres'})
  async getAllCountries(@Ctx() context: RmqContext){
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.genresService.getAll()
  }

  @MessagePattern({ cmd: 'get-genres-by-moveid' })
  async getGenresByMovieId(
    @Ctx() context: RmqContext,
    @Payload() movie: { id: number },) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.genresService.getGenresByMovieId(movie.id);
  }

  @MessagePattern({ cmd: 'get-genres-by-moveies-id' })
  async getGenresByMoviesId(
    @Ctx() context: RmqContext,
    @Payload() movie: { moviesId: number[] },) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.genresService.getGenresByMoviesId(movie.moviesId);
  }
  @MessagePattern({ cmd: 'get-movies-by-genreid' })
  async getMoviesByGenreId(
    @Ctx() context: RmqContext,
    @Payload() genre: { genreid: number[] },) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.genresService.getMoviesByGenreId(genre.genreid);
  }
  @MessagePattern({ cmd: 'clear-genres'}) ////////////////////// Очищение данных после удаления фильма
  async clearCountries(@Ctx() context: RmqContext){
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.genresService.clearGenres()
  }
}
