import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { z } from 'zod';
import _ from 'lodash';
import { zodToJsonSchema } from "zod-to-json-schema";

import { llmGoogleStrict } from './llmGoogle';
import { zodSchemaAgentTools } from '@static';
import { DynamicStructuredTool, StructuredTool, Tool } from "@langchain/core/tools";

const outputParser = StructuredOutputParser.fromZodSchema(zodSchemaAgentTools);

export type T_AgentTools = z.infer<typeof zodSchemaAgentTools>;
const parsedFormat = outputParser.getFormatInstructions();
const promptTemplate = new PromptTemplate({
  template: `
You are an expert game master assistant who helpfully retrieves content and communicates it through JSON responses to fetch data that will assist in answering the user's question about tabletop gaming.

Decide which tool to call, how many times to call them, and with which arguments to send into these tools to retrieve the information.

It is acceptable to call a tool more than once, or not call it at all

Your job is to gather information related to the following prompt: "{query}".

# Available Tools
{toolsDetails}
----
{parsedFormat}`,
  inputVariables: ['query', 'toolsDetails'],
  partialVariables: { parsedFormat }
});

const onFailedAttempt = () => { console.log('an overview generation attempt failed'); };

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const agentChain = RunnableSequence.from([
  promptTemplate,
  llmGoogleStrict,
  outputParser
]).withRetry({
  stopAfterAttempt: 3,
  onFailedAttempt,
});

type T_Tool = DynamicStructuredTool | StructuredTool | Tool;

export const agentWithTabletopKnowledge = async (query: string, tools: T_Tool[]) => {
  const toolsDetails = tools.reduce((detailsString, tool) => {
    const toolName = tool.name;
    const zodSchema = JSON.stringify(zodToJsonSchema(tool.schema) || {});
    detailsString += `## ${toolName}\n${toolName} arguments schema: ${zodSchema}\n${toolName} description: ${tool.description}\n\n`;
    return detailsString;
  }, '');

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const toolsToCall = [...await agentChain.invoke({query, toolsDetails})] as T_AgentTools;
  if (toolsToCall?.length) {
    const promiseBag = [] as Promise<string>[];
    toolsToCall.forEach((requestedTool) => {
      // tool.toolName;
      const tool = _.find(tools, {name: requestedTool.toolName});
      const toolResult = tool?.invoke(JSON.parse(requestedTool.argument || '{}'));
      if(toolResult) {
        promiseBag.push(toolResult);
      }
    });
    if(promiseBag.length) {
      const promiseResults = (await Promise.all(promiseBag));
      return promiseResults.join('\n\n');
    }
    return 'Unable to retrieve any helpful information';
  }
};
