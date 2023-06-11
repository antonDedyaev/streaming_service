import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CountriesOfFilms } from './counties.model';
import { ClientProxy } from '@nestjs/microservices';
import {  firstValueFrom } from 'rxjs';
import { Op } from 'sequelize';

@Injectable()
export class CountriesService {
    constructor(@InjectModel(CountriesOfFilms) private countriesRepository: typeof CountriesOfFilms,
    @Inject('COUNTRIESNAMES_SERVICE') private rabbitnamesofCountriesService: ClientProxy,
    @Inject('FILM_SERVICE') private rabbitFilmsService: ClientProxy){}

    async getAllFilms() {
        const ob$ = await this.rabbitFilmsService.send({
          cmd: 'get-all-films',
        },
        {});
        const films = await firstValueFrom(ob$).catch((err) => console.error(err));
        return films;
      }
      async getAllCountriesNames() {
        const ob$ = await this.rabbitnamesofCountriesService.send({
          cmd: 'get-all-countries-names',
        },
        {});
        const countriesNames = await firstValueFrom(ob$).catch((err) => console.error(err));
        return countriesNames;
      }
      async clearCountries(){
        const film = await this.getAllFilms()
        const countries = await this.countriesRepository.findAll()
        let ArrFilmdId = []
        for(let q = 0 ; q <film.length;q++ ){
          ArrFilmdId.push(film[q].id)
        }
        let count = 0 
        for(let q = 0 ; q <countries.length;q++){
          if(ArrFilmdId.includes(countries[q].movieid)===false){
            await this.countriesRepository.destroy({where:{id:countries[q].id}})
            count+=1
          }
        }
        return `Удалено записей в сервисе countries: ${count}`
      }
      async formDatabase() {
        let Arrfilm =  await this.getAllFilms()
        let CountriesNames = await this.getAllCountriesNames()
        let filmIdArr = [];
        let CountriesNamesArr = []
        for(let i = 0; i<Arrfilm.length;i++){
          filmIdArr.push(Arrfilm[i].id);
        }
        for(let i = 0; i<CountriesNames.length;i++){
          CountriesNamesArr.push(CountriesNames[i]);
        }
        let RepCountrues = await this.countriesRepository.findAll()
        let RepArrCountries = []
        for(let i = 0 ; i < RepCountrues.length; i++){
          RepArrCountries.push(RepCountrues[i].movieid+' '+RepCountrues[i].countryid)
        }
        
        if(filmIdArr.length!=0){
          const countriesREQ =  await fetch(`https://api.kinopoisk.dev/v1/movie?id=${filmIdArr.join('&id=')}&selectFields=countries%20id&limit=1000`, {
            method: 'GET',
            headers:{
                      'X-API-KEY': 'QTD9VCR-EW8M0Y4-QR6W0Y1-Y8J1BFT',
                      'Content-Type': 'application/json',
                    },
        })
        if(countriesREQ.ok){
          let json = await countriesREQ.json();
          let arrCountries = []
          for(let i =0;i<json.docs.length;i++){
            for(let j =0;j<json.docs[i].countries.length;j++){
             for(let q=0;q<CountriesNamesArr.length;q++){
                if((CountriesNamesArr[q].name===json.docs[i].countries[j].name)&&(RepArrCountries.includes(json.docs[i].id+' '+CountriesNamesArr[q].id)===false)){
                  await arrCountries.push(
                    {
                      movieid:json.docs[i].id,
                      countryid:CountriesNamesArr[q].id
                    }
                    )
                }
             }
            }
          }
          return await this.countriesRepository.bulkCreate(arrCountries)
        }
        else{
          console.log("Ошибка HTTP: " + countriesREQ.status);
        }
            
          }
      }
    async getAllCountries(){
      return await this.countriesRepository.findAll()
    }
    async getAllCountriesByMoviesId(moviesid:number){
      return await this.countriesRepository.findAll({where:{movieid:moviesid}})
    }


    async getMoviesBycountriesId(countriesid:number[]){
      return await this.countriesRepository.findAll({attributes: [
        'movieid'
     ],where:{countryid:{[Op.in]:countriesid}}})
    }
  

    
    async getCountriesByMoviesId(moviesId:number[]){
      return await this.countriesRepository.findAll({where:{movieid:{[Op.in]:moviesId}}})
      
    }
 

}
