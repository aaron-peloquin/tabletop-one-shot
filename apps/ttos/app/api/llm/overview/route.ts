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

You should make up 1-3 Encounters, and no more than 5 Creatures total.

The title for session is: "{name}"

Required Context (Strictly follow this context while writing the session, but do not repeat it as part of your reply):
{context}
----
{parsedFormat}`,
  inputVariables: ['name', 'context'],
  partialVariables: {
    parsedFormat: outputParser.getFormatInstructions()
  }
});

const overviewChain = new LLMChain({
  llm: llmGoogle,
  prompt: promptTemplate,
  outputParser: outputParser,
  verbose: false
});

export const POST = async (req: NextRequest) => {
  const params = await req.json();
  try {
    const response = await overviewChain.call(params);
    return NextResponse.json({ message: response.text }, { status: 200 });
  } catch (error) {
    console.log('error: ', error);
    return NextResponse.json({ error: 'Unable to generate overview, please try again' },  {status: 500 });
  }
};
