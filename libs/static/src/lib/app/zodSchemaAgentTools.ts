import {z} from 'zod';

export const zodSchemaAgentTools = z.object({
  thoughts: z.string().describe("a description of your thought process, plan, and observations, wrote before you choose which tools to call"),
  tools: z.array(z.object({
    toolName: z.string().describe("name of the tool you want to invoke."),
    argument: z.string().describe('string argument you want to send in to this tool'),
  }))
});
