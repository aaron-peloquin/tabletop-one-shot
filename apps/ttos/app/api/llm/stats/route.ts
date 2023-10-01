import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from 'langchain/chains';

import { llmGoogle } from '@helper/server';
import { zodSchemaStats } from '@static';
import { NextRequest, NextResponse } from "next/server";

const outputParser = StructuredOutputParser.fromZodSchema(zodSchemaStats);

const promptTemplate = new PromptTemplate({
  template: `
Create the stat block for a creature in a custom tabletop RPG.

Creature Description:
Name: {name}
Type/Ancestry/Race: {classification}
Challenge Rating: {cr}
Physical Description: {description}

{parsedFormat}`,
  inputVariables: ['name', 'cr', 'description', 'classification'],
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
  } catch (e) {
    return NextResponse.json({ error: `Unable to generate stat block for ${params.name}, please try again` },  {status: 500 });
  }
};
