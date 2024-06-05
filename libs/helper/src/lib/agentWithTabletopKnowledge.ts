import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";

import { llmGoogleStrict } from './llmGoogle';
import { zodSchemaAgentTools } from '@static';

const outputParser = StructuredOutputParser.fromZodSchema(zodSchemaAgentTools);

const promptTemplate = new PromptTemplate({
  template: `
You are a helpful assistant who communicates through JSON responses to fetch data that will assist in answering the user's question about tabletop gaming.

Decide which tool to call, how many times to call them, and with which arguments to send into these tools to retrieve the information.

It is acceptable to call a tool more than once, or not call it at all

Your job is to gather information related to the following prompt: "{query}".

# Available Tools
{toolsDetails}
----
{parsedFormat}`,
  inputVariables: ['query', 'toolsDetails'],
  partialVariables: {
    parsedFormat: outputParser.getFormatInstructions()
  }
});

const onFailedAttempt = () => { console.log('an overview generation attempt failed'); };

const agentChain = RunnableSequence.from([
  promptTemplate,
  llmGoogleStrict,
  outputParser
]).withRetry({
  stopAfterAttempt: 3,
  onFailedAttempt,
});

type T_Tool = {
  name: string,
  description: string,
  invoke: (arg: string) => string
};

export const agentWithTabletopKnowledge = async (query: string, tools: T_Tool[]) => {
  const toolsDetails = tools.reduce((detailsString, tool) => {
    detailsString += `## ${tool.name}\n${tool.description}\n\n`;
    return detailsString;
  }, '');
  const response = await agentChain.invoke({query, toolsDetails});
  console.log('==response==', response);
};