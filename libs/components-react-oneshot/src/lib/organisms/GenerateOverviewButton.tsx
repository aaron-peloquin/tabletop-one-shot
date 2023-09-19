import { GridArea, Card, Button } from "@components-layout";
import { useGenerateOverview } from "@helper";
import { useContext, useCallback } from "react";
import { globalDataContext } from "../providers/globalData";

type T_Props = {
  gridName: string
};

export const GenerateOverviewButton: React.FC<T_Props> = ({gridName}) => {
  const {overview, name, context, setOverview, setOverviewError} = useContext(globalDataContext);
  const {generateOverview, overviewLoading} = useGenerateOverview(setOverview, setOverviewError);
  
  const handleClearOverview = useCallback(() => {
    setOverview(null);
  }, [setOverview]);
  
  const handleGenerateOverview = useCallback(() => {
    generateOverview(name, context);
  }, [generateOverview, name, context]);
  
  const disabled = !name || overviewLoading;

  return <GridArea className='full-width' name={gridName}>
    <Card layer="2" heading="Overview Generation">
      {overview ? <Button text="Clear Data" onClick={handleClearOverview} /> : <Button text="Generate" disabled={disabled} onClick={handleGenerateOverview} />}
    </Card>
  </GridArea>;

};