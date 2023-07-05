import { NextApiRequest, NextApiResponse } from 'next';
import { moviePages } from '../mocks/mockMoviePage';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(moviePages);
}
