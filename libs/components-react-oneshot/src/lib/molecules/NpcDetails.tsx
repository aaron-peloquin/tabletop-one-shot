import { Card } from "@components-layout";
import { zodSchemaNPC } from "@static";
import { z } from "zod";

export type T_NPC = z.infer<typeof zodSchemaNPC>;

export const NpcDetails: React.FC<T_NPC> = ({name, physicalDescription, motivations}) => {
  return <Card layer="5" heading={name}>
    {physicalDescription}
    <hr />
    Motivations: <em>{motivations}</em>
  </Card>;
};
