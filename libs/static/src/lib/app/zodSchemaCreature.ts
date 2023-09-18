import {z} from 'zod';

export const zodSchemaCreature = z.object({
  name: z.string(),
  challengeRating: z.number().multipleOf(0.25),
  motivations: z.string(),
  physicalDescription: z.string(),
  classification: z.string().describe('Type, Race, or Ancestry of this creature'),
  backstory: z.string().describe('A brief backstory')
});
