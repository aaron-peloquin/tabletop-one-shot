import { GridArea, Card, Button, GridTemplate } from "@components-layout";
import { useCallback, useContext } from "react";
import { globalDataContext } from "../providers/globalData";
import { useGenerateOverview } from "@helper";
import { EncounterDetails } from "../molecules/EncounterDetails";

type T_Props = {
  gridName: string
};

export const OverviewLayout: React.FC<T_Props> = ({gridName}) => {
  const {overview, overviewError} = useContext(globalDataContext);

  return <GridArea name={gridName}>
    {overviewError && <Card layer="1" heading="Error">{overviewError}</Card>}
    {overview && 
      <Card layer="2" heading="Overview Output">
        {overview?.description}
        <Card layer="3" heading="Adventure Hooks">
          <ul>{overview?.hooks?.map(hook => <li>{hook}</li>)}</ul>
        </Card>
        <Card layer="3" heading="Encounters">
          <GridTemplate columns={overview?.encounters?.length < 2 ? overview?.encounters.length : 2}>
            {overview?.encounters?.map((encounter, index) => {
              return <EncounterDetails
                encounter={encounter}
                number={index+1}
              />;
            })}
          </GridTemplate>
        </Card>
      </Card>
    }
  </GridArea>;

};