import { NextApiRequest, NextApiResponse } from 'next';
import { searchMdxFiles } from '../searchMdxFiles/routes';

// http://localhost:3000/api/doc/searchDocs?query=""
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Query is required' });
  }

  const results = searchMdxFiles(query as string);

  return res.status(200).json(results);
}
