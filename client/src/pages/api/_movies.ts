import { NextApiRequest, NextApiResponse } from 'next';
import { mockMovies } from './mocks/mockMovies';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(mockMovies);
}
