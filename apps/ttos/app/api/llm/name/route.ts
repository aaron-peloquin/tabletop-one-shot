import { llmGoogleCreative } from '@helper/server';
import { NextRequest, NextResponse } from 'next/server';
import chance from 'chance';

const generator = chance();
const SESSION_DESCRIPTORS = ['murky', 'exciting', 'comical', 'engaging', 'mundane', 'roguish'];

export const POST = async (req: NextRequest) => {
  const {partyLevel} = await req.json();
  const descriptorKey = Math.floor(Math.random() * SESSION_DESCRIPTORS.length);
  const descriptor = SESSION_DESCRIPTORS[descriptorKey];
  const seed = generator.syllable();
  try {
    const response = await llmGoogleCreative.invoke(
      `Generate a random name for a unique family-friendly ${descriptor} homebrew tabletop RPG one-shot session for a group of ${partyLevel} level players.
      Find ONE safe for work name that is shorter and grabs the reader's attention and make them want to know more about this ${descriptor} adventure.
      ONLY Reply with the name of the adventure.
      Session Seed: "${seed}"
      NEVER reference any existing intellectual property or campaign settings, like Phandelver, Tiamat, or Faerun`
    );
    const replyContent = response.content as string;
    const cleanResponse = replyContent.replace(/[^A-Za-z'-]/g, " ").trim();
    return NextResponse.json({ message: cleanResponse, descriptor, seed }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: `Error naming a ${descriptor} adventure`, descriptor, errz: e }, { status: 200 });
  }
};
