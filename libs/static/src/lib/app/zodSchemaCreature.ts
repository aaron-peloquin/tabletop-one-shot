import {z} from 'zod';

export const zodSchemaCreature = z.object({
  name: z.string(),
  cr: z.string().describe("challenge rating in decimal format"),
  // motivations: z.string(),
  description: z.string().describe('physical description'),
  classification: z.string().describe('Single-word Type, Race, or Ancestry of this creature'),
  backstory: z.string().describe('brief backstory to describe their motivations')
});
