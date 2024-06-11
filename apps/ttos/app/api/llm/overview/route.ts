import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";

import { agentWithTabletopKnowledge, llmGoogleStrict } from '@helper/server';
import { zodSchemaOverview } from '@static';
import { NextRequest, NextResponse } from "next/server";
import { DND5E } from "@helper";

const outputParser = StructuredOutputParser.fromZodSchema(zodSchemaOverview);
export const maxDuration = 40;

const promptTemplate = new PromptTemplate({
  template: `
Overview synopsys for an english-language original homebrew custom family-friendly tabletop RPG one-shot session for a group of {partyLevel} level players containing creatures of challenge rating (CR) of at least {crRangeLow} and no greater than {crRangeHigh}, or 0 defenseless creatures like average citizens.

This style of tabletop game encourages players to practice empathy by thinking complexly about the people and creatures - either strategically in combat, or socially in roleplaying encounters, while traps and other encounters encourage group problem solving by collaborating with their other party members

This document will NEVER reference any existing intellectual property or campaign settings like Phandelver or Faerun.

Listed below are 1-3 Encounters with no more than 3 Creatures total between all encounters.

The title for session is: "{name}"

Required Context for this session (Strictly follow this context, but do not repeat any of it):
{context}
{agentContext}
----
{parsedFormat}`,
  inputVariables: ['name', 'context', 'agentContext', 'partyLevel', 'crRangeLow', 'crRangeHigh'],
  partialVariables: {
    parsedFormat: outputParser.getFormatInstructions()
  }
});

const onFailedAttempt = () => { console.log('an overview generation attempt failed'); };

const overviewChain = RunnableSequence.from([
  promptTemplate,
  llmGoogleStrict,
  outputParser
]).withRetry({
  stopAfterAttempt: 3,
  onFailedAttempt,
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
    let agentContext;
    if(context) {
      agentContext = await agentWithTabletopKnowledge(`"${name}", a tabletop one shot where: ${context}`, [DND5E], 5);
      console.log('agentContext', agentContext);
    }
    const response = await overviewChain.invoke({ name, context, partyLevel, crRangeLow, crRangeHigh, agentContext });
    return NextResponse.json({ message: response, agentContext }, { status: 200 });
  } catch (errorReason) {
    console.error(errorReason);
    return NextResponse.json({ error: 'Unable to generate overview, please try again', errorReason },  {status: 500 });
  }
};
