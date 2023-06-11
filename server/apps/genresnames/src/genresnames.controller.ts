import { Controller, Get } from '@nestjs/common';
import { GenresnamesService } from './genresnames.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { GenresNamesDto } from './dto/genresnames.dto';

@Controller()
export class GenresnamesController {
  constructor(private readonly genresnamesService: GenresnamesService) {}

  @MessagePattern({ cmd: 'parser-namesofgenres'})
  async getPersons(@Ctx() context: RmqContext){
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.genresnamesService.formDatabase()
  }

  @MessagePattern({ cmd: 'get-namesofgenres'})
  async getGetNamesofgenres(@Ctx() context: RmqContext){
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.genresnamesService.getAllnamesGenres()
  }

  @MessagePattern({ cmd: 'update-namesgenres' })
  async UpdateDprofile(
    @Ctx() context: RmqContext,
    @Payload() genre: GenresNamesDto) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.genresnamesService.updateGenre(genre);
  }

  @MessagePattern({ cmd: 'get-genres-by-names' })
  async getGenresByNames(
    @Ctx() context: RmqContext,
    @Payload() genre: { ArrGenres: string[] },) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return await this.genresnamesService.getGenresByNames(genre.ArrGenres);
  }
  @MessagePattern({ cmd: 'get-genres-by-genres-id' })
  async getGenresByGenresId(
    @Ctx() context: RmqContext,
    @Payload() genre: { ArrGenresId: number[] },) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return await this.genresnamesService.getGenresNamesByGenresId(genre.ArrGenresId);
  }
  @MessagePattern({ cmd: 'get-genres-by-name' })
  async getGenresByName(
    @Ctx() context: RmqContext,
    @Payload() genre: { genre: string },) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return await this.genresnamesService.getGenreByName(genre.genre);
  }
  @MessagePattern({ cmd: 'delete-genre-by-id' })
  async getAllInfoPersonBypersonId(
    @Ctx() context: RmqContext,
    @Payload() genre: { id: number },) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.genresnamesService.deleteGenre(genre.id);
  }

  @MessagePattern({ cmd: 'post-namesgenres' })
  async postNameGenre(
    @Ctx() context: RmqContext,
    @Payload() genre: GenresNamesDto) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.genresnamesService.postGenre(genre);
  }
}
