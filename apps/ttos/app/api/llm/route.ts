import { llmGoogle } from '@helper';
import { NextApiRequest, NextApiResponse } from 'next';


export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('yeah hi')
  const response = await llmGoogle.call(
    "What would be a good company name for a non-profit that makes playful socks?"
  );
  return Response.json({ message: response }, { status: 500 })
};
