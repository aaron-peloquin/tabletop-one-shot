import { GridArea, Card, Button, GridTemplate } from "@components-layout";
import { useCallback, useContext } from "react";
import { globalDataContext } from "../providers/globalData";
import { useGenerateOverview } from "@helper";
import { EncounterDetails } from "../molecules/EncounterDetails";

type T_Props = {
    gridNameInput: string
    gridNameOutput: string
};

export const OverviewLayout: React.FC<T_Props> = ({gridNameInput, gridNameOutput}) => {
  const {overview, overviewError, name, setOverview, setOverviewError} = useContext(globalDataContext);
  const {generateOverview, overviewLoading} = useGenerateOverview(setOverview, setOverviewError);

  const handleClearOverview = useCallback(() => {
    setOverview(null);
  }, [setOverview]);

  const handleGenerateOverview = useCallback(() => {
    generateOverview(name);
  }, [generateOverview, name]);

  const disabled = !name || overviewLoading;

  return <>
    <GridArea className='full-width' name={gridNameInput}>
      <Card layer="2" heading="Overview Generation">
        {overview ? <Button text="Clear Data" onClick={handleClearOverview} /> : <Button text="Generate" disabled={disabled} onClick={handleGenerateOverview} />}
        
      </Card>
    </GridArea>
    <GridArea name={gridNameOutput}>
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
    </GridArea>
  </>;

};