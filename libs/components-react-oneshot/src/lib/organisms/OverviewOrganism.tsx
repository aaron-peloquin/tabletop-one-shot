import { GridArea, Card, Button, GridTemplate } from "@components-layout";
import { useCallback, useContext } from "react";
import { globalDataContext } from "../providers/globalData";
import { useGenerateOverview } from "@helper";

type T_Props = {
    gridNameInput: string
    gridNameOutput: string
};

export const OverviewOrganism: React.FC<T_Props> = ({gridNameInput, gridNameOutput}) => {
  const {overview, name, setOverview} = useContext(globalDataContext);
  const {generateOverview, overviewLoading} = useGenerateOverview(setOverview);

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
    {overview && <GridArea name={gridNameOutput}>
      <Card layer="2" heading="Overview Output">
        {overview?.description}
        <Card layer="3" heading="Adventure Hooks">
          <ul>{overview?.hooks?.map(hook => <li>{hook}</li>)}</ul>
        </Card>
        <Card layer="3" heading="Encounters">
          <GridTemplate columns={overview?.encounters?.length < 2 ? overview?.encounters.length : 2}>
            {overview?.encounters?.map(({name, description, areaDescription, purpose, NPCs}, index) => {
              return <Card layer="4" heading={`#${index+1} ${name}`}>
                <em>{areaDescription}</em>
                <hr />
                {description}
                <hr />
                Purpose: <em>{purpose}</em>
                <Card heading="NPCs" layer="4">
                  <GridTemplate columns={NPCs?.length < 3 ? NPCs.length : 3}>
                    {NPCs.map(({name, physicalDescription, motivations}) => <Card layer="5" heading={name}>
                      {physicalDescription}
                      <hr />
                      Motivations: <em>{motivations}</em>
                    </Card>)}
                  </GridTemplate>
                </Card>
              </Card>;
            })}
          </GridTemplate>
        </Card>
      </Card>
    </GridArea>}
  </>;

};