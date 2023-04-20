import { IActor } from '../../../../models/IActor';

export interface IMovie {
  id: number;
  raiting: number;
  nameraiting: string;
  actors: IActor[];
}
