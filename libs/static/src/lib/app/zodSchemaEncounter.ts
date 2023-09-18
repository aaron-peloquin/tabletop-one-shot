import { z } from "zod";
import { zodSchemaNPC } from "./zodSchemaNPC";

export const zodSchemaEncounter = z.object({
  name: z.string(),
  description: z.string().describe('Details for the Game Master about this encounter. Mention any items, traps, etc that the GM should know about'),
  areaDescription: z.string().describe('Description of the physical area, to be read by the game master'),
  purpose: z.string().describe('Reason the encounter exists'),
  NPCs: z.array(zodSchemaNPC).describe('Any enemies or characters the players can interact with or fight')
});
  