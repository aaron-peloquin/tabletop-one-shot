import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";

import { agentWithTabletopKnowledge, llmGoogle } from '@helper/server';
import { zodSchemaStats } from '@static';
import { NextRequest, NextResponse } from "next/server";
import { DND5E } from "@helper";

export const maxDuration = 40;

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
    const agentTemplate = `Generating a random character sheet for a non-player character named "${params.name}".
Classification: ${params.classification}
CR: ${params.cr}
Description: ${params.description}`;
    const agentContext = await agentWithTabletopKnowledge(agentTemplate, [DND5E], 2);
    const response = await overviewChain.invoke({ ...params, agentContext });
    return NextResponse.json({ message: response, agentContext }, { status: 200 });
  } catch (errorReason) {
    console.error(errorReason);
    return NextResponse.json({ error: `Unable to generate stat block for ${params.name}, please try again`, errorReason },  {status: 500 });
  }
};
