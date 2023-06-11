import { Controller, Get } from '@nestjs/common';
import { CountriesnamesService } from './countriesnames.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { CountriesDto } from './dto/counrtiesnames.dto';

@Controller()
export class CountriesnamesController {
  constructor(private readonly countriesnamesService: CountriesnamesService) {}

  @MessagePattern({ cmd: 'parser-countries-names'})
  async getCountries(@Ctx() context: RmqContext){
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return  await this.countriesnamesService.formDatabase()
  }
  @MessagePattern({ cmd: 'get-all-countries-names'})
  async getAllCountries(@Ctx() context: RmqContext){
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return  await this.countriesnamesService.getAllCountriesNames()
  }
  @MessagePattern({ cmd: 'get-countries-by-names' })
  async getGenresByNames(
    @Ctx() context: RmqContext,
    @Payload() genre: { ArrCountries: string[] },) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return await this.countriesnamesService.getCountriesByNames(genre.ArrCountries);
  }
  @MessagePattern({ cmd: 'update-namesofcountry' })
  async UpdateDprofile(
    @Ctx() context: RmqContext,
    @Payload() countries: CountriesDto) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return await this.countriesnamesService.updateCountries(countries);
  }
  @MessagePattern({ cmd: 'delete-country-by-id' })
  async getAllInfoPersonBypersonId(
    @Ctx() context: RmqContext,
    @Payload() country: { id: number },) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.countriesnamesService.deleteCountryName(country.id);
  }

  @MessagePattern({ cmd: 'post-country' })
  async postNameGenre(
    @Ctx() context: RmqContext,
    @Payload() country: CountriesDto) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.countriesnamesService.postCountryName(country);
  }
}
