import {z} from 'zod';

export const zodSchemaAgentTools = z.array(z.object({
  toolName: z.string().describe("name of the tool you want to invoke."),
  argument: z.string().describe('string argument you want to send in to this tool'),
}));
