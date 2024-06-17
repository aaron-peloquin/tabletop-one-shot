import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { z } from 'zod';
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { HumanMessage, AIMessage, BaseMessage } from "@langchain/core/messages";

import _ from 'lodash';

import { makeAgentWithTools, llmGoogleStrict } from './llmGoogle';
import { zodSchemaAgentTools } from '@static';
import { END, START, MessageGraph, StateGraphArgs } from "@langchain/langgraph";
import { DND5E } from "./toolDND5E";
import { GoogleGenerativeAIChatCallOptions } from "@langchain/google-genai";

type T_checkToolsDoneSig = (state: BaseMessage[]) => "tools" | typeof END;
const checkToolsDone: T_checkToolsDoneSig = state => {
  const messages = state;

  const lastMessage = messages[messages.length - 1];
  console.log('lastMessage', lastMessage);

  // If the LLM makes a tool call, then we route to the "tools" node
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (lastMessage.tool_calls.length) {
    return "tools";
  }
  // Otherwise, we stop (reply to the user)
  return END;
};

const tools = [DND5E];
const toolsNode = new ToolNode<BaseMessage[]>(tools);
const llmGoogleAgent = makeAgentWithTools(tools);
const agentWorkflow = new MessageGraph()
  .addNode('agent', llmGoogleAgent)
  .addNode('tools', toolsNode)
  .addEdge(START, "agent")
  .addConditionalEdges("agent", checkToolsDone)
  .addEdge("tools", "agent");
export const agentWithTabletopKnowledge = agentWorkflow.compile();
