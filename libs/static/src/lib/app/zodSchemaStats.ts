import { z } from "zod";

const forceNumber = (input: unknown) => {
  let output = input || 0;
  if(typeof input === 'string') {
    output = parseInt(input.replace('+','')) || 0;
  }
  return output || 0;
};

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
  initiative: z.preprocess(forceNumber, z.number().describe('typically between 1 and 5, correlated to dexterity')),
  speed: z.number().describe('value in feet, typically 25 or 30'),
  abilities: z.array(z.object({
    name: z.string(),
    toHitOrDc: z.optional(z.string().describe('A dice formula, like 1d6+2 or 2d4+1')),
    range: z.preprocess(forceNumber, z.number().describe('5 for melee, and typically 15, 30, or 60 for ranged. If not applicable, set to 0')),
    dmgDice: z.optional(z.string().describe('A dice formula, like 1d20+3')),
    description: z.optional(z.string().describe('description of how this creature uses this abilities')),
    actionType: z.optional(z.string().describe('Typically: Action, Passive, Bonus Action, or Reaction')),
  })).describe('List of 1-3 creature weapon attacks and abilities (spells, attacks, and special features). If this is an attack action, it must include any applicable to damage or to-hit dice, or the DC save it causes'),
});
