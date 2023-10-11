import {z} from 'zod';
import { zodSchemaEncounter } from './zodSchemaEncounter';

export const zodSchemaOverview = z.object({
  description: z.string().describe("paragraph description of the one-shot session. Exclude information about the number of or level of players."),
  resolutions: z.array(z.string()).describe('list of a few different ways the session may be completed. Mention an rewards such as gold, treasure, and details on any magic item'),
  hooks: z.array(z.string()).describe('list of different reasons why players may participate in this session'),
  encounters: z.array(zodSchemaEncounter).describe('ordered list of a single encounter for this session')
});
