import { Controller, Get } from '@nestjs/common';
import { VideosService } from './videos.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class VideosController {
  constructor(private readonly videosService: VideosService) {}
  
 
  @MessagePattern({ cmd: 'videos-parsing'})
  async getVideos(@Ctx() context: RmqContext){
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.videosService.formDatabase()
  }

  @MessagePattern({ cmd: 'get-all-videos'})
  async getAllVideos(@Ctx() context: RmqContext){
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.videosService.getAllVideos()
  }

  @MessagePattern({ cmd: 'get-videos-by-moveid' })
  async getUserById(
    @Ctx() context: RmqContext,
    @Payload() movie: { id: number },) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.videosService.getVideosByMovieId(movie.id);
  }
  @MessagePattern({ cmd: 'get-videos-by-movesid' })
  async getVidoesByMoviesId(
    @Ctx() context: RmqContext,
    @Payload() movie: { moviesid: number[] },) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.videosService.getVideosByMoviesId(movie.moviesid);
  }
  @MessagePattern({ cmd: 'clear-videos'}) ////////////////////// Очищение данных после удаления фильма
  async clearCountries(@Ctx() context: RmqContext){
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.videosService.clearVideos()
  } 
}
