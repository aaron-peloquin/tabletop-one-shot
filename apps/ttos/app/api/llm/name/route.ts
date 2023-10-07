import { llmGoogleCreative } from '@helper/server';
import { NextRequest, NextResponse } from 'next/server';

const SESSION_DESCRIPTORS = ['murky', 'dark', 'exciting', 'comedy', 'engaging', 'mundane', 'roguish'];

export const POST = async (req: NextRequest) => {
  const {partyLevel} = await req.json();
  const descriptorKey = Math.floor(Math.random() * SESSION_DESCRIPTORS.length);
  const descriptor = SESSION_DESCRIPTORS[descriptorKey];
  try {
    const response = await llmGoogleCreative.call(
      `Generate a random name for a ${descriptor} of a unique homebrew tabletop RPG one-shot session for a group of ${partyLevel} level players.
      The name should grab the reader's attention and make them want to know more about this ${descriptor} adventure.
      NEVER reference any existing intellectual property or campaign settings, especially Phandelver, Tiamat, or Faerun.`
    );
    const cleanResponse = response
      .replace('*', '').replace('*', '')
      .replace('*', '').replace('*', '')
      .replace('"', '')
      .replace('\n', '');
    return NextResponse.json({ message: cleanResponse, descriptor }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: `Error naming a ${descriptor} adventure`, descriptor }, { status: 200 });
  }
};
