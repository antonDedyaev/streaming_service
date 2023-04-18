import { IActor } from '../../../actor/ActorList/Temp/IActor';

export interface IMovie {
  id: number;
  raiting: number;
  nameraiting: string;
  actors: IActor[];
}
