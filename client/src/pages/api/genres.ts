import { NextApiRequest, NextApiResponse } from 'next';
import { mockGenres } from './mocks/mockGenresAndCountries';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(mockGenres);
}
