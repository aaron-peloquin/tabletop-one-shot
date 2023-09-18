import { GridArea, Card, Textarea } from "@components-layout";
import { useGenerateOverview } from "@helper";
import { useContext, useCallback } from "react";
import { globalDataContext } from "../providers/globalData";

type T_Props = {
  gridName: string
};

export const ContextLayout: React.FC<T_Props> = ({gridName}) => {
  const {overview, name, setOverview, setOverviewError} = useContext(globalDataContext);
  const {generateOverview, overviewLoading} = useGenerateOverview(setOverview, setOverviewError);
  
  const handleContextChange = useCallback(() => {
    generateOverview(name);
  }, [generateOverview, name]);
  
  const disabled = !!(overview || overviewLoading);

  return <GridArea className='full-width' name={gridName}>
    <Card layer="2" heading="Overview Generation">
      <Textarea
        onChange={handleContextChange}
        value={''}
        disabled={disabled}
        label="Context (optional)"
        placeholder="Optional context"
        id={""}
      />
    </Card>
  </GridArea>;

};