import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";

import { llmGoogle } from '@helper/server';
import { zodSchemaStats } from '@static';
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 15;

const outputParser = StructuredOutputParser.fromZodSchema(zodSchemaStats);

const promptTemplate = new PromptTemplate({
  template: `
Create the stat block for a creature in a custom tabletop RPG.

Creature Description:
Name: {name}
Type/Ancestry/Race: {classification}
Challenge Rating: {cr}
Physical Description: {description}

In addition to the JSON spec below, also follow these rules when replying in JSON format:
- Abilities array items MUST start with an opening curly brace
- DO NOT create new keys, strictly follow the JSON specification
- DO NOT terminate the JSON document early
- OMIT newline characters

{parsedFormat}`,
  inputVariables: ['name', 'cr', 'description', 'classification'],
  partialVariables: {
    parsedFormat: outputParser.getFormatInstructions()
  }
});

const onFailedAttempt = () => { console.log('a stat block generation attempt failed'); };

const overviewChain = RunnableSequence.from([
  promptTemplate,
  llmGoogle,
  outputParser
]).withRetry({
  stopAfterAttempt: 2,
  onFailedAttempt,
});

export const POST = async (req: NextRequest) => {
  const params = await req.json();
  try {
    const response = await overviewChain.invoke(params);
    return NextResponse.json({ message: response }, { status: 200 });
  } catch (errorReason) {
    console.error(errorReason);
    return NextResponse.json({ error: `Unable to generate stat block for ${params.name}, please try again`, errorReason },  {status: 500 });
  }
};
