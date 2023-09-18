import { z } from "zod";
import { zodSchemaCreature } from "./zodSchemaCreature";

export const zodSchemaEncounter = z.object({
  name: z.string(),
  details: z.string().describe('game master notes for this encounter. Mention any items, traps, etc that the GM should know about'),
  // areaDescription: z.string().describe('Description of the physical area, to be read by the game master'),
  purpose: z.string().describe('reason this encounter exists'),
  creatures: z.array(zodSchemaCreature).describe('unique list of enemies or characters the players can interact with or fight')
});
  