import { Controller, Get, Req,Inject} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Request } from 'express';
import { ClientProxy, Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class CommentsController {
  constructor(private readonly commentService: CommentsService,
  ) {}

  @MessagePattern('publish.comment.film')
  async createComment(@Payload() data: any) {
    return await this.commentService.createComment(data);
    
  }

  @MessagePattern('publish.comment.child')
  async createChildComment(@Payload() data: any) {
    const comment = await this.commentService.createChildComment(data);
    return comment;
  }

  @MessagePattern('get.comment.byId')
  async getComment(@Payload() id: number) {
    return await this.commentService.getComment(id);
  }
  @MessagePattern({ cmd: 'get-comments-by-filmid' })
  async getFilmById(
    @Ctx() context: RmqContext,
    @Payload() film: { idF: number },) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return await this.commentService.getCommentsByMovieId(film.idF);
  }
  @MessagePattern({cmd:'get-comments-by-parentId'})
  async getCommentByParentId(
    @Ctx() context: RmqContext,
    @Payload() comment: { parentId: number },) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return await this.commentService.getAllChildCommentByParentId(comment.parentId);
  }
  @MessagePattern({ cmd: 'clear-comments'}) ////////////////////// Очищение данных после удаления фильма
  async clearCountries(@Ctx() context: RmqContext){
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.commentService.clearCommetns()
  } 
}