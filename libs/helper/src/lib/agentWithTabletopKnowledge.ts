import { ToolNode } from "@langchain/langgraph/prebuilt";
import { BaseMessage } from "@langchain/core/messages";
import { END, START, MessageGraph } from "@langchain/langgraph";
import { makeAgentWithTools } from './llmGoogle';
import { DND5E } from "./toolDND5E";

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
const toolsNode = new ToolNode<BaseMessage[]>(tools, 'tools', ['tabletop gaming', 'dungeons and dragons']);
console.log('==toolsNode==', toolsNode);
const llmGoogleAgent = makeAgentWithTools(tools);
const agentWorkflow = new MessageGraph()
  .addNode('agent', llmGoogleAgent)
  .addNode('tools', toolsNode)
  .addEdge(START, "agent")
  // .addConditionalEdges("agent", checkToolsDone)
  .addEdge("agent", "tools")
  .addEdge("tools", "agent");
export const agentWithTabletopKnowledge = agentWorkflow.compile();
