import {z} from 'zod';
import { zodSchemaEncounter } from './zodSchemaEncounter';

export const zodSchemaOverview = z.object({
  description: z.string().describe("Paragraph description of the one-shot session. Exclude information about the number of or level of players."),
  hooks: z.array(z.string()).describe('List of different reasons why players may participate in this session'),
  encounters: z.array(zodSchemaEncounter).describe('Ordered list of a single encounter for this session')
});
