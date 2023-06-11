import { Injectable,Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { namesGenresOfFilms } from './genresnames.model';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { GenresNamesDto } from './dto/genresnames.dto';
import { Op } from 'sequelize';
import { CreateGenresNamesDto } from './dto/create-genres.dto';


@Injectable()
export class GenresnamesService {
    constructor(@InjectModel(namesGenresOfFilms) private namesofgenresmoviesRepository,
    @Inject('FILM_SERVICE') private rabbitFilmsService: ClientProxy,
    @Inject('GENRES_SERVICE') private rabbitGenresService: ClientProxy){}

    async getAllFilms() {
        const ob$ = await this.rabbitFilmsService.send({
          cmd: 'get-all-films',
        },
        {});
        const films = await firstValueFrom(ob$).catch((err) => console.error(err));
        return films;
      }

    async getMoviesByGenreId(genreId:number){
      const ob$ = await this.rabbitGenresService.send({
        cmd: 'get-movies-by-genreid',
      },
      {genreid:genreId});
      const films = await firstValueFrom(ob$).catch((err) => console.error(err));
      return films;
    }
    
    async formDatabase() {
        let genresEnNames = ["drama","comedy","biography","crime","action","thriller","family","sci-fi","adventures","detective","cartoon","fantasy","melodrama","history","war","horror","western","musical","music","sports","short","children's","documentary"]
        let ArrFilms = await this.getAllFilms()
        let filmIdArr = [];
        for(let i = 0; i<ArrFilms.length;i++){
          filmIdArr.push(ArrFilms[i].id);
        }
        let NamesgenresArr = []
        let NamesGenres = await this.namesofgenresmoviesRepository.findAll()
        for(let i = 0; i<NamesGenres.length;i++){
          NamesgenresArr.push(NamesGenres[i].name);
        }

        if(filmIdArr.length!=0){
          const genresREQ =  await fetch(`https://api.kinopoisk.dev/v1/movie?id=${filmIdArr.join('&id=')}&selectFields=genres&limit=1000`, {
            method: 'GET',
            headers:{
                      'X-API-KEY': 'QTD9VCR-EW8M0Y4-QR6W0Y1-Y8J1BFT',
                      'Content-Type': 'application/json',
                    },
        })
        if(genresREQ.ok){
          let json = await genresREQ.json();
          let arrGenres=[]
          for(let i =0; i< json.docs.length;i++){
            for(let j =0; j<json.docs[i].genres.length;j++){
              if( ((arrGenres.includes(json.docs[i].genres[j].name))===false)&&((NamesgenresArr.includes(json.docs[i].genres[j].name))===false) ){
                arrGenres.push(
                  
                  json.docs[i].genres[j].name
                  
                )

            }
          }
          }
          let arrGenresObj = []
          for(let q = 0 ; q < arrGenres.length;q++){
            if(arrGenres[q]==="драма"){
                arrGenresObj.push({name:arrGenres[q],enName:"drama"})
            }
            else if(arrGenres[q]==="комедия"){
              arrGenresObj.push({name:arrGenres[q],enName:"comedy"})

            }
            else if(arrGenres[q]==="комедия"){
              arrGenresObj.push({name:arrGenres[q],enName:"comedy"})

            }
            else if(arrGenres[q]==="биография"){
              arrGenresObj.push({name:arrGenres[q],enName:"biography"})

            }
            else if(arrGenres[q]==="криминал"){
              arrGenresObj.push({name:arrGenres[q],enName:"crime"})

            }
            else if(arrGenres[q]==="боевик"){
              arrGenresObj.push({name:arrGenres[q],enName:"action"})

            }
            else if(arrGenres[q]==="триллер"){
              arrGenresObj.push({name:arrGenres[q],enName:"thriller"})

            }
            else if(arrGenres[q]==="семейный"){
              arrGenresObj.push({name:arrGenres[q],enName:"family"})

            }
            else if(arrGenres[q]==="фантастика"){
              arrGenresObj.push({name:arrGenres[q],enName:"sci-fi"})

            }
            else if(arrGenres[q]==="приключения"){
              arrGenresObj.push({name:arrGenres[q],enName:"adventures"})

            }
            else if(arrGenres[q]==="детектив"){
              arrGenresObj.push({name:arrGenres[q],enName:"detective"})

            }
            else if(arrGenres[q]==="фэнтези"){
              arrGenresObj.push({name:arrGenres[q],enName:"fantasy"})

            }
            else if(arrGenres[q]==="мультфильм"){
              arrGenresObj.push({name:arrGenres[q],enName:"cartoon"})

            }
            else if(arrGenres[q]==="мелодрама"){
              arrGenresObj.push({name:arrGenres[q],enName:"melodrama"})

            }
            else if(arrGenres[q]==="история"){
              arrGenresObj.push({name:arrGenres[q],enName:"history"})

            }
            else if(arrGenres[q]==="военный"){
              arrGenresObj.push({name:arrGenres[q],enName:"war"})

            }
            else if(arrGenres[q]==="ужасы"){
              arrGenresObj.push({name:arrGenres[q],enName:"horror"})

            }
            else if(arrGenres[q]==="вестерн"){
              arrGenresObj.push({name:arrGenres[q],enName:"western"})

            }
            else if(arrGenres[q]==="мюзикл"){
              arrGenresObj.push({name:arrGenres[q],enName:"musical"})

            }
            else if(arrGenres[q]==="музыка"){
              arrGenresObj.push({name:arrGenres[q],enName:"music"})

            }
            else if(arrGenres[q]==="спорт"){
              arrGenresObj.push({name:arrGenres[q],enName:"sports"})

            }
            else if(arrGenres[q]==="короткометражка"){
              arrGenresObj.push({name:arrGenres[q],enName:"short"})

            }
            else if(arrGenres[q]==="детский"){
              arrGenresObj.push({name:arrGenres[q],enName:"children's"})

            }
            else if(arrGenres[q]==="документальный"){
              arrGenresObj.push({name:arrGenres[q],enName:"documentary"})

            }else{
              arrGenresObj.push({name:arrGenres[q],enName:"Other"})
            }
            
          }
          return await this.namesofgenresmoviesRepository.bulkCreate(arrGenresObj)
        }
        else{
          console.log("Ошибка HTTP: " + genresREQ.status);
        }
            
        }
      }

    async getAllnamesGenres(){
      return await this.namesofgenresmoviesRepository.findAll()
    }
    
    async updateGenre(dto:GenresNamesDto){
      const genre = await this.namesofgenresmoviesRepository.findOne({where:{id:dto.id}})
      genre.name = dto.name
      genre.enName = dto.enName
      genre.save()
      return genre
    }

    

    
    async getGenresByNames(ArrGenres:string[]){
      return await this.namesofgenresmoviesRepository.findAll({where:{
            [Op.or]:[{name:{[Op.in]:ArrGenres}},{enName:{[Op.in]:ArrGenres}}]
            }})
    }

    async getGenreByName(genre:string){
      return await this.namesofgenresmoviesRepository.findAll({where:{
        [Op.or]:[{name:genre},{enName:genre}]

      }})
    }
   
    async getGenresNamesByGenresId(genresId:number[]){
      return await this.namesofgenresmoviesRepository.findAll({where:{id:{[Op.in]:genresId}}})
    }
    async deleteGenre(idG:number){
      const genre = await this.namesofgenresmoviesRepository.findByPk(idG)
      await this.namesofgenresmoviesRepository.destroy({where:{id:idG}})
      return `Жанр c id ${genre.id} удален`
    }
    async postGenre(dto:CreateGenresNamesDto){
      const genres = await this.namesofgenresmoviesRepository.findAll()
      for(let q = 0 ; q <genres.length;q++){
        if(genres[q].name===dto.name||genres[q].enName===dto.enName){
          return 'Жанр уже есть в базе данных'
        }
      }
      return await namesGenresOfFilms.create(dto)
    }
  }