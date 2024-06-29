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
const baseTemplate = `You are an expert game master assistant who helpfully retrieves content and communicates it through JSON responses to fetch data that will assist in answering the user's question about tabletop gaming.

Decide which tool to call, how many times to call them, and with which arguments to send into these tools to retrieve the information.

It is acceptable to call a tool more than once, or not call it at all

Your job is to gather information related to the following prompt: "{query}".

# Available Tools
{toolsDetails}

{followupScratchpad}
----
{parsedFormat}`;
const promptTemplate = new PromptTemplate({
  template: baseTemplate,
  inputVariables: ['query', 'toolsDetails', 'followupScratchpad'],
  partialVariables: { parsedFormat }
});

const onFailedAttempt = () => { console.log('a tabletop agent generation attempt failed'); };

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const agentChain = RunnableSequence.from([
  promptTemplate,
  llmGoogleStrict,
  outputParser
]).withRetry({
  stopAfterAttempt: 1,
  onFailedAttempt,
});

type T_Tool = DynamicStructuredTool | StructuredTool | Tool;

const invokeTools = (toolsToCall: T_AgentTools, tools: T_Tool[]) => {
  const promiseBag = [] as Promise<string>[];
  if (toolsToCall?.length) {
    toolsToCall.forEach((requestedTool) => {
      const tool = _.find(tools, {name: requestedTool.toolName});
      const toolResult = tool?.invoke(JSON.parse(requestedTool.argument || '{}'));
      if(toolResult) {
        promiseBag.push(toolResult);
      }
    });
  }
  return promiseBag;
};

export const agentWithTabletopKnowledge = async (query: string, tools: T_Tool[], maxCalls=1) => {
  let calls = 1;
  const toolsDetails = tools.reduce((detailsString, tool) => {
    const toolName = tool.name;
    const zodSchema = JSON.stringify(zodToJsonSchema(tool.schema) || {});
    detailsString += `## ${toolName}\n${toolName} arguments schema: ${zodSchema}\n${toolName} description: ${tool.description}\n\n`;
    return detailsString;
  }, '');

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const toolsToCall = [...await agentChain.invoke({query, toolsDetails, followupScratchpad: ''})] as T_AgentTools;

  const promiseBag = invokeTools(toolsToCall, tools);

  if(promiseBag.length) {
    const promiseResults = (await Promise.all(promiseBag));
    let toolResults = toolsToCall.map((tool, toolKey) => {
      const toolResult = promiseResults[toolKey];
      return {...tool, result: toolResult, fromSet: 1};
    });
    if(maxCalls > 1) {
      while(calls < maxCalls) {
        calls++;
        const followupScratchpad = `# Already retrieved content: ${JSON.stringify(toolResults)}\nIf this is enough context, please respond with an empty array to indicate no new tool requests.`;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const toolsToCall = [...await agentChain.invoke({query, toolsDetails, followupScratchpad})] as T_AgentTools;
        if(toolsToCall.length === 0) {
          break;
        }
        const promiseBag = invokeTools(toolsToCall, tools);
        const promiseResults = (await Promise.all(promiseBag));
        const newToolResults = toolsToCall.map((tool, toolKey) => {
          const toolResult = promiseResults[toolKey];
          return {...tool, result: toolResult, fromSet: calls};
        });
        toolResults = [
          ...toolResults,
          ...newToolResults
        ];
      }
    }
    const finishedTools = toolResults.filter((tool) => tool.result.indexOf('No information') !== 0);
    return finishedTools;
  }
  return 'Unable to retrieve any helpful information';
};
