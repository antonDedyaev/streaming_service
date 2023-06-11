import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenresOfFilms } from './genres.model';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Op } from 'sequelize';

@Injectable()
export class GenresService {
  constructor(@InjectModel(GenresOfFilms) private genresRepository: typeof GenresOfFilms,
  @Inject('FILM_SERVICE') private rabbitFilmsService: ClientProxy,
  @Inject('NAMESGENRES_SERVICE') private rabbitnamesGenresService: ClientProxy){}



  async getAllFilms() {
    const ob$ = await this.rabbitFilmsService.send({
      cmd: 'get-all-films',
    },
    {});
    const films = await firstValueFrom(ob$).catch((err) => console.error(err));
    return films;
  }
  
  async getNamesGenresByMoviesId() {
    const ob$ = await this.rabbitnamesGenresService.send({
      cmd: 'get-namesofgenres',
    },
    {});
    const namesgenres = await firstValueFrom(ob$).catch((err) => console.error(err));
    return namesgenres;
  }
 
  async getGenresByMovieId(id:number){
    return await this.genresRepository.findAll({where:{movieid:id}})
  }

  async getAllnamesGenres() {
    const ob$ = await this.rabbitnamesGenresService.send({
      cmd: 'get-namesofgenres',
    },
    {});
    const namesgenres = await firstValueFrom(ob$).catch((err) => console.error(err));
    return namesgenres;
  }
  
  async formDatabase() {

    let ArrFilms = await this.getAllFilms()
    let filmIdArr = [];
    for(let i = 0; i<ArrFilms.length;i++){
      filmIdArr.push(ArrFilms[i].id);
    }

    let ArrNamesGenres = await this.getAllnamesGenres()
    let arrnamesGenres = []
    for(let i = 0; i<ArrNamesGenres.length;i++){
      arrnamesGenres.push(ArrNamesGenres[i]);
    }
    let genreRepArr = []
    let genreRep = await this.genresRepository.findAll()
    for(let i = 0 ; i <genreRep.length;i++ ){
      genreRepArr.push('genreid: '+(genreRep[i].genreid)+' : '+'movieid: '+genreRep[i].movieid)
    }

    if((filmIdArr.length!=0)&&(arrnamesGenres.length!=0)){
      const genresREQ =  await fetch(`https://api.kinopoisk.dev/v1/movie?id=${filmIdArr.join('&id=')}&selectFields=genres%20id&limit=1000`, {
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
          for(let n = 0 ; n<arrnamesGenres.length;n++ ){
            if((arrnamesGenres[n].name === json.docs[i].genres[j].name)&&(genreRepArr.includes('genreid: '+(arrnamesGenres[n].id)+' : '+'movieid: '+json.docs[i].id)===false)){
                arrGenres.push(
                    {
                      movieid:json.docs[i].id,
                      genreid:arrnamesGenres[n].id
                    }
                    )
                
              
            }
          }
          }
        }
        return await this.genresRepository.bulkCreate(arrGenres)
    }
    else{
      console.log("Ошибка HTTP: " + genresREQ.status);
    }
        
    }
    else{
      throw new Error('DB_FILMS OR DB_NAMES_OF_GENRE IS EMPTY')
    }
  }

  async getAllGenres(){
    const genresId = await this.genresRepository.findAll()
    const genresNames = await this.getAllnamesGenres()
    let ArrGenres = []
    for(let q = 0 ; q < genresId.length;q++){
      for(let w = 0 ; w <genresNames.length;w++){
        if(genresId[q].genreid===genresNames[w].id){
          ArrGenres.push(
            {
              movieid:genresId[q].movieid,
              name:genresNames[w].genre,
              enName:genresNames[w].enName
            }
            )
        }
      }
    }
    return ArrGenres

  }
  async getAll(){
    return await this.genresRepository.findAll()
  }

  async getMoviesByGenreId(genreid:number[]){
    return await this.genresRepository.findAll({attributes: [
      'movieid'
   ],where:{genreid:{[Op.in]:genreid}}})
  }

  async getGenresByMoviesId(moviesId:number[]){
    return await this.genresRepository.findAll({where:{movieid:{[Op.in]:moviesId}}})
    
  }
  async clearGenres(){
    const film = await this.getAllFilms()
    const genres = await this.genresRepository.findAll()
    let ArrFilmdId = []
    for(let q = 0 ; q <film.length;q++ ){
      ArrFilmdId.push(film[q].id)
    }
    let count = 0 
    for(let q = 0 ; q <genres.length;q++){
      if(ArrFilmdId.includes(genres[q].movieid)===false){
        await this.genresRepository.destroy({where:{id:genres[q].id}})
        count+=1
      }
    }
    return `Удалено записей в сервисе genres: ${count}`
  }
}
