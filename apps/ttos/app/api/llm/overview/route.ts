import { NextApiRequest, NextApiResponse } from 'next';
import zod from 'zod'
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from 'langchain/chains';

import { llmGoogle } from '@helper/server';

const zodSchema = zod.object({
  sessionDescription: zod.string().describe("a brief Description of the one-shot session"),
  encounters: zod.array(zod.object({
    name: zod.string(),
    description: zod.string().describe('Details for the Game Master about this encounter. Mention any items, traps, etc that the GM should know about'),
    purpose: zod.string().describe('Reason the encounter exists'),
    NPCs: zod.array(zod.object({
      name: zod.string(),
      purpose: zod.string().describe('Reason the NPC character is here'),
      physicalDescription: zod.string(),
      // motivations: zod.string().describe('The characters goals'),
      // backstory: zod.string().describe('A brief backstory'),
    })).describe('Any important characters for conversation or battle')
  })).describe('Ordered list of encounters for this session')
})

const outputParser = StructuredOutputParser.fromZodSchema(zodSchema)

const promptTemplate = new PromptTemplate({
  template: `
Create the Overview synopsys for a tabletop RPG one-shot session for a group of 2-5 players.
Do not reference any existing intellectual property or campaign settings like Phandelver, Volo, or Faerun.
The session should have 1-4 encounters.

The title for session is: "{name}"

{parsedFormat}`,
  inputVariables: ['name'],
  partialVariables: {
    parsedFormat: outputParser.getFormatInstructions()
  }
})

const overviewChain = new LLMChain({
  llm: llmGoogle,
  prompt: promptTemplate,
  // outputKey: 'generated',
  outputParser: outputParser,
  verbose: false
})

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const {name} = await req.json()
  console.log('name:', name)
  const response = await overviewChain.call({name});
  return Response.json({ message: response.text }, { status: 200 })
};
