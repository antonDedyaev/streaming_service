import { Injectable,Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Persons } from './personofmovie.model';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Op, where } from 'sequelize';


@Injectable()
export class PersonsService {
  constructor(@InjectModel(Persons) private personsRepository:typeof Persons,
  @Inject('FILM_SERVICE') private rabbitFilmsService: ClientProxy,){}


  async getAllFilms() {
    const ob$ = await this.rabbitFilmsService.send({
      cmd: 'get-all-films',
    },
    {});
    const films = await firstValueFrom(ob$).catch((err) => console.error(err));
    return films;
  }

  
  async getAllPersonsWithAllInfo(){
   const persons =  await this.personsRepository.findAll()
   let ArrPersons = []
  let ArrPeronsId = []
    for(let q = 0; q < persons.length;q++){
      if(ArrPeronsId.includes(persons[q].personid)===false){
        ArrPersons.push(persons[q])
        ArrPeronsId.push(persons[q].personid)
      }
    }
    let ArrPersonWithMovies = []
   for(let q=0;q<ArrPersons.length;q++ ){
    let ArrPersonFilms = []
    for(let w = 0; w <persons.length;w++){
      if((ArrPersons[q].personid===persons[w].personid)&&(ArrPersonFilms.includes(persons[w].movieid)===false)){
        ArrPersonFilms.push(persons[w].movieid)
       
      }
    }

    
   
    ArrPersonWithMovies.push({
      id:ArrPersons[q].personid,
      name:ArrPersons[q].name,
      enName:ArrPersons[q].enName,
      photo:ArrPersons[q].photo,
      movies:ArrPersonFilms
    })

   }
    return ArrPersonWithMovies
    
    
  }
  

  async getAllInfoOfPersonsByPersonId(idP:number){
    const persons = await this.personsRepository.findAll({where:{personid:idP}})
    let ArrPersons = []
  let ArrPeronsId = []
    for(let q = 0; q < persons.length;q++){
      if(ArrPeronsId.includes(persons[q].personid)===false){
        ArrPersons.push(persons[q])
        ArrPeronsId.push(persons[q].personid)
      }
    }
    let ArrPersonWithMovies = []
   for(let q=0;q<ArrPersons.length;q++ ){
    let ArrPersonFilms = []
   
    for(let w = 0; w <persons.length;w++){
      if((ArrPersons[q].personid===persons[w].personid)&&(ArrPersonFilms.includes(persons[w].movieid)===false)){
        ArrPersonFilms.push(persons[w].movieid)
       
      }
    }
    let ArrPersonProfession = []
    let ArrEnProfession = []
    for(let w = 0; w <persons.length;w++){
      if((ArrPersons[q].personid===persons[w].personid)&&(ArrPersonProfession.includes(persons[w].profession)===false)){
        ArrPersonProfession.push(persons[w].profession)
        ArrEnProfession.push(persons[w].enProfession)
       
      }
    }

   
    ArrPersonWithMovies.push({
      id:ArrPersons[q].personid,
      name:ArrPersons[q].name,
      enName:ArrPersons[q].enName,
      photo:ArrPersons[q].photo,
      profession:ArrPersonProfession,
      enProfession:ArrEnProfession,
      movies:ArrPersonFilms
    })

   }
    return ArrPersonWithMovies
    
  }



  async getPersonsByMoviesId(moviesid:number[]){
    return await this.personsRepository.findAll({where:{movieid:{[Op.in]:moviesid}}})

   
  }


async getAllDirectors(){
  const persons = await this.personsRepository.findAll({where: {[Op.or]:[{profession:'режиссеры'},{enProfession:'director'}]}})
  let ArrPersons = []
  let ArrPeronsId = []
    for(let q = 0; q < persons.length;q++){
      if(ArrPeronsId.includes(persons[q].personid)===false){
        ArrPersons.push(persons[q])
        ArrPeronsId.push(persons[q].personid)
      }
    }
    let ArrPersonWithMovies = []
   for(let q=0;q<ArrPersons.length;q++ ){
    let ArrPersonFilms = []
   
    for(let w = 0; w <persons.length;w++){
      if((ArrPersons[q].personid===persons[w].personid)&&(ArrPersonFilms.includes(persons[w].movieid)===false)){
        ArrPersonFilms.push(persons[w].movieid)
       
      }
    }
    let ArrPersonProfession = []
    let ArrEnProfession = []
    for(let w = 0; w <persons.length;w++){
      if((ArrPersons[q].personid===persons[w].personid)&&(ArrPersonProfession.includes(persons[w].profession)===false)){
        ArrPersonProfession.push(persons[w].profession)
        ArrEnProfession.push(persons[w].enProfession)
       
      }
    }

   
    ArrPersonWithMovies.push({
      id:ArrPersons[q].personid,
      name:ArrPersons[q].name,
      enName:ArrPersons[q].enName,
      photo:ArrPersons[q].photo,
      profession:ArrPersonProfession,
      enProfession:ArrEnProfession,
      countMovies:ArrPersonFilms.length
    })

   }
    return ArrPersonWithMovies
}
async getAllActors(){
  const persons = await this.personsRepository.findAll({where: {[Op.or]:[{profession:'актеры'},{enProfession:'actor'}]}})
  let ArrPersons = []
  let ArrPeronsId = []
    for(let q = 0; q < persons.length;q++){
      if(ArrPeronsId.includes(persons[q].personid)===false){
        ArrPersons.push(persons[q])
        ArrPeronsId.push(persons[q].personid)
      }
    }
    let ArrPersonWithMovies = []
   for(let q=0;q<ArrPersons.length;q++ ){
    let ArrPersonFilms = []
   
    for(let w = 0; w <persons.length;w++){
      if((ArrPersons[q].personid===persons[w].personid)&&(ArrPersonFilms.includes(persons[w].movieid)===false)){
        ArrPersonFilms.push(persons[w].movieid)
       
      }
    }
    let ArrPersonProfession = []
    let ArrEnProfession = []
    for(let w = 0; w <persons.length;w++){
      if((ArrPersons[q].personid===persons[w].personid)&&(ArrPersonProfession.includes(persons[w].profession)===false)){
        ArrPersonProfession.push(persons[w].profession)
        ArrEnProfession.push(persons[w].enProfession)
       
      }
    }

   
    ArrPersonWithMovies.push({
      id:ArrPersons[q].personid,
      name:ArrPersons[q].name,
      enName:ArrPersons[q].enName,
      photo:ArrPersons[q].photo,
      profession:ArrPersonProfession,
      enProfession:ArrEnProfession,
      countMovies:ArrPersonFilms.length
    })

   }
    return ArrPersonWithMovies
}

  async getPersonsOfMovieByMovieId(id:number){
    const allPersons = await this.personsRepository.findAll()
    const persons = await this.personsRepository.findAll({where:{movieid:id}})
    let ArrPersons = []
  let ArrPeronsId = []
    for(let q = 0; q < persons.length;q++){
      if(ArrPeronsId.includes(persons[q].personid)===false){
        ArrPersons.push(persons[q])
        ArrPeronsId.push(persons[q].personid)
      }
    }
  let ArrPersonWithMovies = []
   for(let q=0;q<ArrPersons.length;q++ ){
    let ArrPersonFilms = []
    for(let w =0;w<allPersons.length;w++){
      if((ArrPersons[q].personid===allPersons[w].personid)&&(ArrPersonFilms.includes(allPersons[w].movieid)===false)){
        ArrPersonFilms.push(allPersons[w].movieid)
      }
    }
    let ArrPersonProfession = []
    let ArrEnProfession = []
    for(let w = 0; w <persons.length;w++){
      if((ArrPersons[q].personid===persons[w].personid)&&(ArrPersonProfession.includes(persons[w].profession)===false)){
        ArrPersonProfession.push(persons[w].profession)
        ArrEnProfession.push(persons[w].enProfession)
       
      }
    }
    ArrPersonWithMovies.push({
      id:ArrPersons[q].personid,
      name:ArrPersons[q].name,
      enName:ArrPersons[q].enName,
      photo:ArrPersons[q].photo,
      profession:ArrPersonProfession,
      enProfession:ArrEnProfession,
      movies:ArrPersonFilms.length
    })
   
   }
    return ArrPersonWithMovies
    
  }

  async formDatabase() {
    let arrfilm = await this.getAllFilms()
    
    let filmIdArr1 = [];
    let filmIdArr2 = [];
    let filmIdArr3 = [];
    let filmIdArr4 = [];
    for(let i = 0; i<50;i++){
      filmIdArr1.push(arrfilm[i].id);
    }
  
 
    let ArrPersonRep = await this.personsRepository.findAll()
    let ArrPersonsRep = []
    for(let i = 0; i<ArrPersonRep.length;i++){
      ArrPersonsRep.push(ArrPersonRep[i].movieid+'@'+ArrPersonRep[i].personid);
    }
    if(filmIdArr1.length!=0){
      const personsREQ1 =  await fetch(`https://api.kinopoisk.dev/v1/movie?id=${filmIdArr1.join('&id=')}&selectFields=\
persons.id%20persons.photo%20persons.name%20persons.enName%20persons.profession%20persons.enProfession%20id&page=1&limit=10000`, {
        method: 'GET',
        headers:{
                  'X-API-KEY': 'QTD9VCR-EW8M0Y4-QR6W0Y1-Y8J1BFT',
                  'Content-Type': 'application/json',
                },
    })
    

    if(personsREQ1.ok){
      let json1 = await personsREQ1.json();
      
      
      let arrPersons = []
      for(let i = 0 ;i < json1.docs.length;i++){
          for(let j = 0 ;j<json1.docs[i].persons.length;j++){
            if(ArrPersonsRep.includes(json1.docs[i].id+'@'+json1.docs[i].persons[j].id)===false){
              arrPersons.push(
                {
                  movieid:json1.docs[i].id,
                  personid:json1.docs[i].persons[j].id,
                  name:json1.docs[i].persons[j].name,
                  enName:json1.docs[i].persons[j].enName,
                  photo:json1.docs[i].persons[j].photo,
                  profession:json1.docs[i].persons[j].profession,
                  enProfession:json1.docs[i].persons[j].enProfession,
    
                }
                )
            }

            
          }
      }

  
      return await this.personsRepository.bulkCreate(arrPersons)
 
       
    }
    else{
      console.log("Ошибка HTTP: " + personsREQ1.status);
    }
        
      }
  }
  async getAllPersons(){
    const persnsoffilms = await this.personsRepository.findAll()
    const person = await this.personsRepository.findAll()
    let ArrPersons = []
    for(let q = 0 ; q<person.length;q++ ){
      let ArrPersonsFIlms = []
      for(let w = 0 ; w <persnsoffilms.length;w++){
        if(person[q].id===persnsoffilms[w].personid){
          ArrPersonsFIlms.push({
            movieid:persnsoffilms[w].movieid
          })
        }
      }

      
      
      
      ArrPersons.push({
        person:person[q],
        movies:ArrPersonsFIlms,
        

      })
    }

    return ArrPersons
  }


  async getMoviesByDirectorAndActor(str:string){
    const director = str.split("@")[0]
    const actor = str.split("@")[1]
    const ArrDirector = await this.personsRepository.findAll({where:{
      [Op.and]:[  {[Op.or]:[{profession:'режиссеры'},{enProfession:'director'}]},  {[Op.or]:[{name:{[Op.like]:director+'%'}},{enName:{[Op.like]:director+'%'}}]}],
    }});
    const ArrActor = await this.personsRepository.findAll({where:{
      [Op.and]: [   {[Op.or]:[{profession:'актеры'},{enProfession:'actor'}]},   {[Op.or]:[{name:{[Op.like]:actor+'%'}},{enName:{[Op.like]:actor+'%'}}]}   ],
    }}
    );
    
    let ArrDirecrotAndActor = []
    
    if((ArrDirector.length!=0)&&(ArrActor.length!=0)){
      for(let q = 0 ; q < ArrDirector.length;q++){
        for(let w = 0 ; w <ArrActor.length;w++){
          if(ArrDirector[q].movieid===ArrActor[w].movieid){
            ArrDirecrotAndActor.push(
              {
                director:ArrDirector[q],
                actor: ArrActor[w],
                movieid:ArrDirector[q].movieid
              }
              )
          }
        }
    }
    
    }
    return ArrDirecrotAndActor
  }

  async getAllMoviesByDirector(director:string){
    return await this.personsRepository.findAll({where:{
      [Op.and]:[   {[Op.or]:[{profession:'режиссеры'},{enProfession:'director'}]},  {[Op.or]:[{name:{[Op.like]:director+'%'}},{enName:{[Op.like]:director+'%'}}]}],
    }});

  }

  async getAllMoviesByActor(actor:string){
    return await this.personsRepository.findAll({where:{
      [Op.and]: [   {[Op.or]:[{profession:'актеры'},{enProfession:'actor'}]},   {[Op.or]:[{name:{[Op.like]:actor+'%'}},{enName:{[Op.like]:actor+'%'}}]}],
    }}
    );

  }
  async clearPersons(){
    const film = await this.getAllFilms()
    const persons = await this.personsRepository.findAll()
    let ArrFilmdId = []
    for(let q = 0 ; q <film.length;q++ ){
      ArrFilmdId.push(film[q].id)
    }
    let count = 0 
    for(let q = 0 ; q <persons.length;q++){
      if(ArrFilmdId.includes(persons[q].movieid)===false){
        await this.personsRepository.destroy({where:{id:persons[q].id}})
        count+=1
      }
    }
    return `Удалено записей в сервисе persons: ${count}`
  }
}
