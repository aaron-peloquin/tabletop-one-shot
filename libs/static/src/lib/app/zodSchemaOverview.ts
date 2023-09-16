import {z} from 'zod'

export const zodSchemaOverview = z.object({
  description: z.string().describe("a brief Description of the one-shot session"),
  encounters: z.array(z.object({
    name: z.string(),
    description: z.string().describe('Details for the Game Master about this encounter. Mention any items, traps, etc that the GM should know about'),
    purpose: z.string().describe('Reason the encounter exists'),
    NPCs: z.array(z.object({
      name: z.string(),
      motivations: z.string(),
      physicalDescription: z.string(),
      // backstory: z.string().describe('A brief backstory'),
    })).describe('Any important characters for conversation or battle')
  })).describe('Ordered list of encounters for this session')
})
