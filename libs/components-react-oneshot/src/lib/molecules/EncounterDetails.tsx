import { Card, GridTemplate } from "@components-layout";
import { zodSchemaEncounter } from "@static";
import { z } from "zod";
import { CreatureDetails } from "./CreatureDetails";

export type T_Encounter = z.infer<typeof zodSchemaEncounter>;

type T_Props = {
  encounter: T_Encounter,
  number: number,
};

export const EncounterDetails: React.FC<T_Props> = ({encounter, number}) => {
  const {name, description, areaDescription, purpose, NPCs} = encounter;
  return <Card layer="3" heading={`#${number} ${name}`}>
    <em>{areaDescription}</em>
    <hr />
    {description}
    <hr />
    Purpose: <em>{purpose}</em>
    {NPCs?.length ? <Card heading="NPCs" layer="3">
      <GridTemplate columns={NPCs?.length < 3 ? NPCs.length : 3}>
        {NPCs.map(npc => <CreatureDetails {...npc} />)}
      </GridTemplate>
    </Card> : []}
  </Card>;
};