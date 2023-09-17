import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from 'langchain/chains';

import { llmGoogle } from '@helper/server';
import { zodSchemaOverview } from '@static';
import { NextRequest, NextResponse } from "next/server";

const outputParser = StructuredOutputParser.fromZodSchema(zodSchemaOverview);

const promptTemplate = new PromptTemplate({
  template: `
Create the Overview synopsys for a homebrew original custom tabletop RPG one-shot session for a group of 2-5 players.
Do not reference any existing intellectual property or campaign settings like Phandelver, Volo, or Faerun.
The session should have 1-4 encounters.

The title for session is: "{name}"

{parsedFormat}`,
  inputVariables: ['name'],
  partialVariables: {
    parsedFormat: outputParser.getFormatInstructions()
  }
});

const overviewChain = new LLMChain({
  llm: llmGoogle,
  prompt: promptTemplate,
  // outputKey: 'generated',
  outputParser: outputParser,
  verbose: false
});

export const POST = async (req: NextRequest) => {
  const {name} = await req.json();
  try {
    const response = await overviewChain.call({name});
    return NextResponse.json({ message: response.text }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: 'Error generating text' },  {status: 500 });
  }
};
