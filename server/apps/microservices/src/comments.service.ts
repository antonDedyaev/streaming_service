import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ChildCommentDto } from './dto/childComment.dto';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentsService {
    constructor(@Inject('COMMENT_SERVICE') private client: ClientProxy) {}


    async publishCommentToFilm(dto: CommentDto) {
        const comment = await (this.client.send('publish.comment.film', {...dto})).toPromise();
        return comment;
    }

    async publishChildComment(dto: ChildCommentDto) {
        const comment = await (this.client.send('publish.comment.child', {...dto})).toPromise();
        return comment;
    }

    async getComment(id: number) {
        const comment = await (this.client.send('get.comment.byId', id)).toPromise();
        return comment;
    }
}