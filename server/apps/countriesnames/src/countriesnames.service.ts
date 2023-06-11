import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CountriesNames } from './countries-names.model';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Op } from 'sequelize';
import { CountriesDto } from './dto/counrtiesnames.dto';
import { CreateCountriesDto } from './dto/create-country.dto';

@Injectable()
export class CountriesnamesService {
  constructor(@InjectModel(CountriesNames) private countriesNamesRepository: typeof CountriesNames,
  @Inject('FILM_SERVICE') private rabbitFilmsService: ClientProxy){}
  async getAllFilms() {
    const ob$ = await this.rabbitFilmsService.send({
      cmd: 'get-all-films',
    },
    {});
    const films = await firstValueFrom(ob$).catch((err) => console.error(err));
    return films;
  }
  async formDatabase() {
  let Arrfilm =  await this.getAllFilms()
    let filmIdArr = [];
    let ArrCountries = [] 
    let countries = await this.countriesNamesRepository.findAll()
    for(let q = 0 ;q <countries.length;q++){
      ArrCountries.push(countries[q].name)
    }
    for(let i = 0; i<Arrfilm.length;i++){
      filmIdArr.push(Arrfilm[i].id);
    }
      const countriesnamesREQ =  await fetch(`https://api.kinopoisk.dev/v1/movie?id=${filmIdArr.join('&id=')}&selectFields=countries%20id&limit=1000`, {
        method: 'GET',
        headers:{
                  'X-API-KEY': 'QTD9VCR-EW8M0Y4-QR6W0Y1-Y8J1BFT',
                  'Content-Type': 'application/json',
                },
    })
    if(countriesnamesREQ.ok){
      let json = await countriesnamesREQ.json();
      let arrCountriesNames = []
      for(let q = 0 ; q <json.docs.length;q++){
        for(let w =0;w<json.docs[q].countries.length;w++){
          if((arrCountriesNames.includes(json.docs[q].countries[w].name)===false)&&(ArrCountries.includes(json.docs[q].countries[w].name)===false)){
            arrCountriesNames.push(json.docs[q].countries[w].name)
          }
        }
      }
      let ArrObjCountriesnNames = []
      for(let q = 0 ; q <arrCountriesNames.length;q++){
        
        if(arrCountriesNames[q]==="Франция"){
          ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"France"})
      }
        else if(arrCountriesNames[q]==="Великобритания"){
          ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Great Britain"})
      }
      else if(arrCountriesNames[q]==="США"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"USA"})
      }
      else if(arrCountriesNames[q]==="Россия"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Russia"})
      }
      else if(arrCountriesNames[q]==="СССР"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"USSR"})
      }
      else if(arrCountriesNames[q]==="Канада"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Canada"})
      }else if(arrCountriesNames[q]==="Германия"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Germany"})
      }else if(arrCountriesNames[q]==="Китай"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"China"})
      }else if(arrCountriesNames[q]==="Мексика"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Mexico"})
      }else if(arrCountriesNames[q]==="Венгрия"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Hungary"})
      }else if(arrCountriesNames[q]==="Австралия"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Australia"})
      }else if(arrCountriesNames[q]==="Швеция"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Sweden"})
      }else if(arrCountriesNames[q]==="Япония"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Japan"})
      }else if(arrCountriesNames[q]==="Мальта"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Malta"})
      }else if(arrCountriesNames[q]==="Марокко"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Morocco"})
      }else if(arrCountriesNames[q]==="Новая Зеландия"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"New Zealand"})
      }else if(arrCountriesNames[q]==="Иордания"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Jordan"})
      }else if(arrCountriesNames[q]==="Индия"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"India"})
      }else if(arrCountriesNames[q]==="Корея Южная"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"South Korea"})
      }else if(arrCountriesNames[q]==="Гонконг"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Hong Kong"})
      }else if(arrCountriesNames[q]==="Бельгия"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Belgium"})
      }else if(arrCountriesNames[q]==="ОАЭ"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"UAE"})
      }else if(arrCountriesNames[q]==="Тайвань"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Taiwan"})
      }else if(arrCountriesNames[q]==="Испания"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Spain"})
      }else if(arrCountriesNames[q]==="Италия"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Italy"})
      }else if(arrCountriesNames[q]==="Дания"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Denmark"})
      }else if(arrCountriesNames[q]==="Нидерланды"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Netherlands"})
      }else if(arrCountriesNames[q]==="Чехия"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Czech"})
      }else if(arrCountriesNames[q]==="Румыния"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Romania"})
      }else if(arrCountriesNames[q]==="Швейцария"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Switzerland"})
      }else if(arrCountriesNames[q]==="Таиланд"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Таиланд"})
      }else if(arrCountriesNames[q]==="Польша"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Poland"})
      }else if(arrCountriesNames[q]==="Норвегия"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Norway"})
      }else if(arrCountriesNames[q]==="Сингапур"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Singapore"})
      }else if(arrCountriesNames[q]==="Болгария"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Bulgaria"})
      }else if(arrCountriesNames[q]==="Турция"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Turkey"})
      }else if(arrCountriesNames[q]==="Греция"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Greece"})
      }else if(arrCountriesNames[q]==="ЮАР"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"South Africa"})
      }else if(arrCountriesNames[q]==="Беларусь"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Belarus"})
      }else if(arrCountriesNames[q]==="Сербия"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Serbia"})
      }else if(arrCountriesNames[q]==="Люксембург"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Luxembourg"})
      }else if(arrCountriesNames[q]==="Украина"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Ukraine"})
      }else if(arrCountriesNames[q]==="Финляндия"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Finland"})
      }else if(arrCountriesNames[q]==="Аргентина"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Argentina"})
      }else if(arrCountriesNames[q]==="Тунис"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Tunisia"})
      }else if(arrCountriesNames[q]==="Багамы"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Bahamas"})
      }else if(arrCountriesNames[q]==="Исландия"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Iceland"})
      }else if(arrCountriesNames[q]==="Бразилия"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Brazil"})
      }else if(arrCountriesNames[q]==="Ирландия"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Ireland"})
      }else if(arrCountriesNames[q]==="Индонезия"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Indonesia"})
      }else if(arrCountriesNames[q]==="Словения"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Slovenia"})
      }else if(arrCountriesNames[q]==="Ливан"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Lebanon"})
      }else if(arrCountriesNames[q]==="Катар"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Qatar"})
      }else if(arrCountriesNames[q]==="Германия (ФРГ)"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Germany (FRG)"})
      }else if(arrCountriesNames[q]==="Колумбия"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Colombia"})
      }else if(arrCountriesNames[q]==="Кипр"){
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Cyprus"})
      }
      else{
        ArrObjCountriesnNames.push({name:arrCountriesNames[q],enName:"Other"})
      }
      
      
      }
      return await this.countriesNamesRepository.bulkCreate(ArrObjCountriesnNames)
      
    }
    else{
      console.log("Ошибка HTTP: " + countriesnamesREQ.status);
    }
  }
  async getAllCountriesNames(){
    return await this.countriesNamesRepository.findAll()
  }
  async updateCountries(dto:CountriesDto){
    const countries = await this.countriesNamesRepository.findOne({where:{id:dto.id}})
    countries.name = dto.name
    countries.enName = dto.enName
    countries.save()
    return countries
  }
  async getCountriesByNames(ArrCountries:string[]){
    return await this.countriesNamesRepository.findAll({where:{
      [Op.or]:[{name:{[Op.in]:ArrCountries}},{enName:{[Op.in]:ArrCountries}}]
      }})
  }
  async postCountryName(dto:CreateCountriesDto){
    const countries = await this.countriesNamesRepository.findAll()
    for(let q = 0 ; q <countries.length;q++){
      if(countries[q].name===dto.name||countries[q].enName===dto.enName){
        return 'Страна уже есть в базе'
      }
    }
    return await this.countriesNamesRepository.create(dto)
  }
  async deleteCountryName(idC:number){
    const country = await this.countriesNamesRepository.findByPk(idC)
    await this.countriesNamesRepository.destroy({where:{id:idC}})
      return `Страна c id ${country.id} удалена`

  }
}
