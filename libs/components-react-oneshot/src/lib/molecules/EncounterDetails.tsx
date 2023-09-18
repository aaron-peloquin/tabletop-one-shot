import { Card, GridTemplate } from "@components-layout";
import { zodSchemaEncounter } from "@static";
import { z } from "zod";

export type T_Encounter = z.infer<typeof zodSchemaEncounter> | null;

type T_Props = {
  encounter: T_Encounter,
  number: number,
};

export const EncounterDetails: React.FC<T_Props> = ({encounter, number}) => {
  const {name, description, areaDescription, purpose, NPCs} = encounter || {};
  return <Card layer="4" heading={`#${number} ${name}`}>
    <em>{areaDescription}</em>
    <hr />
    {description}
    <hr />
    Purpose: <em>{purpose}</em>
    <Card heading="NPCs" layer="4">
      {NPCs && <GridTemplate columns={NPCs?.length < 3 ? NPCs.length : 3}>
        {NPCs.map(({name, physicalDescription, motivations}) => <Card layer="5" heading={name}>
          {physicalDescription}
          <hr />
          Motivations: <em>{motivations}</em>
        </Card>)}
      </GridTemplate>}
    </Card>
  </Card>;
};