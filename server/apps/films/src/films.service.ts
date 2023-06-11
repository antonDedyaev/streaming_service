import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Films } from './films.model';
import { FilmDto } from './dto/film.dto';
import { Op } from 'sequelize';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateFilmDto } from './dto/create-film.dto';


@Injectable()
export class FilmsService {
    constructor(@InjectModel(Films) private filmRepository: typeof Films,
    @Inject('GENRES_SERVICE') private rabbitGenresFilmsService: ClientProxy,
    @Inject('COUNTRIES_SERVICE') private rabbitCountriesFilmsService: ClientProxy,
    @Inject('COUNTRIESNAMES_SERVICE') private rabbitCountriesNamesService: ClientProxy,
    @Inject('VIDEOS_SERVICE') private rabbitVideosService: ClientProxy,
    @Inject('NAMESOFGENRES_SERVICE') private rabbitnamesofGenresService: ClientProxy,
    @Inject('PERSONS_SERVICE') private rabbitPersonsFilmsService: ClientProxy,
    @Inject('COMMENT_SERVICE') private rabbitCommentService: ClientProxy) {}

    async parsingCountries(){
        const ob$ = await this.rabbitCountriesFilmsService.send({
            cmd: 'parser-countries',
          },
          {});
          const persons = await firstValueFrom(ob$).catch((err) => console.error(err));
          return persons;
    }
    async parsingNamesOfCountries(){
        const ob$ = await this.rabbitCountriesNamesService.send({
            cmd: 'parser-countries-names',
          },
          {});
          const persons = await firstValueFrom(ob$).catch((err) => console.error(err));
          return persons;
    }
    async parsingGenresNames(){
        const ob$ = await this.rabbitnamesofGenresService.send({
            cmd: 'parser-namesofgenres',
          },
          {});
          const persons = await firstValueFrom(ob$).catch((err) => console.error(err));
          return persons;
    }
    async parsingGenresOfMovie(){
        const ob$ = await this.rabbitGenresFilmsService.send({
            cmd: 'parser-genres',
          },
          {});
          const persons = await firstValueFrom(ob$).catch((err) => console.error(err));
          return persons;
    }
    async parsingPersons(){
        const ob$ = await this.rabbitPersonsFilmsService.send({
            cmd: 'parser-persons',
          },
          {});
          const persons = await firstValueFrom(ob$).catch((err) => console.error(err));
          return persons;
    }
    async parsingVideos(){
        const ob$ = await this.rabbitVideosService.send({
            cmd: 'videos-parsing',
          },
          {});
          const persons = await firstValueFrom(ob$).catch((err) => console.error(err));
          return persons;
    }

    async getMoviesByMoviesId(movies:number[]){
        return await this.getAllFilmsWithAllInfoByMoviesId(movies)
    }
    
    async getAllPersonsWithMovies(){
        const ob$ = await this.rabbitPersonsFilmsService.send({
            cmd: 'get-all-persons-with-info',
          },
          {});
          const persons = await firstValueFrom(ob$).catch((err) => console.error(err));
          return persons;
    }
    async getPersonById(id:number){
        const ob$ = await this.rabbitPersonsFilmsService.send({
            cmd: 'get-all-info-personsoffilms-by-personid',
          },
          {id:id});
          const persons = await firstValueFrom(ob$).catch((err) => console.error(err));
          return persons;
    }

    async getPersonInfoByiD(id:number){
        const person = await this.getPersonById(id)
        const allFilmWithh = await this.getAllFilmsWithAllInfo()
        
        let ArrFilm = []
        for(let q = 0 ;q< person[0].movies.length;q++){
            for(let w = 0 ; w< allFilmWithh.length;w++){
                if(person[0].movies[q]===allFilmWithh[w].id){
                    ArrFilm.push(allFilmWithh[w])
                }
            }
        }
        return {
            id:person[0].id,
            name:person[0].name,
            enName:person[0].enName,
            photo:person[0].photo,
            profession:person[0].profession,
            enProfession:person[0].enProfession,
            movies:ArrFilm,
        }
    }

    async getalllDirectors(){
        const ob$ = await this.rabbitPersonsFilmsService.send({
            cmd: 'get-all-directors',
          },
          {});
          const persons = await firstValueFrom(ob$).catch((err) => console.error(err));
          return persons;
    }
  
    async getAllDirectors(){
        const allFilmWithh = await this.getAllFilmsWithAllInfo()
       const directors = await this.getalllDirectors()
       let ArrPersons = []
        for(let q = 0 ; q<directors.length;q++){
            let ArrMovies = []
            for(let w =0 ;w<directors[q].movies.length;w++){
             for(let e = 0 ; e<allFilmWithh.length;e++){
                if(directors[q].movies[w]===allFilmWithh[e].id){
                    ArrMovies.push(allFilmWithh[e])
                }
             }
            }
            ArrPersons.push({
                id:directors[q].id,
                name:directors[q].name,
                enName:directors[q].enName,
                photo:directors[q].photo,
                profession:directors[q].profession,
                enProfession:directors[q].enProfession,
                countMovies:ArrMovies.length,
            })
        }
        return ArrPersons
    }

    async getalllActors(){
        const ob$ = await this.rabbitPersonsFilmsService.send({
            cmd: 'get-all-actors',
          },
          {});
          const persons = await firstValueFrom(ob$).catch((err) => console.error(err));
          return persons;
    }
    
    async getAllActors(){
        const allFilmWithh = await this.getAllFilmsWithAllInfo()
        const actors =  await this.getalllActors()
        let ArrPersons = []
        for(let q = 0 ; q<actors.length;q++){
            let ArrMovies = []
            for(let w =0 ;w<actors[q].movies.length;w++){
             for(let e = 0 ; e<allFilmWithh.length;e++){
                if(actors[q].movies[w]===allFilmWithh[e].id){
                    ArrMovies.push(allFilmWithh[e])
                }
             }
            }
            ArrPersons.push({
                id:actors[q].id,
                name:actors[q].name,
                enName:actors[q].enName,
                photo:actors[q].photo,
                profession:actors[q].profession,
                enProfession:actors[q].enProfession,
                countMovies:ArrMovies.length,
            })
        }
        return ArrPersons
    }

    async getAllPersonsWithInfo(){
        const allFilmWithh = await this.getAllFilmsWithAllInfo()
        const personOfMovies =  await this.getAllPersonsWithMovies()
        let ArrPersons = []
        for(let q = 0 ; q<personOfMovies.length;q++){
            let ArrMovies = []
            for(let w =0 ;w<personOfMovies[q].movies.length;w++){
             for(let e = 0 ; e<allFilmWithh.length;e++){
                if(personOfMovies[q].movies[w]===allFilmWithh[e].id){
                    ArrMovies.push(allFilmWithh[e])
                }
             }
            }
            ArrPersons.push({
                id:personOfMovies[q].id,
                name:personOfMovies[q].name,
                enName:personOfMovies[q].enName,
                photo:personOfMovies[q].photo,
                movies:ArrMovies,
            })
        }
        return ArrPersons
    }

    async getAllGenresOfMovies(){
        const ob$ = await this.rabbitGenresFilmsService.send({
            cmd: 'get-all-genres',
          },
          {});
          const genres = await firstValueFrom(ob$).catch((err) => console.error(err));
          return genres;
    }

    async getAllNamesOfGenres(){
        const ob$ = await this.rabbitnamesofGenresService.send({
            cmd: 'get-namesofgenres',
          },
          {});
          const namesofgenres = await firstValueFrom(ob$).catch((err) => console.error(err));
          return namesofgenres;
    }

    async getAllPersonsOfMovies(){
        const ob$ = await this.rabbitPersonsFilmsService.send({
            cmd: 'get-all-persons',
          },
          {});
          const persons = await firstValueFrom(ob$).catch((err) => console.error(err));
          return persons;
    }

    async getAllCountriesOfMovies(){
        const ob$ = await this.rabbitCountriesFilmsService.send({
            cmd: 'get-all-countries',
          },
          {});
          const countries = await firstValueFrom(ob$).catch((err) => console.error(err));
          return countries;
    }

  
   async getAllCountriesNames() {
        const ob$ = await this.rabbitCountriesNamesService.send({
          cmd: 'get-all-countries-names',
        },
        {});
        const countriesNames = await firstValueFrom(ob$).catch((err) => console.error(err));
        return countriesNames;
      }

   

    async getAllVideosOfFilms(){
        const ob$ = await this.rabbitVideosService.send({
            cmd: 'get-all-videos',
          },
          {});
          const videos = await firstValueFrom(ob$).catch((err) => console.error(err));
          return videos;
    }

  
    async getAllFilmsWithAllInfoWithImax(){
        const films = await this.filmRepository.findAll({where:{hasIMAX:true}})
        const genres = await this.getAllGenresOfMovies()
        const namesofgenres = await this.getAllNamesOfGenres()
        const countries = await this.getAllCountriesOfMovies()
        const countriesNames = await this.getAllCountriesNames()
        let ArrFilms = []
        
        for(let q = 0 ; q < films.length;q++){
            let ArrGenres = []
            for(let w = 0 ; w<genres.length;w++){
                if(genres[w].movieid===films[q].id){
                    for(let e = 0 ; e<namesofgenres.length;e++){
                        if(namesofgenres[e].id===genres[w].genreid){
                            ArrGenres.push({id:namesofgenres[e].id,name:namesofgenres[e].name,enName:namesofgenres[e].enName})
                        }
                    }
                }
            }

            let ArrCountries = []
            for(let w = 0 ;w<countries.length;w++){
                if(countries[w].movieid===films[q].id){
                    for(let e = 0 ; e<countriesNames.length;e++){
                        if(countriesNames[e].id===countries[w].countryid){
                            ArrCountries.push({id:countriesNames[e].id, name:countriesNames[e].name,enName:countriesNames[e].enName }) 
                        }
                    }
                }
                
            }
            
        
  
            ArrFilms.push(
                    {
                    id:films[q].id,
                    name:films[q].name,
                    enName:films[q].enName,
                    posterPreviewURL:films[q].posterPreviewURL,
                    premiereRussia:films[q].premiereRussia,
                    hasIMAX:films[q].hasIMAX,
                    year:films[q].year,
                    ageRating:films[q].ageRating,
                    ratingKp:films[q].ratingKp,
                    votesKp:films[q].votesKp,
                    movieLength:films[q].movieLength,
                    genres:ArrGenres,
                    countries:ArrCountries
                    }
                )
            
        }


        return ArrFilms
    }

    async getAllFilmsWithAllInfo(){
        const films = await this.filmRepository.findAll()
        const genres = await this.getAllGenresOfMovies()
        const namesofgenres = await this.getAllNamesOfGenres()
        const countries = await this.getAllCountriesOfMovies()
        const countriesNames = await this.getAllCountriesNames()
        let ArrFilms = []
        
        for(let q = 0 ; q < films.length;q++){
            let ArrGenres = []
            for(let w = 0 ; w<genres.length;w++){
                if(genres[w].movieid===films[q].id){
                    for(let e = 0 ; e<namesofgenres.length;e++){
                        if(namesofgenres[e].id===genres[w].genreid){
                            ArrGenres.push({id:namesofgenres[e].id,name:namesofgenres[e].name,enName:namesofgenres[e].enName})
                        }
                    }
                }
            }

            let ArrCountries = []
            for(let w = 0 ;w<countries.length;w++){
                if(countries[w].movieid===films[q].id){
                    for(let e = 0 ; e<countriesNames.length;e++){
                        if(countriesNames[e].id===countries[w].countryid){
                            ArrCountries.push({id:countriesNames[e].id, name:countriesNames[e].name,enName:countriesNames[e].enName }) 
                        }
                    }
                }
                
            }
            
        
  
            ArrFilms.push(
                    {
                    id:films[q].id,
                    name:films[q].name,
                    enName:films[q].enName,
                    posterPreviewURL:films[q].posterPreviewURL,
                    premiereRussia:films[q].premiereRussia,
                    hasIMAX:films[q].hasIMAX,
                    year:films[q].year,
                    ageRating:films[q].ageRating,
                    ratingKp:films[q].ratingKp,
                    votesKp:films[q].votesKp,
                    movieLength:films[q].movieLength,
                    genres:ArrGenres,
                    countries:ArrCountries
                    }
                )
            
        }


        return ArrFilms
    }   

    async getAllFilmsWithAllInfoByMoviesId(moviesid:number[]){
        const films = await this.filmRepository.findAll({where:{id:{[Op.in]:moviesid}}})
        const genres = await this.getAllGenresOfMovies()
        const namesofgenres = await this.getAllNamesOfGenres()
        const countries = await this.getAllCountriesOfMovies()
        const countriesNames = await this.getAllCountriesNames()
        let ArrFilms = []
        
        for(let q = 0 ; q < films.length;q++){
            let ArrGenres = []
            for(let w = 0 ; w<genres.length;w++){
                if(genres[w].movieid===films[q].id){
                    for(let e = 0 ; e<namesofgenres.length;e++){
                        if(namesofgenres[e].id===genres[w].genreid){
                            ArrGenres.push({id:namesofgenres[e].id,name:namesofgenres[e].name,enName:namesofgenres[e].enName})
                        }
                    }
                }
            }

            let ArrCountries = []
            for(let w = 0 ;w<countries.length;w++){
                if(countries[w].movieid===films[q].id){
                    for(let e = 0 ; e<countriesNames.length;e++){
                        if(countriesNames[e].id===countries[w].countryid){
                            ArrCountries.push({id:countriesNames[e].id, name:countriesNames[e].name,enName:countriesNames[e].enName }) 
                        }
                    }
                }
                
            }
            
        
  
            ArrFilms.push(
                    {
                    id:films[q].id,
                    name:films[q].name,
                    enName:films[q].enName,
                    posterPreviewURL:films[q].posterPreviewURL,
                    premiereRussia:films[q].premiereRussia,
                    hasIMAX:films[q].hasIMAX,
                    year:films[q].year,
                    ageRating:films[q].ageRating,
                    ratingKp:films[q].ratingKp,
                    votesKp:films[q].votesKp,
                    movieLength:films[q].movieLength,
                    genres:ArrGenres,
                    countries:ArrCountries
                    }
                )
            
        }


        return ArrFilms
    }  





  async formDatabase() {
    const movieREQ =  await fetch(`https://api.kinopoisk.dev/v1/movie?type=movie&type=cartoon&selectFields=\
rating%20votes%20movieLength%20images%20id%20type%20\
name%20description%20\
premiere%20year%20poster%20alternativeName%20ageRating%20\
shortDescription%20technology%20imagesInfo&sortField=votes.kp&sortType=-1&page=1&limit=1000`, {
        method: 'GET',
        headers: {
            'X-API-KEY': 'QTD9VCR-EW8M0Y4-QR6W0Y1-Y8J1BFT',
            'Content-Type': 'application/json',
        },
    })
    let FilmArr = []
    let RepfIMS = await this.filmRepository.findAll()
    for(let i = 0 ; i < RepfIMS.length;i++){
        FilmArr.push(RepfIMS[i].id)
    }
    if(movieREQ.ok){
        let json = await movieREQ.json();
        let arrMovies = []
        for(let i = 0; i <json.docs.length;i++){
            if((FilmArr.includes(json.docs[i].id))===false){
                await arrMovies.push(
                {   
                    id:json.docs[i].id,
                    type:json.docs[i].type,
                    name:json.docs[i].name,
                    enName:json.docs[i].alternativeName,
                    posterUrl:json.docs[i].poster?.url, 		
                    posterPreviewURL:json.docs[i].poster?.previewUrl,	
                    premiereRussia:json.docs[i].premiere?.russia, 		
                    hasIMAX:json.docs[i].technology?.hasImax,
                    year:json.docs[i].year,
                    description:json.docs[i].description,
                    shortDescription:json.docs[i].shortDescription,
                    ageRating:json.docs[i].ageRating,
                    ratingKp:json.docs[i].rating?.kp,	
                    votesKp:json.docs[i].votes?.kp,		
                    movieLength:json.docs[i].movieLength

                }
                )

            }
        }
        await this.filmRepository.bulkCreate(arrMovies)
        await this.parsingNamesOfCountries()
        await this.parsingCountries()
        await this.parsingGenresNames()
        await this.parsingGenresOfMovie()
        await this.parsingPersons()
        await this.parsingVideos()
        return  'Данные получены'
        
      }
      else{
        console.log("Ошибка HTTP: " + movieREQ.status);
      }

    }
    

    

    async getGenresByMovieId(id:number){
        const ob$ = await this.rabbitGenresFilmsService.send({
          cmd: 'get-genres-by-moveid',
        },
        {id:id});
        const genres = await firstValueFrom(ob$).catch((err) => console.error(err));
        return genres;
    }

    async getCountriesByMovieId(id:number){
        const ob$ = await this.rabbitCountriesFilmsService.send({
          cmd: 'get-countries-by-movieid',
        },
        {id:id});
        const countries = await firstValueFrom(ob$).catch((err) => console.error(err));
        return countries;
    }
   
 

    async getPersonsByMovieId(id:number){
        const ob$ = await this.rabbitPersonsFilmsService.send({
          cmd: 'get-personsoffilms-by-moveid',
        },
        {id:id});
        const persons = await firstValueFrom(ob$).catch((err) => console.error(err));
        return persons;
    }
    async getVideosByMovieId(id:number){
        const ob$ = await this.rabbitVideosService.send({
          cmd: 'get-videos-by-moveid',
        },
        {id:id});
        const videos = await firstValueFrom(ob$).catch((err) => console.error(err));
        return videos;
    }
    
    async getCommentsByMovieId(idF:number){
        const ob$ = await this.rabbitCommentService.send({
            cmd: 'get-comments-by-filmid',
          },
          {idF:idF});
          const videos = await firstValueFrom(ob$).catch((err) => console.error(err));
          return videos;
    }
  
    async getFilmById(idF:number){
        const film = await this.filmRepository.findOne({where:{id:idF}})
        const genres = await this.getGenresByMovieId(idF)
        const namesofgenres = await this.getAllNamesOfGenres()
        const countries = await this.getCountriesByMovieId(idF)
        const countriesNames = await this.getAllCountriesNames()
        const persons = await this.getPersonsByMovieId(idF)
        const videos = await this.getVideosByMovieId(idF)   
        const comments = await this.getCommentsByMovieId(idF)
        
        let ArrGenresWatchingWithMovie = []
        let ArrGenres = []
        for(let w = 0 ; w<genres.length;w++){
            for(let e = 0 ; e<namesofgenres.length;e++){
                if(namesofgenres[e].id===genres[w].genreid){
                    ArrGenresWatchingWithMovie.push(namesofgenres[e].id)
                    ArrGenres.push({id:namesofgenres[e].id, name:namesofgenres[e].name,enName:namesofgenres[e].enName   })
                }
            }
                
        }
        let ArrCountriesWatchithWithMovie = []
        let ArrCountries = []
        for(let w = 0 ;w<countries.length;w++){
            for(let e = 0 ; e<countriesNames.length;e++){
                if(countriesNames[e].id===countries[w].countryid){
                    ArrCountriesWatchithWithMovie.push(countriesNames[e].id)
                    ArrCountries.push({id:countriesNames[e].id, name:countriesNames[e].name,enName:countriesNames[e].enName }) 
                }
            }
                
                
        }
        let arrWatchingWithMovies = []
        for(let q = 0 ; q <ArrCountriesWatchithWithMovie.length;q++){
            for(let w = 0 ; w<ArrGenresWatchingWithMovie.length;w++){
                if((ArrCountriesWatchithWithMovie===ArrGenresWatchingWithMovie)&&arrWatchingWithMovies.includes(ArrCountriesWatchithWithMovie)===false){
                    arrWatchingWithMovies.push(ArrCountriesWatchithWithMovie)
                }
            }
        }

    
        let count = 0
        let ArrFilmBtDirector = []
        let ArrPersonsOfMovies = []
        for(let w = 0 ;w<persons.length;w++){
          
            if((persons[w].profession.includes('режиссеры'))&&(count===0)){
                const filmByDirector = await this.getAllMoviesByDirector(persons[w].name)
                for(let b = 0 ; b <filmByDirector.length;b++){
                    if(filmByDirector[b].movieid!=idF){
                        ArrFilmBtDirector.push(filmByDirector[b].movieid)
                        count+=1
                    }
                    
                }
            }
            ArrPersonsOfMovies.push(
                {
                    id:persons[w].id,
                    name:persons[w].name,
                    enName:persons[w].enName,
                    photo:persons[w].photo,
                    profession:persons[w].profession,
                    enProfession:persons[w].enProfession,
                    countMovies:persons[w].movies,
                }
            )
                
        }
        
        
       
        let ArrVideos = []
        for(let q = 0 ; q< videos.length;q++){
            if(videos[q].site==='youtube'){
                ArrVideos.push(videos[q].url)
            }
        }
        
        const WhatchinFithfilms = await this.getAllFilmsWithAllInfoByMoviesId(ArrFilmBtDirector) 
        let ArrComments = []
        if(comments!=undefined){
            for(let q = 0 ; q<comments.length;q++){
                if(comments[q].parentId===null){
                    let ArrCildeComments = []
                for(let w = 0 ;w < comments.length;w++){
                        if(comments[q].id===comments[w].parentId){
                            ArrCildeComments.push(
                                {
                                    id:comments[w].id,
                                    user:comments[w].user,
                                    date:comments[w].date,
                                    text:comments[w].text
                                }
                                )
                        }
                    }
                    ArrComments.push(
                        {
                            id:comments[q].id,
                            user:comments[q].user,
                            date:comments[q].date,
                            text:comments[q].text,
                            childComment:ArrCildeComments,
                        }
                        )
    
                }
                }
        }
        
            
        
        return {
            id:film.id,
            type:film.type,
            name:film.name,
            enName:film.enName,
            posterUrl:film.posterUrl,
            posterPreviewURL:film.posterPreviewURL,
            year:film.year,
            description:film.description,
            shortDescription:film.shortDescription,
            ageRating:film.ageRating,
            ratingKp:film.ratingKp,
            votesKp:film.votesKp,
            movieLength:film.movieLength,
            genres:ArrGenres,
            countries:ArrCountries,
            persons:ArrPersonsOfMovies,
            trailer :ArrVideos[0],
            watchingWithMovie: WhatchinFithfilms,
            comments:ArrComments
            
        }
    }











    async getAllFilms(){
        return this.filmRepository.findAll()
    }




///// Фильры ///////////////////////////////////////////////////////////////////////////////////////////////

    async getMoviesByRatingKp(rating:number){
        const films = await this.getAllFilmsWithAllInfo()
        let Arrfilm = []
        for(let i = 0 ;i<films.length;i++ ){
            if(films[i].film.ratingkp>=rating){
                Arrfilm.push(films[i])
            }
            
        }
        return Arrfilm.sort((a, b) => a.film.ratingkp - b.film.ratingkp)
    }
    

    async getMoviesByVotesKinopoisk(votes:number){
        const films = await this.getAllFilmsWithAllInfo()
        let Arrfilm = []
        for(let i = 0 ;i<films.length;i++ ){
            if(films[i].film.voteskp>=votes){
                Arrfilm.push(films[i])
            }
            
        }
        return Arrfilm.sort((a, b) => a.film.voteskp - b.film.voteskp)
        
    }
    async getAllMoviesByDirector(director:string){
        const ob$ = await this.rabbitPersonsFilmsService.send({
            cmd: 'get-movies-by-director',
          },
          {director:director});
          const persons = await firstValueFrom(ob$).catch((err) => console.error(err));
          return persons;
    }
    async getFilmsByDirector(director:string){
        const films = await this.getAllFilmsWithAllInfo()
        const persons = await this.getAllMoviesByDirector(director)
        let ArrFilm = []
        for(let q = 0 ; q < persons.length;q++){
            for(let w = 0 ; w <films.length;w++){
                if(persons[q].movieid===films[w].film.id){
                    ArrFilm.push(films[w])
                }
            }
        }
        return ArrFilm
    }
    async getMoviesByActor(actor:string){
        const ob$ = await this.rabbitPersonsFilmsService.send({
            cmd: 'get-movies-by-actor',
          },
          {actor:actor});
          const persons = await firstValueFrom(ob$).catch((err) => console.error(err));
          return persons;
    }
    async getFilmsByActor(actor:string){
        const films = await this.getAllFilmsWithAllInfo()
        const persons = await this.getMoviesByActor(actor)
        let ArrFilm = []
        for(let q = 0 ; q < persons.length;q++){
            for(let w = 0 ; w <films.length;w++){
                if(persons[q].movieid===films[w].film.id){
                    ArrFilm.push(films[w])
                }
            }
        }
        return ArrFilm
    }


    async getAllMoviesByDirectorAndActor(str:string){
        const ob$ = await this.rabbitPersonsFilmsService.send({
            cmd: 'get-movies-by-director-and-actor',
          },
          {
            str:str,
        }
        );
          const persons = await firstValueFrom(ob$).catch((err) => console.error(err));
          return persons;
    }
    async getFilmsByDirectorActor(str:string){
        const films = await this.getAllFilmsWithAllInfo()
        const persons = await this.getAllMoviesByDirectorAndActor(str)
        let ArrFilm = []
        for(let q = 0 ; q < persons.length;q++){
            for(let w = 0 ; w <films.length;w++){
                if(persons[q].movieid===films[w].film.id){
                    ArrFilm.push(films[w])
                }
            }
        }
        return ArrFilm
    }


    
    async getMoviesGenresByNames(ArrGenres:string[]){
        const ob$ = await this.rabbitnamesofGenresService.send({
            cmd: 'get-genres-by-names',
          },
          {
            ArrGenres:ArrGenres,
        }
        );
          const arrGenres = await firstValueFrom(ob$).catch((err) => console.error(err));
          return arrGenres;
    }
    async getCountriesByName(ArrCountries:string[]){
        const ob$ = await this.rabbitCountriesNamesService.send({
            cmd: 'get-countries-by-names',
          },
          {
            ArrCountries:ArrCountries,
        }
        );
          const arrCountries = await firstValueFrom(ob$).catch((err) => console.error(err));
          return arrCountries;
    }
    async getMoviesByCountriesId(countriesid:number[]){
        const ob$ = await this.rabbitCountriesFilmsService.send({
            cmd: 'get-movies-by-countries-id',
          },
          {countriesid:countriesid});
          const countries = await firstValueFrom(ob$).catch((err) => console.error(err));
          return countries;
    }
 

    async getFilmsByGenreId(genreid:number[]){
        const ob$ = await this.rabbitGenresFilmsService.send({
          cmd: 'get-movies-by-genreid',
        },
        {genreid:genreid});
        const genres = await firstValueFrom(ob$).catch((err) => console.error(err));
        return genres;
    }


    async getGenresByMoviesId(moviesId:number[]){
        const ob$ = await this.rabbitGenresFilmsService.send({
            cmd: 'get-genres-by-moveies-id',
          },
          {moviesId:moviesId});
          const genres = await firstValueFrom(ob$).catch((err) => console.error(err));
          return genres;
    }
    async getCountriesByMoviesId(moviesid:  number[]){
        const ob$ = await this.rabbitCountriesFilmsService.send({
            cmd: 'get-countriesofmovie-by-movies-id',
          },
          {moviesid:moviesid});
          const countries = await firstValueFrom(ob$).catch((err) => console.error(err));
          return countries;
    }



    async getPersonsOfMoviesByMoviesId(moviesid:number[]){
        const ob$ = await this.rabbitPersonsFilmsService.send({
            cmd: 'get-personsoffilms-by-movesid',
          },
          {moviesid:moviesid});
          const persons = await firstValueFrom(ob$).catch((err) => console.error(err));
          return persons;
    }

    async getVideosOfMoviesByMoviesId(moviesid:number[]){
        const ob$ = await this.rabbitVideosService.send({
            cmd: 'get-videos-by-movesid',
          },
          {moviesid:moviesid});
          const persons = await firstValueFrom(ob$).catch((err) => console.error(err));
          return persons;
    }

   
    async getFilmsUseFiltre(queryParams:any){
        const {limit, type, page ,genres, countries, ratingKp, votesKp, director,actor, SortField,SortType} = queryParams; 
       
        
        if(queryParams.queryParams.limit===undefined){
            queryParams.queryParams.limit = 10
        }
        if(queryParams.queryParams.page===undefined){
            queryParams.queryParams.page = 1
        }
        if(queryParams.queryParams.SortField===undefined){
            queryParams.queryParams.SortField ="votesKp"
        }
        if(queryParams.queryParams.SortType===undefined){
            queryParams.queryParams.SortType = '1'
        }
     
     

       
        let ArrFilmId =[]
        
        if((queryParams.queryParams.countries!=undefined)&&(queryParams.queryParams.genres===undefined)){        /////////////////////////////////// Страны
 
            
            let ArrCountriesId =[]
            if((typeof(queryParams.queryParams.countries)==='object')){
                const Countries = await this.getCountriesByName(queryParams.queryParams.countries)
                for(let q = 0 ; q <Countries.length;q++){
                    ArrCountriesId.push(Countries[q].id)
                }
                const FilmByCountriesId = await this.getMoviesByCountriesId(ArrCountriesId)
                for(let q = 0 ; q <FilmByCountriesId.length;q++){
                    ArrFilmId.push(FilmByCountriesId[q].movieid)
                }
                
        
            }

            else if ((typeof(queryParams.queryParams.countries)==='string')){
                queryParams.queryParams.countries = [queryParams.queryParams.countries]
                const Countries = await this.getCountriesByName(queryParams.queryParams.countries)
                for(let q = 0 ; q <Countries.length;q++){
                    ArrCountriesId.push(Countries[q].id)
                }
                const FilmByCountriesId = await this.getMoviesByCountriesId(ArrCountriesId)
                for(let q = 0 ; q <FilmByCountriesId.length;q++){
                    ArrFilmId.push(FilmByCountriesId[q].movieid)
                }

                
                
            }
            

        }

        if((queryParams.queryParams.genres!=undefined)&&(queryParams.queryParams.countries===undefined)){ ///////////////////////////////// Жанры
 
            let ArrGenreId = []
            if((typeof(queryParams.queryParams.genres)==='object')){
                const FilmByGenres = await this.getMoviesGenresByNames(queryParams.queryParams.genres)
                
                for(let q =0; q <FilmByGenres.length;q++){
                    ArrGenreId.push(FilmByGenres[q].id)
                }
                const arrFilmByGenreId = await this.getFilmsByGenreId(ArrGenreId)
                for(let q = 0 ;q <arrFilmByGenreId.length;q++){
                    if(ArrFilmId.includes(arrFilmByGenreId[q].movieid)===false){
                        ArrFilmId.push(arrFilmByGenreId[q].movieid )
                    }
                }
            }
            else if(typeof(queryParams.queryParams.genres)==='string'){
                queryParams.queryParams.genres = [queryParams.queryParams.genres]
                const FilmByGenres = await this.getMoviesGenresByNames(queryParams.queryParams.genres)
                for(let q =0; q <FilmByGenres.length;q++){
                    ArrGenreId.push(FilmByGenres[q].id)
                }
                const arrFilmByGenreId = await this.getFilmsByGenreId(ArrGenreId)
                for(let q = 0 ;q <arrFilmByGenreId.length;q++){
                    if(ArrFilmId.includes(arrFilmByGenreId[q].movieid)===false){
                        ArrFilmId.push(arrFilmByGenreId[q].movieid)
                    }
                }
            }
        }
        if((queryParams.queryParams.genres!=undefined)&&(queryParams.queryParams.countries!=undefined)){  ////////////////////////////////// Страны, жанры

            let ArrGenreId = []
            let ArrMoviesGenreId = []
            if((typeof(queryParams.queryParams.genres)==='object')){
                const FilmByGenres = await this.getMoviesGenresByNames(queryParams.queryParams.genres)
                
                for(let q =0; q <FilmByGenres.length;q++){
                    ArrGenreId.push(FilmByGenres[q].id)
                }
                const arrFilmByGenreId = await this.getFilmsByGenreId(ArrGenreId)
                for(let q = 0 ;q <arrFilmByGenreId.length;q++){
                    if(ArrMoviesGenreId.includes(arrFilmByGenreId[q].movieid)===false){
                        ArrMoviesGenreId.push(arrFilmByGenreId[q].movieid )
                    }
                }
            }
            else if(typeof(queryParams.queryParams.genres)==='string'){
                queryParams.queryParams.genres = [queryParams.queryParams.genres]
                const FilmByGenres = await this.getMoviesGenresByNames(queryParams.queryParams.genres)
                for(let q =0; q <FilmByGenres.length;q++){
                    ArrGenreId.push(FilmByGenres[q].id)
                }
                const arrFilmByGenreId = await this.getFilmsByGenreId(ArrGenreId)
                for(let q = 0 ;q <arrFilmByGenreId.length;q++){
                    if(ArrMoviesGenreId.includes(arrFilmByGenreId[q].movieid)===false){
                        ArrMoviesGenreId.push(arrFilmByGenreId[q].movieid)
                    }
                }
            }



            let ArrMoviesCountriesId = []
            let ArrCountriesId =[]
            if((typeof(queryParams.queryParams.countries)==='object')){
                const Countries = await this.getCountriesByName(queryParams.queryParams.countries)
                for(let q = 0 ; q <Countries.length;q++){
                    ArrCountriesId.push(Countries[q].id)
                }
                const FilmByCountriesId = await this.getMoviesByCountriesId(ArrCountriesId)
                for(let q = 0 ; q <FilmByCountriesId.length;q++){
                    if(ArrMoviesCountriesId.includes(FilmByCountriesId[q].movieid)===false){
                        ArrMoviesCountriesId.push(FilmByCountriesId[q].movieid)
                    }
                    
                }
                
        
            }

            else if ((typeof(queryParams.queryParams.countries)==='string')){
                queryParams.queryParams.countries = [queryParams.queryParams.countries]
                const Countries = await this.getCountriesByName(queryParams.queryParams.countries)
                for(let q = 0 ; q <Countries.length;q++){
                    ArrCountriesId.push(Countries[q].id)
                }
                const FilmByCountriesId = await this.getMoviesByCountriesId(ArrCountriesId)
                for(let q = 0 ; q <FilmByCountriesId.length;q++){
                    if(ArrMoviesCountriesId.includes(FilmByCountriesId[q].movieid)===false){
                        ArrMoviesCountriesId.push(FilmByCountriesId[q].movieid)
                    }
                }

                
                
            }
            for(let q = 0 ;q <ArrMoviesCountriesId.length;q++){
                for(let w = 0 ;w <ArrMoviesGenreId.length;w++){
                    if(ArrMoviesCountriesId[q]===ArrMoviesGenreId[w]){
                        ArrFilmId.push(ArrMoviesCountriesId[q])
                        q++
                    }
                }
            }
           
            
            
        
        }


    let films = []
    let ArrFilmswithDirectorIdOrActor = []

    const filtre = {...({id:{[Op.in]:ArrFilmId}}),...(queryParams.queryParams.type && {type:{[Op.eq]:queryParams.queryParams.type}}),...(queryParams.queryParams.ratingKp && {ratingKp: {[Op.gte]: queryParams.queryParams.ratingKp}}),
    ...(queryParams.queryParams.votesKp&&{votesKp:{[Op.gte]:queryParams.queryParams.votesKp}}),}
    const FiltreType = {...(queryParams.queryParams.type && {type:{[Op.eq]:queryParams.queryParams.type}}),...(queryParams.queryParams.ratingKp && {ratingKp: {[Op.gte]: queryParams.queryParams.ratingKp}}),
    ...(queryParams.queryParams.votesKp&&{votesKp:{[Op.gte]:queryParams.queryParams.votesKp}})}
    const filtreWithActorOrDirecor = {...({id:{[Op.in]:ArrFilmswithDirectorIdOrActor}}),...(queryParams.queryParams.type && {type:{[Op.eq]:queryParams.queryParams.type}}),...(queryParams.queryParams.ratingKp && {ratingKp: {[Op.gte]: queryParams.queryParams.ratingKp}}),
    ...(queryParams.queryParams.votesKp&&{votesKp:{[Op.gte]:queryParams.queryParams.votesKp}}),}
    const FiltreRatingKPvotesKP = {...(queryParams.queryParams.ratingKp && {ratingKp: {[Op.gte]: queryParams.queryParams.ratingKp}}),
    ...(queryParams.queryParams.votesKp&&{votesKp:{[Op.gte]:queryParams.queryParams.votesKp}})}




    if(((queryParams.queryParams.countries!=undefined)||(queryParams.queryParams.genres!=undefined))&& ///// жанры или cтраны 
    (queryParams.queryParams.director===undefined)&&(queryParams.queryParams.actor===undefined)){
            const Flilms = await this.filmRepository.findAll({where:filtre
            })
            for(let q = 0 ; q <Flilms.length;q++){
            films.push(Flilms[q])
            }
            
            
          
        

    }

    else if(((queryParams.queryParams.countries!=undefined)||(queryParams.queryParams.genres!=undefined))&& ///// жанры или фильмы и режисер
    (queryParams.queryParams.director!=undefined)&&(queryParams.queryParams.actor===undefined)){
        const persons = await this.getAllMoviesByDirector(queryParams.queryParams.director)
            
            for(let q = 0 ; q <persons.length;q++ ){
                if(ArrFilmId.includes(persons[q].movieid)){
                    ArrFilmswithDirectorIdOrActor.push(persons[q].movieid)
                }
            }
    
           
                const Flilms = await this.filmRepository.findAll({where:filtreWithActorOrDirecor
                })
                for(let q = 0 ; q <Flilms.length;q++){
                    films.push(Flilms[q])
                }
            
        
        
        
    }
    else if(((queryParams.queryParams.countries!=undefined)||(queryParams.queryParams.genres!=undefined))&& ///// жанры или  и актер 
    (queryParams.queryParams.director===undefined)&&(queryParams.queryParams.actor!=undefined)){
        const persons = await this.getMoviesByActor(queryParams.queryParams.actor)
        for(let q = 0 ; q <persons.length;q++ ){
            if(ArrFilmId.includes(persons[q].movieid)){
                ArrFilmswithDirectorIdOrActor.push(persons[q].movieid)
            }
        }
       
                const Flilms = await this.filmRepository.findAll({where:filtreWithActorOrDirecor
                })
                for(let q = 0 ; q <Flilms.length;q++){
                    films.push(Flilms[q])
                }
            
        
        
    }
    else if ((queryParams.queryParams.director!=undefined)&&(queryParams.queryParams.actor===undefined)&&  ///// режисер , рейтиг КП, голоса КП
    (queryParams.queryParams.countries===undefined)&&(queryParams.queryParams.genres===undefined)){
        const persons = await this.getAllMoviesByDirector(queryParams.queryParams.director)
        for(let q = 0 ; q <persons.length;q++){
            ArrFilmId.push(persons[q].movieid)
        }
        
           
                const Flilms = await this.filmRepository.findAll({where:filtre
                })
                for(let q = 0 ; q <Flilms.length;q++){
                    films.push(Flilms[q])
                }
            
            
        
    }
    else if ((queryParams.queryParams.director===undefined)&&(queryParams.queryParams.actor!=undefined)&& //// актер , рейтиг КП, голоса КП
    (queryParams.queryParams.countries===undefined)&&(queryParams.queryParams.genres===undefined)){
        const persons = await this.getMoviesByActor(queryParams.queryParams.actor)
        for(let q = 0 ; q <persons.length;q++){
            ArrFilmId.push(persons[q].movieid)
        }
        
                const Flilms = await this.filmRepository.findAll({where:filtre
                })
                for(let q = 0 ; q <Flilms.length;q++){
                    films.push(Flilms[q])
                }
           
          
        
        

    }
    else if(((queryParams.queryParams.countries!=undefined)||(queryParams.queryParams.genres!=undefined))&& ///// жанры или фильмы и режисер и актер , рейтиг КП, голоса КП
    (queryParams.queryParams.director!=undefined)&&(queryParams.queryParams.actor!=undefined)){
        let str = queryParams.queryParams.director+'@'+queryParams.queryParams.actor
        const persons = await this.getAllMoviesByDirectorAndActor(str)
      
        for(let q = 0 ; q <persons.length;q++ ){
            if(ArrFilmId.includes(persons[q].movieid)){
                ArrFilmswithDirectorIdOrActor.push(persons[q].movieid)
            }
        }
        
            const Flilms = await this.filmRepository.findAll({where:filtreWithActorOrDirecor
            })
            for(let q = 0 ; q <Flilms.length;q++){
                films.push(Flilms[q])
            }
        

        
        
    }
    else if ((queryParams.queryParams.director!=undefined)&&(queryParams.queryParams.actor!=undefined)&& //// актер и режисер, рейтиг КП, голоса КП
    (queryParams.queryParams.countries===undefined)&&(queryParams.queryParams.genres===undefined)){
        let str = queryParams.queryParams.director+'@'+queryParams.queryParams.actor
        const persons = await this.getAllMoviesByDirectorAndActor(str)
        for(let q = 0 ; q <persons.length;q++){
            ArrFilmId.push(persons[q].movieid)
        }
       
        
                const Flilms = await this.filmRepository.findAll({where:filtre
                })
                for(let q = 0 ; q <Flilms.length;q++){
                    films.push(Flilms[q])
                }
            
            
        
    }
    else if ((queryParams.queryParams.director===undefined)&&(queryParams.queryParams.actor===undefined)&& //// тип, рейтинг КП, голоса КП
    (queryParams.queryParams.countries===undefined)&&(queryParams.queryParams.genres===undefined)&&(queryParams.queryParams.type!=undefined)&&((queryParams.queryParams.ratingKp!=undefined)||queryParams.queryParams.votesKp!=undefined)){
       const Films= await this.filmRepository.findAll({where:FiltreType})
        for(let q = 0 ; q <Films.length;q++){
            films.push(Films[q])
            ArrFilmId.push(Films[q].id)
        }
    }
    else if ((queryParams.queryParams.director===undefined)&&(queryParams.queryParams.actor===undefined)&& //// рейтинг КП, голоса КП
    (queryParams.queryParams.countries===undefined)&&(queryParams.queryParams.genres===undefined)&&(queryParams.queryParams.type===undefined)&&((queryParams.queryParams.ratingKp!=undefined)||queryParams.queryParams.votesKp!=undefined)){
       const Films= await this.filmRepository.findAll({where:FiltreRatingKPvotesKP})
        for(let q = 0 ; q <Films.length;q++){
            films.push(Films[q])
            ArrFilmId.push(Films[q].id)
            
        }
    }   
    if(films.length===0){
        const Films = await this.filmRepository.findAll()
        queryParams.queryParams.limit=Films.length
        for(let q = 0 ;q <Films.length;q++){
            films.push(Films[q])
            ArrFilmId.push(Films[q].id)
        }
    }
    
        const genresInfo = await this.getGenresByMoviesId(ArrFilmId)
        const namesofgenres = await this.getAllNamesOfGenres()
        const countriesInfo = await this.getCountriesByMoviesId(ArrFilmId)
        const countriesNames = await this.getAllCountriesNames()
    
        let AllFilms = await this.filmRepository.findAll()
        if(queryParams.queryParams.limit>AllFilms.length){
            queryParams.queryParams.limit = AllFilms.length
        }


                                                  
        if((queryParams.queryParams.SortField==='votesKp')&&(queryParams.queryParams.SortType==='1')){
            films.sort((a, b) => b.votesKp - a.votesKp) 
            
        }
        else if ((queryParams.queryParams.SortField==='votesKp')&&(queryParams.queryParams.SortType==='-1')){
            films.sort((a, b) => a.votesKp - b.votesKp) 
            
        
        }
        else if ((queryParams.queryParams.SortField==='ratingKp')&&(queryParams.queryParams.SortType==='1')){
            films.sort((a, b) => b.ratingKp - a.ratingKp) 
            
        }
        else if ((queryParams.queryParams.SortField==='ratingKp')&&(queryParams.queryParams.SortType==='-1')){
            films.sort((a, b) => a.ratingKp - b.ratingKp) 
            
        }
        else if ((queryParams.queryParams.SortField==='name')&&(queryParams.queryParams.SortType==='1')){
            films.sort((a, b) => {
                const nameA = a.name.toUpperCase(); // ignore upper and lowercase
                const nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                  return 1;
                }
                if (nameA > nameB) {
                  return -1;
                }
              
                // names must be equal
                return 0;
              });
              
        }
        else if ((queryParams.queryParams.SortField==='name')&&(queryParams.queryParams.SortType==='-1')){
            films.sort((a, b) => {
                const nameA = a.name.toUpperCase(); // ignore upper and lowercase
                const nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
              
                // names must be equal
                return 0;
              });
              
        }
        else if ((queryParams.queryParams.SortField==='year')&&(queryParams.queryParams.SortType==='1')){
            films.sort((a, b) => b.year - a.year) 
            
        }
        else if ((queryParams.queryParams.SortField==='year')&&(queryParams.queryParams.SortType==='-1')){
            films.sort((a, b) => a.year - b.year) 
            
        }
        
                                                                                                           
        
            let FilmsLenth = queryParams.queryParams.limit*queryParams.queryParams.page
            let ArrFilm = []
            let ArrFilmPage = []
            let Page = 1
            let count = 0
            if(films.length<FilmsLenth){
                FilmsLenth =films.length
            }
            for(let q = 0 ; q<FilmsLenth;q++){
            let ArrGenres = []
            for(let w = 0 ; w<genresInfo.length;w++){
                if(genresInfo[w].movieid===films[q].id){
                    for(let e = 0 ; e<namesofgenres.length;e++){
                        if(namesofgenres[e].id===genresInfo[w].genreid){
                            ArrGenres.push({id:namesofgenres[e].id,name:namesofgenres[e].name,enName:namesofgenres[e].enName})
                        }
                    }
                }
            }

            let ArrCountries = []
            for(let w = 0 ;w<countriesInfo.length;w++){
                if(countriesInfo[w].movieid===films[q].id){
                    for(let e = 0 ; e<countriesNames.length;e++){
                        if(countriesNames[e].id===countriesInfo[w].countryid){
                            ArrCountries.push({id:countriesNames[e].id, name:countriesNames[e].name,enName:countriesNames[e].enName }) 
                        }
                    }
                }
                
            }
                ArrFilmPage.push(
                    {
                        id:films[q].id,
                        name:films[q].name,
                        enName:films[q].enName,
                        posterPreviewURL:films[q].posterPreviewURL,
                        premiereRussia:films[q].premiereRussia,
                        hasImax:films[q].hasImax,
                        year:films[q].year,
                        ageRating:films[q].ageRating,
                        ratingKp:films[q].ratingKp,
                        votesKp:films[q].votesKp,
                        movieLength:films[q].movieLength,
                        genres:ArrGenres,
                        countries:ArrCountries,
    
                    }
                )
                count+=1
                if((count==queryParams.queryParams.limit||count===FilmsLenth)){
                    ArrFilm.push({
                        page:ArrFilmPage,
                        pageLenth:ArrFilmPage.length,
                        Npage:Page,
                    })
                    Page+=1
                    count=0
                    ArrFilmPage=[]
                }
                
            }
                                                                                                
            return {
                docs:ArrFilm,
                limit:queryParams.queryParams.limit,
                page:queryParams.queryParams.page,
                lenth:ArrFilm.length
            }
            
}

    
        

    
    async updateNameMovie(dto:FilmDto){
        const film =  await this.filmRepository.findOne({where: {id: dto.id}})
        film.name = dto.name;
        film.enName = dto.enName;
        film.save();
        return film

    }
    async clearCountries(){
        const ob$ =await this.rabbitCountriesFilmsService.send({
            cmd: 'clear-countries',
        },
        {});
        const countries = await firstValueFrom(ob$).catch((err) => console.error(err));
        return countries;
    }
    async clearGenres(){
        const ob$ =await this.rabbitGenresFilmsService.send({
            cmd: 'clear-genres',
        },
        {});
        const genres = await firstValueFrom(ob$).catch((err) => console.error(err));
        return genres;
          
    }
    async clearPersons(){
        const ob$ =await this.rabbitPersonsFilmsService.send({
            cmd: 'clear-persons',
        },
        {});
        const persons = await firstValueFrom(ob$).catch((err) => console.error(err));
        return persons;
          
    }
    async clearVideos(){
        const ob$ =await this.rabbitVideosService.send({
            cmd: 'clear-videos',
          },
          {});
        const videos = await firstValueFrom(ob$).catch((err) => console.error(err));
        return videos;
          
    }
    async clearComments(){
        const ob$ =await this.rabbitCommentService.send({
            cmd: 'clear-comments',
          },
          {});
        const comments = await firstValueFrom(ob$).catch((err) => console.error(err));
        return comments;
          
    }
    async deleteFilm(idF:number){
        
        await this.filmRepository.destroy({where:{id:idF}})
        const countries =  await this.clearCountries()
        const genres = await this.clearGenres()
        const persons= await this.clearPersons()
        const videos = await this.clearVideos()
        const comments = await this.clearComments()
        return `Фильм с id ${idF} удален`+'; '+countries+'; '+genres+'; '+persons+'; '+videos+'; '+comments+';'
    }
  async postFilm(dto:CreateFilmDto){
    const films = await this.filmRepository.findAll()
    for(let q = 0 ;q<films.length;q++){
        if(films[q].name===dto.name){
            throw new Error('Фильм с таким названием уже есть базе данных')
        }
    }
    return await this.filmRepository.create(dto)
  }


}
