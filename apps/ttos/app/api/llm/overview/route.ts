import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from 'langchain/chains';

import { llmGoogleStrict } from '@helper/server';
import { zodSchemaOverview } from '@static';
import { NextRequest, NextResponse } from "next/server";

const outputParser = StructuredOutputParser.fromZodSchema(zodSchemaOverview);

const promptTemplate = new PromptTemplate({
  template: `
Overview synopsys for an original homebrew custom family-friendly tabletop RPG one-shot session for a group of {partyLevel} level players containing creatures of challenge rating (CR) of at least {crRangeLow} and no greater than {crRangeHigh}, or 0 defenseless creatures like average citizens.

This style of tabletop game encourages players to practice empathy by thinking complexly about the people and creatures - either strategically in combat, or socially in roleplaying encounters, while traps and other encounters encourage group problem solving by collaborating with their other party members

This document will NEVER reference any existing intellectual property or campaign settings like Phandelver or Faerun.

Listed below are 1-4 Encounters with no more than 5 Creatures total between all encounters.

The title for session is: "{name}"

Required Context for this session (Strictly follow this context, but do not repeat any of it):
{context}
----
{parsedFormat}`,
  inputVariables: ['name', 'context', 'partyLevel', 'crRangeLow', 'crRangeHigh'],
  partialVariables: {
    parsedFormat: outputParser.getFormatInstructions()
  }
});

const overviewChain = new LLMChain({
  llm: llmGoogleStrict,
  prompt: promptTemplate,
  outputParser: outputParser,
  verbose: false
});

export const POST = async (req: NextRequest) => {
  const {name, context, partyLevel} = await req.json();
  let crRangeLow;
  let crRangeHigh;
  switch(partyLevel) {
  case 'low':
    crRangeLow = '1/8';
    crRangeHigh = 4;
    break;
  case 'mid':
    crRangeLow = 5;
    crRangeHigh = 10;
    break;
  case 'high':
    crRangeLow = 12;
    crRangeHigh = 30;
    break;
  }
  try {
    const response = await overviewChain.call({name, context, partyLevel, crRangeLow, crRangeHigh});
    return NextResponse.json({ message: response.text }, { status: 200 });
  } catch (errorReason) {
    return NextResponse.json({ error: 'Unable to generate overview, please try again', errorReason },  {status: 500 });
  }
};
