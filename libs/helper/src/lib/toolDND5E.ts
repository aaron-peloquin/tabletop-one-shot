import _ from 'lodash';
import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";

const ACCEPTABLE_RESOURCES = ['ability-scores', 'alignments', 'backgrounds', 'classes', 'conditions', 'damage-types', 'equipment-categories', 'equipment', 'feats', 'features', 'languages', 'magic-items', 'magic-schools', 'monsters', 'proficiencies', 'races', 'rules', 'rule-sections', 'skills', 'spells', 'subclasses', 'subraces', 'traits', 'weapon-properties'];
const COMMON_MISTAKES = {
  weapons: "equipment",
  armor: "equipment",
  class: "classes",
  items: "equipment",
};

const schema = z.object({
  type: z.string().describe(`single string representing the type resource requested. Accepted 'resourceType' items are: ["${ACCEPTABLE_RESOURCES.join('", "')}"].`),
  query: z.string().describe(`optional free text search query string of content / name from the dungeons and dragons SRD rules.`)
});

const replaceUrlKeys = (originalJson = {}, newJson: Record<string, any>|null = null, parentKeypath = "") => {
  let currentJsonObject = null;
  if (newJson === null) {
    newJson = { ...originalJson };
  }

  if (parentKeypath === "") {
    currentJsonObject = originalJson;
  } else {
    currentJsonObject = _.get(originalJson, parentKeypath.slice(1));
  }

  const toCreate = {};
  const toDelete = [];

  if (typeof currentJsonObject === "object") {
    for (const [key, value] of Object.entries(currentJsonObject)) {
      const current_keypath = `${parentKeypath}.${key}`;
      if (typeof value === "object") {
        replaceUrlKeys(originalJson, newJson, current_keypath);
      } else if (Array.isArray(value)) {
        for (let list_index = 0; list_index < value.length; list_index++) {
          replaceUrlKeys(
            originalJson,
            newJson,
            `${current_keypath}[${list_index}]`
          );
        }
      } else if (key === "url") {
        const found_keypath = current_keypath.slice(1);
        const currentKeypath = found_keypath.replace(/\.url$/, ".DND5e Action Input");
        const new_value = (value as string).slice("/api/".length);

        _.set(toCreate, currentKeypath, new_value);
        toDelete.push(found_keypath);
      }
    }
  }

  for (const addKey of Object.keys(toCreate)) {
    _.set(newJson, addKey, _.get(toCreate, addKey));
  }

  for (const delKey of toDelete) {
    _.unset(newJson, delKey);
  }

  return newJson;
};

type T_fetchDnd5eResultsArgs = { type: string, query: string };
const fetchDnd5eResults = async ({ type, query }: T_fetchDnd5eResultsArgs) => {
  console.log('== DND CALLED ==', type, query);
  const resource = _.get(COMMON_MISTAKES, type, type.replace(" ", "-"));
  if(ACCEPTABLE_RESOURCES.indexOf(resource) !== -1) {
    const url = `https://www.dnd5eapi.co/api/${resource.toLowerCase()}${query ? `/${query.toLowerCase()}` : ""}`;
    const response = await fetch(url);
    if (response.status === 200) {
      const rawJson = await response.json();
      const output = replaceUrlKeys(rawJson);
      return { role: 'ai', message: `Information about: ${query || type}:\n${JSON.stringify(output, undefined, 2)}\n` };
    }
    return { role: 'ai', message: `No information for: ${type}/${query}` };
  }

  return { role: 'ai', message: `Error: Unknown type (${type})` };
};

export const DND5E = new DynamicStructuredTool({
  name: "DND5E",
  schema: schema,
  tags: ['AI'],
  description: "The preferred tool to use when you need to get information about the Dungeons and Dragons 5th Edition. Note: Querying for the same argument will always yield the same result.",
  func: fetchDnd5eResults,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  invoke: fetchDnd5eResults,
});
