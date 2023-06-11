import { Injectable,Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comments.model';
import { CreateChildComment } from './dto/childComment.dto';
import { CreateCommentDto } from './dto/comment.dto';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import {CustomError} from 'customerror'

@Injectable()
export class CommentsService {
    constructor(@InjectModel(Comment) private commentRepo: typeof Comment,
    @Inject('FILM_SERVICE') private rabbitFilmsService: ClientProxy) {}
    async getAllFilms() {
        const ob$ = await this.rabbitFilmsService.send({
          cmd: 'get-all-films',
        },
        {});
        const films = await firstValueFrom(ob$).catch((err) => console.error(err));
        return films;
      }
      async createComment(dto: CreateCommentDto) {
        const film = await this.getAllFilms()
        let ArrFilmId = []
        for(let q =0 ;q<film.length;q++){
            ArrFilmId.push(film[q].id)
        }
        if(dto.movieid===undefined){
            throw new Error('Введите movieid')
        }
        else if(ArrFilmId.includes(dto.movieid)===true){
            const comment = await this.commentRepo.create({user: dto.user, text: dto.text, date: dto.date,movieid:dto.movieid});
            return comment;
        }
        else{
            throw new Error(`Фильма с id ${dto.movieid} нет в базе`)
        }
    }

    async createChildComment(dto: CreateChildComment) {
        const comment = await this.commentRepo.findByPk(dto.parentId)
        const film = await this.getAllFilms()
        let ArrFilmId = []
        for(let q =0 ;q<film.length;q++){
            ArrFilmId.push(film[q].id)
        }
        if(dto.movieid===undefined){
            throw new Error('Введите movieid')
        }
        else if((comment.movieid)!=dto.movieid){
             throw new Error("id фильма Comment отличается от id фильма ChildComment")
        }
        else if(ArrFilmId.includes(dto.movieid)===true){
            const parentComment = await this.commentRepo.findOne({where: {id: dto.parentId}});
            const comment = await this.commentRepo.create({user: dto.user, text: dto.text, date: dto.date,movieid:dto.movieid});
            comment.$set('parent', [parentComment.id]);
            comment.parent = parentComment;
            return comment;
        }
        else{
            throw new Error(`Фильма с id ${dto.movieid} нет в базе`)
        }
    }

    async getComment(id: number) {
        return await this.commentRepo.findOne({where: {id: id}, include: {all: true}});
    }
    async getCommentsByMovieId(idF:number){
        return await this.commentRepo.findAll({where:{movieid:idF}})
    }
    async getAllChildCommentByParentId(parentId:number){
        return await this.commentRepo.findAll({where:{parentId:parentId}})
    }
    async clearCommetns(){
        const film = await this.getAllFilms()
        const comments = await this.commentRepo.findAll()
        let ArrFilmdId = []
        for(let q = 0 ; q <film.length;q++ ){
          ArrFilmdId.push(film[q].id)
        }
        let count = 0 
        for(let q = 0 ; q <comments.length;q++){
          if(ArrFilmdId.includes(comments[q].movieid)===false){
            await this.commentRepo.destroy({where:{id:comments[q].id}})
            count+=1
          }
        }
        return `Удалено записей в севрисе comments: ${count}`
      }
}