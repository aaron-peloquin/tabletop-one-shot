import {z} from 'zod';

export const zodSchemaNPC = z.object({
  name: z.string(),
  motivations: z.string(),
  physicalDescription: z.string(),
  // backstory: z.string().describe('A brief backstory'),
});

export const zodSchemaEncounter = z.object({
  name: z.string(),
  description: z.string().describe('Details for the Game Master about this encounter. Mention any items, traps, etc that the GM should know about'),
  areaDescription: z.string().describe('Description of the physical area, to be read by the game master'),
  purpose: z.string().describe('Reason the encounter exists'),
  NPCs: z.array(zodSchemaNPC).describe('Any enemies or characters the players can interact with or fight')
});

export const zodSchemaOverview = z.object({
  description: z.string().describe("Paragraph description of the one-shot session. Exclude information about the number of or level of players."),
  hooks: z.array(z.string()).describe('List of different reasons why players may participate in this session'),
  encounters: z.array(zodSchemaEncounter).describe('Ordered list of a single encounter for this session')
});
