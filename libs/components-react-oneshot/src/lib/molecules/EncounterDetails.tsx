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
  const {name, details, purpose, creatures} = encounter;
  return <Card layer="3" heading={`#${number} ${name}`}>
    <Card layer="4" heading="Details">{details}</Card>
    <Card layer="4" heading="Purpose">{purpose}</Card>
    {creatures?.length ? <Card heading="Creatures" layer="3">
      <GridTemplate columns={creatures?.length < 3 ? creatures.length : 3}>
        {creatures.map(creature => <CreatureDetails {...creature} />)}
      </GridTemplate>
    </Card> : []}
  </Card>;
};