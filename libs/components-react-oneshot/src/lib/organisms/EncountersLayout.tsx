import { Card, GridArea, GridTemplate } from "@components-layout";
import { EncounterDetails } from "../molecules/EncounterDetails";
import { useContext } from "react";
import { globalDataContext } from "../providers/globalData";

type T_Props = {
  gridName: string
};

export const EncountersLayout: React.FC<T_Props> = ({gridName}) => {
  const {overview} = useContext(globalDataContext);

  if(!overview) {
    return [];
  }
  return <GridArea name={gridName}>
    <Card layer="2" heading="Encounters">
      <GridTemplate columns={overview?.encounters?.length < 2 ? overview?.encounters.length : 2}>
        {overview?.encounters?.map((encounter, index) => {
          return <EncounterDetails
            encounter={encounter}
            number={index+1}
          />;
        })}
      </GridTemplate>
    </Card>
  </GridArea>;

};