import { GridArea, Card, Button } from "@components-layout";
import { useGenerateOverview } from "@helper";
import { useContext, useCallback } from "react";
import { globalDataContext } from "@static";

type T_Props = {
  gridName: string
};

export const GenerateOverviewButton: React.FC<T_Props> = ({gridName}) => {
  const {overview, name, context, setOverview, clearOverview, setOverviewError} = useContext(globalDataContext);
  const {generateOverview, overviewLoading} = useGenerateOverview(setOverview, setOverviewError);
  
  const handleGenerateOverview = useCallback(() => {
    generateOverview(name, context);
  }, [generateOverview, name, context]);
  
  const disabled = !name || overviewLoading;

  return <GridArea className='full-width' name={gridName}>
    <Card layer="2" heading="Overview Generation">
      {overview ? <Button text="Clear Data" onClick={clearOverview} /> : <Button text="Generate" disabled={disabled} onClick={handleGenerateOverview} />}
    </Card>
  </GridArea>;

};