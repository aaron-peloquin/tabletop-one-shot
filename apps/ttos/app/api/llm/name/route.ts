import { llmGoogle } from '@helper/server';
import { NextResponse } from 'next/server';

const SESSION_DESCRIPTORS = ['murky', 'dark', 'exciting', 'comedy', 'engaging', 'mundane', 'roguish'];

export const GET = async () => {
  const descriptorKey = Math.floor(Math.random() * SESSION_DESCRIPTORS.length);
  const descriptor = SESSION_DESCRIPTORS[descriptorKey];
  const response = await llmGoogle.call(
    `Generate a random name for a ${descriptor} tabletop RPG one-shot session for a group of 2-5 players.
    Do not include any additional string formatting in your reply like quotes, new lines, or asterisks.
    Do not reference any existing intellectual property or campaign settings like Phandelver, Volo, or Faerun.`
  );
  return NextResponse.json({ message: response, descriptor }, { status: 200 });
};
