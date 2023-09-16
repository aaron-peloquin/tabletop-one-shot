import { GridArea, Card, Button } from "@components-layout";
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

  const handleGenerateOverview = useCallback(() => {
    generateOverview(name);
  }, [generateOverview, name]);

  const disabled = !name || overviewLoading;

  return <>
    <GridArea className='full-width' name={gridNameInput}>
      <Card layer="2" heading="Overview Input">
        <Button text={`${overview ? 'Re-' : ''}Generate`} disabled={disabled} onClick={handleGenerateOverview} />
      </Card>
    </GridArea>
    <GridArea name={gridNameOutput}>
      <Card layer="2" heading="Overview Output">
        {overview?.description}
        <hr />
        This adventure contains {overview?.encounters?.length || 0} encounters
      </Card>
    </GridArea>
  </>;

};