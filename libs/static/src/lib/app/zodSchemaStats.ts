import { z } from "zod";

export const zodSchemaStats = z.object({
  abilityScores: z.object({
    strength: z.number(),
    dexterity: z.number(),
    constitution: z.number(),
    intelligence: z.number(),
    wisdom: z.number(),
    charisma: z.number(),
  }),
  armorClass: z.number(),
  hitPoints: z.number(),
  initiative: z.number(),
  speed: z.number().describe('typically 25 or 30'),
  // flySpeed: z.number().describe('typically 0'),
  // swimSpeed: z.number().describe('typically 0'),
  skills: z.object({
    perception: z.number(),
    insight: z.number(),
    stealth: z.number(),
    // languages: z.string().describe('Typically "common" or "none"'),
    // weapons: z.string(),
    // armors: z.string(),
    // tools: z.string(),
  }).describe('Skills are typically low numbers (-2 to 4), collated to their ability scores')
});
